/*
 * @Author: fanjf
 * @Date: 2022-11-28 15:47:22
 * @LastEditTime: 2022-12-26 11:30:47
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\vite.config.js
 * @Description: 🎉🎉🎉
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import Components from 'unplugin-vue-components/vite'
import {
  AntDesignVueResolver,
} from 'unplugin-vue-components/resolvers'
import { createHtmlPlugin } from 'vite-plugin-html'
// https://vitejs.dev/config/
const beautifyTime = (value) => {
  return +value < 10 ? `0${value}` : value
}
const getTime = () => {
  let time = new Date();
  let currentTime = `${time.getFullYear()}年${beautifyTime(time.getMonth() + 1)}月${beautifyTime(time.getDate())}日 ${beautifyTime(time.getHours())}:${beautifyTime(time.getMinutes())}:${beautifyTime(time.getSeconds())}`
  return {
    currentTime,
    version: time.getTime()
  }
}
const { version, currentTime } = getTime();
export default defineConfig({
  plugins: [vue(),
  createHtmlPlugin({
    minify: true,
    entry: 'src/main.js',
    inject: {
      data: {
        user: 'Ltinerary',
        version: version,
        time: currentTime,
        email: 'jffan@nanhulab.ac.cn'
      }
    }
  }),
  Components({
    dirs: ['src/components'],
    resolvers: [
      AntDesignVueResolver(),
    ],
  }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // host: '192.168.0.45',
    // port: 8080,
    proxy: {
      // 接口地址代理
      '/api': {
        target: 'http://localhost:9098', // 接口的域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        rewrite: path => path.replace(/^\/api/, '')
      },
    }
  },
})
