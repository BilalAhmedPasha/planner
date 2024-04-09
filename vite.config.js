import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(() => {
    return {
        build: {
            outDir: "build",
            commonjsOptions: { transformMixedEsModules: true }
        },
        plugins: [
            {
                name: "treat-js-files-as-jsx",
                async transform(code, id) {
                    if (!id.match(/src\/.*\.js$/)) return null;

                    // Use the exposed transform from vite, instead of directly
                    // transforming with esbuild
                    return transformWithEsbuild(code, id, {
                        loader: "jsx",
                        jsx: "automatic",
                    });
                },
            },
            react(),
            svgr(),
        ],
        optimizeDeps: {
            include: ['dayjs'],
            force: true,
            esbuildOptions: {
                loader: {
                    ".js": "jsx"
                },
            },
        },
    };
});
