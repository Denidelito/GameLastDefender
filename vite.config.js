import { resolve, parse } from 'path';
import { defineConfig } from 'vite';
import copy from 'rollup-plugin-copy'

export default defineConfig({
    base: '/',
    root: resolve(__dirname, './dev'),
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            plugins: [
                copy({
                    targets: [
                        {
                            src: 'images/**/*',
                            dest: 'images'
                        }
                    ]
                })
            ],
            output: {
                /*assetFileNames: (asset) => {
                    if (parse(asset.name).name === 'externalImage') {
                        return "images/[name][extname]";
                    }
                    return "assets/[name].[hash][extname]";
                },*/
            },
        },
    },
});