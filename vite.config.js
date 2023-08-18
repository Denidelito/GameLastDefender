import { resolve, parse } from 'path';
import { defineConfig } from 'vite';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default defineConfig({
    base: './',
    root: resolve(__dirname, './dev'),
    publicDir: './images/',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true,
    },
    server: {
        https: false,
        port: 8080,
    },
});