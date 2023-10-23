import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = globalThis.__dirname || dirname(fileURLToPath(import.meta.url));
export const PAGE_DIR = resolve(__dirname,'../src/pages');
export const CONTENT_DIR = resolve(__dirname,'../src/content');