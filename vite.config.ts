import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          // Feature chunks
          icons: ["@heroicons/react/24/outline"],
          table: ["@tanstack/react-table"],
          utils: ["clsx"],
        },
      },
    },
    // Optimizaciones adicionales
    target: "es2015",
    minify: "terser", // Ahora terser está instalado
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Optimizaciones de desarrollo
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
});
