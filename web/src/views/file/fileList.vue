<!--
 * @Author: fanjf
 * @Date: 2022-12-12 14:02:24
 * @LastEditTime: 2022-12-22 16:52:35
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\views\file\fileList.vue
 * @Description: 🎉🎉🎉
-->
<script setup>
// import { ref } from 'vue'
import { fecthJsonData } from '@/hooks/fetchJson.js'
// const tagValue = 【】
const { resultData } = await fecthJsonData('/config/fileConfig.json')

</script>
<template>
    <div class="ltinerary-box">
        <list-file :fileList="resultData.fileList"></list-file>
    </div>
</template>