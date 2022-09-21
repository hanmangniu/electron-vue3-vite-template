import { defineConfig } from "vite";
import { resolve } from "path";
import * as path from "path";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import electron from "vite-plugin-electron";

const pathResolve = (dir: string) => resolve(__dirname, dir);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    electron({
      main: {
        entry: "electron/main.ts",
      },
      preload: {
        input: path.join(__dirname, "./electron/preload.ts"), // 预加载文件
      },
    }),
  ],
  resolve: {
    alias: {
      "@": pathResolve("./src"), // 设置 `@` 指向 `src` 目录
      views: pathResolve("./src/views"),
      components: pathResolve("./src/components"),
      assets: pathResolve("./src/assets"),
    },
  },
  base: "./", // 设置打包路径
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});
