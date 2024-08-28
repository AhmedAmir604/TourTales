import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  mode: "production",
  // build: {
  //   outDir: '../server/client', // Specify your desired output folder
  //   // Other build options...
  // },
});
