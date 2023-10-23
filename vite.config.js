import { defineConfig } from 'vite'
import { resolve } from 'path'
import { getAllFiles } from './tools/files';
import { basename } from 'path';
import pugRollupPlugin from 'rollup-plugin-pug';

const htmlFiles = await getAllFiles('./src/html', ['.html']);
const input = {};

for (const htmlFile of htmlFiles) {
  const key = basename(htmlFile, '.html');
  input[key] = htmlFile;
}

export default defineConfig({
  root: resolve(__dirname, 'src/html'),
  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      plugins: [
        pugRollupPlugin(),
      ],
      input,
    }
  },
})