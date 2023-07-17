<!--
 * @Author: fanjf
 * @Date: 2022-12-05 15:19:57
 * @LastEditTime: 2022-12-14 21:34:14
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\components\pBtn.vue
 * @Description: 🎉🎉🎉
-->
<script setup>
import { EyeOutlined } from '@ant-design/icons-vue'
const props = defineProps({
    text: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        default: ''
    }
})
const previewFile = () => {
    window.open(`/file/pdf/${props.url}`)
}
</script>
<template>
    <a-button @click="previewFile" type="link" :title="`点击预览【${props.url}】`">
        <template #icon>
            <EyeOutlined></EyeOutlined>
        </template>
        {{ props.text }}
    </a-button>
</template>
