<!--
 * @Author: fanjf
 * @Date: 2022-12-05 15:19:57
 * @LastEditTime: 2022-12-12 17:09:35
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\components\formFooter.vue
 * @Description: 🎉🎉🎉
-->
<script setup>
import { FileTextOutlined } from '@ant-design/icons-vue'
const emit = defineEmits(['clickEmpty'])
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },

})
</script>
<template>
    <a-divider orientation="left">{{ $route.meta?.idiom || '🌸💰🌛👇' }}</a-divider>
    <a-form-item>
        <a-space>
            <a-button type="primary" html-type="submit" :loading="loading">
                <FileTextOutlined></FileTextOutlined>
                生成{{ $route.meta?.title }}
            </a-button>
            <a-button :loading="loading" @click="emit('clickEmpty', 'empty')">下载空模板</a-button>
            <slot name="fan"></slot>
        </a-space>
    </a-form-item>
</template>
