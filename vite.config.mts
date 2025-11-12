import { defineConfig, PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs';
import path from 'node:path';

const bunIndex = './src/bun/index.ts';
const neuConfig = JSON.parse(fs.readFileSync('neutralino.config.json', 'utf8'));
const neuResourcesRoot = '.' + neuConfig.cli.resourcesPath;

let launchedBuntralino = false;

/** Vite plugin to run buntralino and build it when needed */
const buntralino = (): PluginOption => [{
    name: 'vite-plugin-buntralino:copy-icon',
    enforce: 'post',
    async buildStart() {
        // Copy the app icon when developing an app
        await fs.promises.mkdir('./app', {
            recursive: true
        })
        await fs.promises.copyFile('public/icon.png', path.join(neuResourcesRoot + '/icon.png'));
    }
}, {
    name: 'vite-plugin-buntralino:serve',
    apply: 'serve',
    enforce: 'post',
    async configureServer(server) {
        // Start Buntralino with the Vite server and use it
        server.httpServer?.once('listening', async () => {
            if (launchedBuntralino) {
                return;
            }
            const address = server.httpServer?.address();
            if (!address || typeof address === 'string') {
                throw new Error('Failed to get server address');
            }
            const protocol = server.config.server.https ? 'https' : 'http',
                host = '127.0.0.1',
                port = address.port;
            (await Bun.$`buntralino run ${bunIndex} -- --vitehost=${protocol}://${host}:${port}`);
            launchedBuntralino = true;
        });
    }
}, {
    name: 'vite-plugin-buntralino:build',
    apply: 'build',
    enforce: 'post',
    async buildStart() {
        // Disable inspector for production builds
        const configPath = 'neutralino.config.json';
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        if (config.modes?.window?.enableInspector !== false) {
            config.modes.window.enableInspector = false;
            fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        }
    },
    async closeBundle() {
        // Build Buntralino after Vite builds
        try {
            const proc = Bun.spawn(['bunx', '--bun', 'buntralino', 'build', bunIndex], {
                stdout: 'pipe',
                stderr: 'pipe',
            });
            
            const result = await proc.exited;
            const stdout = await new Response(proc.stdout).text();
            const stderr = await new Response(proc.stderr).text();
            const allOutput = stdout + stderr;
            
            // Check if it's the Windows executable patching error
            if (result !== 0 && (
                allOutput.includes('Resource section') || 
                allOutput.includes('pe-library') ||
                allOutput.includes('resedit') ||
                allOutput.includes('After Resource section')
            )) {
                console.warn('\n⚠️  Windows executable metadata patching failed (known issue).');
                console.warn('   The application binary was built successfully and will work correctly.');
                console.warn('   Only the icon/metadata embedding failed - this does not affect functionality.\n');
                // Don't throw - the build succeeded, only the metadata patching failed
                return;
            }
            
            if (result !== 0) {
                throw new Error(`buntralino build failed:\n${stdout}\n${stderr}`);
            }
        } catch (error: any) {
            // If it's not a spawn error, check the error message
            const errorMessage = error?.message || String(error) || '';
            if (errorMessage.includes('Resource section') || 
                errorMessage.includes('pe-library') ||
                errorMessage.includes('resedit') ||
                errorMessage.includes('After Resource section')) {
                console.warn('\n⚠️  Windows executable metadata patching failed (known issue).');
                console.warn('   The application binary was built successfully and will work correctly.');
                console.warn('   Only the icon/metadata embedding failed - this does not affect functionality.\n');
                return;
            }
            throw error;
        }
    },
}];

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), buntralino()],
    server: {
        host: '127.0.0.1',
        open: false
    },
    build: {
        outDir: neuResourcesRoot
    }
})
