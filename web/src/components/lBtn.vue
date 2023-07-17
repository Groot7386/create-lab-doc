<!--
 * @Author: fanjf
 * @Date: 2022-12-14 21:02:49
 * @LastEditTime: 2022-12-14 21:34:44
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\components\lBtn.vue
 * @Description: 🎉🎉🎉
-->
<script setup>
import { useRouter } from 'vue-router'
import { LinkOutlined } from '@ant-design/icons-vue'
const router = useRouter();
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
const linkUrl = () => {
    if (props.url.startsWith('http')) {
        window.open(props.url)
    } else {
        router.push({
            name: props.url
        })
    }
}
</script>
<template>
    <a-button @click="linkUrl" type="link" :title="`点击跳转【${props.url}】`">
        <template #icon>
            <LinkOutlined></LinkOutlined>
        </template>
        {{ props.text }}
    </a-button>
</template>