<!--
 * @Author: fanjf
 * @Date: 2022-12-12 15:01:20
 * @LastEditTime: 2022-12-22 14:01:11
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\components\dBtn.vue
 * @Description: 下载文件的按钮
-->
<script setup>
import { ref } from 'vue'
import { DownloadOutlined } from '@ant-design/icons-vue'
import JSZip from 'jszip'
import { saveAs } from "file-saver";
const props = defineProps({
    text: {
        type: String,
        default: ''
    },
    url: {
        type: Array,
        default: () => {
            return []
        }
    }
})

const loadingZip = ref(false)

const getFile = (url) => {
    return new Promise((resolve, reject) => {
        fetch(`/file/${url.endsWith('.pdf') ? 'pdf' : 'other'}/${url}`, { method: 'get', responseType: 'blob' }).then(res => res.blob()).then(blob => resolve(blob))
    })
}

const downloadFile = () => {
    if (props.url.length === 0) {
        alert('当前无可下载文件');
        return
    }
    loadingZip.value = true;
    if (props.url.length > 1) {
        Promise.all(props.url.map(r => getFile(r))).then(result => {
            let zip = new JSZip();
            result.forEach((h, i) => {
                zip.file(props.url[i], h, { binary: true })
            })
            zip.generateAsync({
                type: "blob", compressionOptions: {
                    level: 9
                }
            }).then((content) => {
                saveAs(content, `ltinerary_ziped.zip`);
            });
            loadingZip.value = false;
        })
    } else {
        let url = props.url[0]
        saveAs(`/file/${url.endsWith('.pdf') ? 'pdf' : 'other'}/${url}`, url);
        loadingZip.value = false;
    }
}
</script>
<template>
    <a-button type="link" @click="downloadFile" :loading="loadingZip" :title="`点击下载【${props.url.join('、')}】`">
        <template #icon>
            <DownloadOutlined></DownloadOutlined>
        </template>
        {{ props.text }}
    </a-button>
</template>