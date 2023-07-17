/*
 * @Author: fanjf
 * @Date: 2022-11-28 15:47:22
 * @LastEditTime: 2022-12-26 15:55:34
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\main.js
 * @Description: 🎉🎉🎉
 */
import 'normalize.css/normalize.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { formatDate, checkRule } from "@/util/globalMethods.js"
import {cleanRoutes,permissionAddRoutes} from '@/views/permission'
import './style/main.css'

const app = createApp(App)
app.config.globalProperties.$formatDate = formatDate;
app.config.globalProperties.$checkRule = checkRule;
cleanRoutes();
permissionAddRoutes();
app.use(router)

app.mount('#app')
