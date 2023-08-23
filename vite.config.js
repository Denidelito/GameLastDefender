import { resolve, parse } from 'path';
import { defineConfig } from 'vite';
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
    base: './',
    root: resolve(__dirname, './dev'),
    publicDir: './images/',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true,
    },
    plugins: [ mkcert() ],
    server: {
        https: true,
        port: 8080,
    },
});