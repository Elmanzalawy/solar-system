import { defineConfig } from 'vite';
import vitePluginString from 'vite-plugin-string'
import path from 'path'

export default defineConfig({
    base:'/solar-system-simulator/',
    plugins: [
        vitePluginString(),
        {
            name: 'json',
            handleHotUpdate({ file, server }) {
                if (file.endsWith('.json')) {
                    server.ws.send({
                        type: 'full-reload',
                        path: '*',
                    });
                }
            },
        },
    ],
    resolve: {
        alias: {
            '~util': path.resolve(__dirname, 'src/util.js'),
        }
    },
});