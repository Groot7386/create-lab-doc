/*
 * @Author: fanjf
 * @Date: 2022-12-01 10:08:24
 * @LastEditTime: 2022-12-21 11:23:38
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\views\permission.js
 * @Description: 🎉🎉🎉
 */
import router from '@/router/index'
import { menuList, idiomList } from '@/views/config'


const modules = import.meta.glob('../views/*/*.vue')
// console.log('modules',modules)
/**清除路由 */
export const cleanRoutes = () => {
    menuList.forEach(ele => {
        if (router.hasRoute(ele.name)) {
            router.removeRoute(ele.name)
        }
    })
}

/**添加路由 */
export const permissionAddRoutes = () => {
    menuList.forEach(ele => {
        if (ele.show) {
            let index = Math.floor(Math.random() * idiomList.length)
            router.addRoute({
                path: `/${ele.key}`,
                name: ele.key,
                meta: {
                    desc:ele.desc,
                    title: ele.title,
                    idiom: idiomList[index]
                },
                component: modules[`./${ele.filePath}`],
                children: []
            })
        } else {
            console.log(`🎈[${ele.title}](${ele.key}) is set to invisible`)
        }
    })
}