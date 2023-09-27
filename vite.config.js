import vituum from 'vituum'
import vitePug from '@vituum/vite-plugin-pug'

export default {
  build: {
    rollupOptions: {
      input: ['./src/pages/**/*.pug']
    }
  },
  plugins: [vituum(), vitePug({
    root: './src'
  })]
}
