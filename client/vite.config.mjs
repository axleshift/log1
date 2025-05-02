// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'node:path'
// import autoprefixer from 'autoprefixer'

// export default defineConfig(() => {
//   return {
//     base: '/',
//     build: {
//       rollupOptions: {
//         external: ['xlsx'],
//       },
//       outDir: 'build',
//       assetsDir: 'assets',
//       copyPublicDir: true,
//     },
//     css: {
//       postcss: {
//         plugins: [
//           autoprefixer({}), // add options if needed
//         ],
//       },
//     },
//     esbuild: {
//       loader: 'jsx',
//       include: /src\/.*\.jsx?$/,
//       exclude: [],
//     },
//     optimizeDeps: {
//       force: true,
//       esbuildOptions: {
//         loader: {
//           '.js': 'jsx',
//         },
//       },
//     },
//     plugins: [react()],
//     resolve: {
//       alias: [
//         {
//           find: 'src/',
//           replacement: `${path.resolve(__dirname, 'src')}/`,
//         },
//       ],
//       extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
//     },
//     server: {
//       port: 5000,
//       proxy: {
//         // https://vitejs.dev/config/server-options.html
//       },
//     },
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import autoprefixer from 'autoprefixer'

export default defineConfig(() => {
  return {
    base: '/',
    build: {
      rollupOptions: {
        external: ['xlsx'],
      },
      outDir: 'build',
      assetsDir: 'assets',
      copyPublicDir: true,
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({}), // add options if needed
        ],
      },
    },
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
    optimizeDeps: {
      force: true,
      include: ['xlsx'], // Add xlsx to included dependencies
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
    resolve: {
      alias: [
        {
          find: 'src/',
          replacement: `${path.resolve(__dirname, 'src')}/`,
        },
        // Add alias for xlsx if needed
        {
          find: 'xlsx',
          replacement: 'xlsx/dist/xlsx.full.min.js',
        },
      ],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
    },
    plugins: [react()],
    server: {
      port: 5000,
      proxy: {
        // https://vitejs.dev/config/server-options.html
      },
    },
  }
})
