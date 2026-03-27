import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        minify: true,
        sourcemap: false,
        ssr: false,
        target: 'esnext',
        rolldownOptions: {
            // treeshake: true,
            output: {
                codeSplitting: true,
                format: 'es',
            },
        },
    },
    dev: {
        sourcemap: true,
    },
    define: {
        "process.env": {},
        "global": "window",
    },
})
