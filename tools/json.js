import { readFile } from 'fs/promises';

export const loadJsonFile = async (path) => {
    const data = await readFile(path, 'utf8');
    return JSON.parse(data);
};