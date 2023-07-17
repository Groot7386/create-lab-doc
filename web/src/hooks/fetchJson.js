/*
 * @Author: fanjf
 * @Date: 2022-12-20 15:15:30
 * @LastEditTime: 2022-12-26 17:17:53
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\hooks\fetchJson.js
 * @Description: 🎉🎉🎉
 */
import { ref } from 'vue'


export const fecthJsonData = async (path) => {

    const isFetchLoading = ref(false);
    const resultData = ref(null);
    const run = () => {
        console.log('🔍fetching...')
        isFetchLoading.value = true
        return new Promise((resolve, reject) => {
            fetch(`${path}?time=${Date.now()}`).then(response => response.json()).then(data => {
                isFetchLoading.value = false;
                resolve(data)
            }).catch(err => {
                alert(`获取${path}失败`)
                isFetchLoading.value = false;
                resolve(null)

            })
        })
    }
    resultData.value = await run()
    // console.log('resultData.value',resultData.value)
    // const fetchData  = ()=>{
    //     isFetchLoading.value = true;

    // }
    // fetchData();
    return {
        isFetchLoading,
        resultData
    }
}