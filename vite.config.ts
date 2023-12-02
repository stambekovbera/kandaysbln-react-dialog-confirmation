import * as path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig( {
    plugins: [ react() ],
    resolve: {
        alias: [ { find: '@', replacement: path.resolve( __dirname, 'src' ) } ],
    },
    server: {
        port: 3000,
    },
    build: {
        minify: true,
        outDir: 'dist',
        rollupOptions: {
            external: [ 'react', 'react-dom', '@emotion/react', '@emotion/styled', '@mui/material' ],
            input: { app: path.resolve( __dirname, 'src/main.tsx' ) }
        },
    },
    css: {
        modules: {
            localsConvention: 'camelCaseOnly',
        }
    },
} );
