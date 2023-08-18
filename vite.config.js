import { resolve, parse } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    base: '/',
    root: resolve(__dirname, './dev'),
    publicDir: './images/',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true,
    },
});