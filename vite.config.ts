import * as path from 'path';
import dtsPlugin from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [ react(), dtsPlugin({
        insertTypesEntry: true,
    }) ],
    resolve: {
        alias: [ { find: '@', replacement: path.resolve(__dirname, 'src') } ],
    },
    server: {
        port: 3000,
    },
    build: {
        minify: true,
        outDir: 'dist',
        rollupOptions: {
            external: [ 'react', 'react-dom' ],
            input: { app: path.resolve(__dirname, 'src/main.tsx') },
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDom',
                },
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name == 'style.css')
                        return 'kandaysbln-react-dialog-confirmation.css';
                    return assetInfo.name;
                },
            },
        },
        lib: {
            entry: path.resolve(__dirname, 'src/main.tsx'),
            name: 'KandaysblnDialogConfirmation',
            fileName: 'index',
        },
    },
    css: {
        postcss: {
            to: 'kandaysbln-react-dialog-confirmation.css',
        },
        modules: {
            localsConvention: 'camelCaseOnly',
        }
    },
});
