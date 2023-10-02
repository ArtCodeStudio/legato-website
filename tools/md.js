// Render markdown files with yaml metadata
// © 2013-2014 j201 https://github.com/j201/meta-marked

import { marked } from 'marked';
import { load } from 'js-yaml';
import { readFile } from 'fs/promises';
import { basename } from 'path';

// Splits the given string into a meta section and a markdown section if a meta section is present, else returns null
function splitInput(str) {
    if (str.slice(0, 3) !== '---') return;

    var matcher = /\n(\.{3}|-{3})/g;
    var metaEnd = matcher.exec(str);

    return metaEnd && [str.slice(0, metaEnd.index), str.slice(matcher.lastIndex)];
}

export const renderMdFile = async function (filePath, opt) {
    const content = await readFile(filePath, 'utf8');
    const mySplitInput = splitInput(content);

    return mySplitInput ? {
        raw: content,
        path: filePath,
        meta: load(mySplitInput[0]),
        html: await marked(mySplitInput[1], opt),
        markdown: mySplitInput[1]
    } : {
        raw: content,
        path: filePath,
        meta: {},
        html: await marked(content, opt),
        markdown: content
    };
};

export const renderMdFiles = async (files, opt) => {
    return Promise.all(files.map(async (file) => {
        return await renderMdFile(file, opt);
    }));
}