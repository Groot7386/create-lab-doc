<!--
 * @Author: fanjf
 * @Date: 2022-11-28 15:47:22
 * @LastEditTime: 2022-12-26 11:59:31
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\views\HomeView.vue
 * @Description: 🎉🎉🎉
-->
<script setup>
import { ref, onMounted } from 'vue';
import { menuList } from '@/views/config'
import { fecthJsonData } from '@/hooks/fetchJson.js'


const { resultData } = await fecthJsonData('/config/useConfig.json');//todo 全局配置文件数据存储到store中去
const version = ref('')
const messNumOrdot = ref({
  fileList: 0,
  dot: []
})
onMounted(() => {
  version.value = document.getElementsByTagName("meta")?.version?.content;
  if (resultData.value?.messNotify.hasOwnProperty(version.value)) {
    messNumOrdot.value = resultData.value?.messNotify[version.value]
  } else {
    console.log('😳 无更新消息')
  }
})
</script>

<template>
  <div class="ltinerary-box">
    <a-list item-layout="horizontal" :data-source="menuList">
      <template #renderItem="{ item }">
        <a-list-item v-if="item.show">
          <a-list-item-meta :description="`⛱️ ${item.desc}`">
            <template #title>
              <a-badge :count="messNumOrdot[item.key]" :offset="[5, 0]" v-if="item.key === 'fileList'">
                <div class="file-title" @click="$router.push({ name: item.key })" style="cursor:pointer">{{ item.title
                }}</div>
              </a-badge>
              <a-badge :dot="messNumOrdot?.dot.includes(item.key)" v-else>
                <div class="file-title" @click="$router.push({ name: item.key })" style="cursor:pointer">{{ item.title
                }}</div>
              </a-badge>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>
<style scoped>
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}
</style>