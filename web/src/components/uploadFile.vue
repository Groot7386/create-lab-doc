<!--
 * @Author: fanjf
 * @Date: 2022-12-22 15:57:29
 * @LastEditTime: 2023-01-03 09:44:32
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\components\uploadFile.vue
 * @Description: 🎉🎉🎉
-->
<script setup>
import { ref, onMounted } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { menuList } from '@/views/config'
const props = defineProps({
    tagValue: {
        type: Array,
        default: () => {
            return []
        }
    },
})

const isShowUploadFile = ref(false)
const uploadParams = ref({
    name: "",//文件标题名称
    desc: "",//文件的描述
    tag: [],//标签
    user: '范范范',//文件上传者
    preview: [],//预览的文件
    download: [],//下载的文件
    link: [''],//预览的链接
    linkType: 'inner',//链接的类型  内部链接或者外部的链接
    //    downloadPdfFile:[]
})
const version = ref('')
onMounted(() => {
    version.value = document.getElementsByTagName("meta")?.version?.content;
})
/**文件上传前 */
const beforeUpload = (file, type = 'preview') => {
    // console.log('file', file)
    uploadParams.value[type].push(file)
    return false
}
/**移除文件 */
const handleRemove = (file, type = 'preview') => {
    // console.log('removefile', file)
    const index = uploadParams.value[type].indexOf(file);
    const newFileList = uploadParams.value[type].slice();
    newFileList.splice(index, 1);
    uploadParams.value[type] = newFileList;
}
/**上传文件 */
const isUploadLoading = ref(false)
const clickDialog = () => {
    isShowUploadFile.value = false;
    uploadParams.value = {
        name: "",//文件标题名称
        desc: "",//文件的描述
        tag: [],//标签
        user: '范范范',//文件上传者
        preview: [],//预览的文件
        download: [],//下载的文件
        link: [''],//预览的链接
        linkType: 'inner',//链接的类型  内部链接或者外部的链接
    }

}
const handleUpload = () => {
    if (uploadParams.value.preview.length === 0 && uploadParams.value.download.length === 0 && !uploadParams.value.link[0]) {
        alert('请至少上传一个文件或者绑定一个链接！')
        return
    }
    isUploadLoading.value = true;
    let data = {
        name: uploadParams.value.name,
        desc: uploadParams.value.desc,
        tag: uploadParams.value.tag,
        user: uploadParams.value.user,
        link: !uploadParams.value.link[0] ? [] : uploadParams.value.link,
        preview: uploadParams.value.preview,
        download: uploadParams.value.download,
        version: version.value,
    };
    const formData = new FormData();
    Object.keys(data).forEach(ele => {
        if (ele === 'preview' || ele === 'download') {
            let index = data[ele].length;
            if (index > 0) {
                data[ele].forEach((f, j) => {
                    formData.append(`${ele}${j}`, f);
                })
            } else {
                formData.append(ele, []);
            }
        } else {
            formData.append(ele, data[ele]);
        }
    })
    fetch('/api/upload/file', {
        method: 'post',
        body: formData
    }).then(response => response.json())
        .then((data) => {
            console.log(data);
            clickDialog();
            isUploadLoading.value = false;
        }).catch(err => {
            console.log('error', err)
            // isShowUploadFile.value = false;
            isUploadLoading.value = false;
        });
}
</script>
<template>
    <a-button type="primary" title="🎄上传文件" @click="isShowUploadFile = true">
        <template #icon>
            <UploadOutlined></UploadOutlined>
        </template>
        上传文件</a-button>
    <a-modal v-model:visible="isShowUploadFile" title="🍖上传文件" width="100%" wrapClassName="ltinerary-box"
        :footer="null">
        <a-form :model="uploadParams" name="dynamic_rule" @finish="handleUpload" :label-col="{ span: 6 }"
            :wrapper-col="{ span: 16 }">
            <a-form-item label="上传标题" name="name" :rules="[{ required: true, message: '请填写上传名称' }]">
                <a-input v-model:value="uploadParams.name" />
            </a-form-item>
            <a-form-item label="上传用户" name="user" :rules="[{ required: true, message: '请输入上传用户' }]">
                <a-input v-model:value="uploadParams.user" />
            </a-form-item>
            <a-form-item label="上传标签" name="tag" :rules="[{ required: true, message: '请选择或者输入标签' }]">
                <a-select v-model:value="uploadParams.tag" mode="tags" style="width: 100%" placeholder="标签"
                    :options="props.tagValue"></a-select>
            </a-form-item>
            <a-form-item label="下载文件" name="download">
                <a-upload :file-list="uploadParams.download" :before-upload="(file) => beforeUpload(file, 'download')"
                    @remove="(file) => handleRemove(file, 'download')">
                    <a-button>
                        <UploadOutlined></UploadOutlined>
                        上传文件
                    </a-button>
                </a-upload>
            </a-form-item>
            <a-form-item label="预览文件" name="preview">
                <a-upload :file-list="uploadParams.preview" :max-count="1"
                    :before-upload="(file) => beforeUpload(file, 'preview')"
                    @remove="(file) => handleRemove(file, 'preview')">
                    <a-button :disabled="uploadParams.preview.length > 0">
                        <UploadOutlined></UploadOutlined>
                        上传文件（预览文件只限pdf文件）
                    </a-button>
                </a-upload>
            </a-form-item>
            <a-form-item label="关联链接" name="link">
                <a-input-group compact>
                    <a-form-item-rest>
                        <a-select v-model:value="uploadParams.linkType" style="width:30%"
                            @select="uploadParams.link === ''">
                            <a-select-option value="inner">内部页面</a-select-option>
                            <a-select-option value="outer">外部链接</a-select-option>
                        </a-select>
                    </a-form-item-rest>
                    <a-input v-model:value="uploadParams.link[0]" style="width:70%"
                        v-if="uploadParams.linkType === 'outer'" placeholder="链接以http开头，需要确认是能在浏览器内打开的链接"></a-input>
                    <a-select v-model:value="uploadParams.link[0]" style="width:70%"
                        v-if="uploadParams.linkType === 'inner'">
                        <template v-for="(item, index) in menuList">
                            <a-select-option :value="item.key" v-if="item.show">{{ item.title }}</a-select-option>
                        </template>
                    </a-select>
                </a-input-group>
            </a-form-item>
            <a-form-item label="上传备注" name="desc">
                <a-textarea :rows="4" v-model:value="uploadParams.desc" placeholder="简要概述上传文件的主旨" :maxlength="100"
                    showCount />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
                <a-space>
                    <a-button type="primary" html-type="submit">确 定</a-button>
                    <a-button @click="clickDialog">关 闭</a-button>
                </a-space>
            </a-form-item>
        </a-form>
    </a-modal>
</template>