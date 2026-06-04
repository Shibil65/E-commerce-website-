export default defineConfig({
  plugins: [react()],
  build: {
    modulePreload: false
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})