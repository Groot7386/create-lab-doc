/*
 * @Author: fanjf
 * @Date: 2022-12-20 15:15:30
 * @LastEditTime: 2022-12-26 17:40:40
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\hooks\request.js
 * @Description: 🎉🎉🎉
 */
import { ref } from 'vue'

export const requestHttp =() => {
    const isLoading = ref(false);
    const callHttp = (path,method='post',params) => {
        console.log(`🪀requesting【${path}】...`)
        isLoading.value = true
        return new Promise((resolve, reject) => {
            fetch(path,{
                method,
                headers:{
                    'Content-Type': 'application/json',
                    version:localStorage.getItem('version')
                },
                body:JSON.stringify(params)
            }).then(response => response.json()).then(data => {
                isLoading.value = false;
                resolve(data)
            }).catch(err => {
                console.log('err',err)
                alert(`请求${path}失败`)
                isLoading.value = false;
                resolve(null)
            })
        })
    }
    // resultData.value = await callHttp()
    return {
        isLoading,
        callHttp,
    }
}