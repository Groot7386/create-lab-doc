<!--
 * @Author: fanjf
 * @Date: 2022-12-12 14:02:24
 * @LastEditTime: 2022-12-26 18:36:34
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\views\manage\manage.vue
 * @Description: 🎉🎉🎉
-->
<script setup>
import { ref, reactive, computed } from 'vue'
import { fecthJsonData } from '@/hooks/fetchJson.js'
import { requestHttp } from '@/hooks/request.js'
import { menuList } from '@/views/config'

// const { resultData } = await fecthJsonData('/config/fileConfig.json')
const version = localStorage.getItem('version')
const file = ref({ fileList: [] })
const activeKey = ref('managefile') //systemsetting  managefile
const tag = ref([]);
const tagValue = computed(() => tag.value.map(f => ({ value: f })))
const { isLoading, callHttp } = requestHttp();
const settingParams = reactive({
    fileListNum: 0,
    dot: []
})
const updateSetting = () => {
    callHttp('/api/update/usejson', 'post', settingParams)
}
const getData = async (type = 'managefile') => {
    if (type === 'managefile') {
        const { resultData } = await fecthJsonData('/config/fileConfig.json');
        resultData.value.fileList.forEach(ele => {
            ele.tag.forEach(i => {
                if (!tag.value.includes(i)) {
                    tag.value.push(i)
                }
            })
        })
        file.value = { ...resultData.value };
    } else {
        const { resultData } = await fecthJsonData('/config/useConfig.json');
        // file.value = {...resultData.value}
        console.log('resultData', resultData.value)
        if (resultData.value.messNotify.hasOwnProperty(version)) {
            settingParams.fileListNum = resultData.value.messNotify[version].fileList;
            settingParams.dot = resultData.value.messNotify[version].dot;
        } else {
            settingParams.fileListNum = 0;
            settingParams.dot = []
        }
    }
}
getData();
</script>
<template>
    <div class="ltinerary-box">
        <a-tabs v-model:activeKey="activeKey" animated @change="(key) => getData(key)">
            <a-tab-pane key="managefile" tab="文件管理">
                <upload-file :tagValue="tagValue"></upload-file>
                <list-file :fileList="file.fileList"></list-file>
            </a-tab-pane>
            <a-tab-pane key="systemsetting" tab="系统设置">
                <a-button type="primary" @click="updateSetting" :loading="isLoading">更新配置</a-button>
                <a-divider orientation="left">🪔红点更新</a-divider>
                <a-input-number id="inputNumber" v-model:value="settingParams.fileListNum" :min="0" />
                <a-checkbox-group v-model:value="settingParams.dot" style="width: 100%">
                    <a-row>
                        <template v-for="(item, index) in menuList">
                            <a-col :span="8" v-if="item.key !== 'fileList' && item.show">
                                <a-checkbox :value="item.key">{{ item.title
                                }}</a-checkbox>
                            </a-col>
                        </template>
                    </a-row>
                </a-checkbox-group>
                <a-divider orientation="left">☕敬请期待</a-divider>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>