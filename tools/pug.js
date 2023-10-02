import pug from 'pug';
import { basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import { writeFile, watch } from 'fs/promises';
import { renderMdFiles, renderMdFile } from './md.js';
import { loadJsonFile } from './json.js';
import { getAllFiles, fileExists } from './files.js';
import { parseArgs } from './argv.js';

const __dirname = globalThis.__dirname || dirname(fileURLToPath(import.meta.url));
const PAGE_DIR = __dirname + '/../src/pages';
const CONTENT_DIR = __dirname +'/../src/content';

const globals = await loadJsonFile('./src/data/main.json');
const options = {};

const buildPage = async (pageFile) => {
    const base = basename(pageFile, '.pug');
    const contentFile = `${CONTENT_DIR}/${base}.md`;

    let locals = {
        title: `Title not set in ${base}.md`,
        content: "Content file ${base}.md not found"
    };
    

    console.debug(`Build ${pageFile}...`,);

    if(!await fileExists(pageFile)) {
        console.debug(`Page file ${pageFile} not found`);
        return;
    }

    if(await fileExists(contentFile)) {
        const content = await renderMdFile(contentFile);
        if (content) {
            locals = {...locals, ...content.meta, content: content.html}
        }
    }

    const html = pug.renderFile(pageFile, {...options, ...globals, ...locals});
    
    await writeFile(`./src/html/${base}.html`, html);    
}

const buildAll = async () => {     
    const pageFiles = await getAllFiles(PAGE_DIR, ['.pug']);
    for (const pageFile of pageFiles) {
        await buildPage(pageFile);
    }
}

const watchContent = async () => {
    const contentWatcher = watch(CONTENT_DIR, {recursive: true, persistent: true});
    for await (const event of contentWatcher) {
        const contentFile = `${CONTENT_DIR}/${event.filename}`;
        const base = basename(event.filename, '.md');
        const pageFile = `${PAGE_DIR}/${base}.pug`;
        console.debug(`${contentFile} content changed`);
        await buildPage(pageFile);
    }
}

const watchPages = async () => {
    const pageWatcher = watch(PAGE_DIR, {recursive: true, persistent: true});
    for await (const event of pageWatcher) {
        const pageFile = `${PAGE_DIR}/${event.filename}`;
        console.debug(`${pageFile} page changed`);
        await buildPage(pageFile);
    }
}

const watchAll = async () => {
    return Promise.all([watchContent(), watchPages()]);
}

const args = parseArgs();

console.debug('Args:', args);

if (args.build) {
    console.debug('BuildAll...');
    try {
        await buildAll();
    } catch (error) {
        console.error(error);
    }
}

if (args.watch) {
    console.debug('WatchAll for changes...');
    try {
        await watchAll();
    } catch (error) {
        console.error(error);
    }
}