// import vituum from 'vituum'
// import vitePug from '@vituum/vite-plugin-pug'
import { defineConfig } from 'vite'
import { resolve } from 'path'
// import multi from '@rollup/plugin-multi-entry';

// export default {
//   build: {
//     rollupOptions: {
//       input: ['./src/html/**/*.html']
//     }
//   },
//   // plugins: [vituum(), vitePug({
//   //   root: './src'
//   // })]
// }


export default defineConfig({
  root: resolve(__dirname, 'src/html'),
  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      plugins: [],
      input: {
        index: resolve(__dirname, 'src/html/index.html'),
        contact: resolve(__dirname, 'src/html/contact.html'),
      },
      // output: {
      //   dir: resolve(__dirname, 'dist'),
      // }
    }
  },
})