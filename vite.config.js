import { defineConfig } from 'vite';
import vitePluginString from 'vite-plugin-string'
import path from 'path'

export default defineConfig({
    plugins: [
        vitePluginString()
    ],
    resolve: {
        alias: {
            '~util': path.resolve(__dirname, 'src/util.js'),
        }
    },
});