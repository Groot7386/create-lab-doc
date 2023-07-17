<!--
 * @Author: fanjf
 * @Date: 2022-12-06 11:12:40
 * @LastEditTime: 2022-12-07 10:30:27
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\views\docx\officialReception.vue
 * @Description: 🎉🎉🎉
-->
<script setup>
import { reactive } from 'vue'
import { researchNameList } from '@/views/config.js'
import { createDoc } from '@/hooks/createDoc'
const { createLoading, downloadDoc } = createDoc();
const officialData = reactive({
    researchName: '大数据技术研究中心',
    username: '',//经办人
    fromCompany: '',//来访单位
    standard: '',//接待标准
    visitNum: 1,//来访人数
    accompanyNum: 0,//陪同人数
    time: '',//接待时间
    address: '',//接待地点
    content: '',//来访内容
})

const downloadFile = (type) => {
    let docData = type === 'empty' ? {
        researchName: officialData.researchName,
        username: '',//经办人
        fromCompany: '',//来访单位
        standard: '',//接待标准
        visitNum: '',//来访人数
        accompanyNum: '',//陪同人数
        time: '',//接待时间
        address: '',//接待地点
        content: '',//来访内容
    } : officialData;
    downloadDoc({ type, templateName: 'officialReceptionTemplate.docx', docData });
}
</script>
<template>
    <div class="ltinerary-box">
        <a-form :model="officialData" name="official" ref="officialForm" layout="vertical"
            @finish="downloadFile('notEmpty')">
            <a-form-item label="所属中心" name="researchName" :rules="[{
                required: true, message: '请选择接待部门'
            }]">
                <a-select v-model:value="officialData.researchName" placeholder="请选择接待部门">
                    <a-select-option v-for="item in researchNameList" :value="item">{{ item }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="经办人" name="username" :rules="[{
                required: true, message: '请填写经办人'
            }]">
                <a-input v-model:value="officialData.username" placeholder="请输入经办人"></a-input>
            </a-form-item>
            <a-form-item label="来访单位" name="fromCompany" :rules="[{
                required: true, message: '请填写来访单位'
            }]">
                <a-input v-model:value="officialData.fromCompany" placeholder="请输入来访单位"></a-input>
            </a-form-item>
            <a-form-item label="接待标准" name="standard" :rules="[{
                required: true, message: '请填写接待标准'
            }]">
                <a-input v-model:value="officialData.standard" placeholder="请输入接待标准"></a-input>
            </a-form-item>
            <a-form-item label="来访人数" name="visitNum" :rules="[{
                required: true, message: '请填写来访人数'
            }]">
                <a-input-number :min="1" v-model:value="officialData.visitNum" :step="1" :precision="0"
                    style="width:50%;"></a-input-number>
            </a-form-item>
            <a-form-item label="陪同人数" name="accompanyNum" :rules="[{
                required: true, message: '请填写陪同人数'
            }]">
                <a-input-number :min="0" v-model:value="officialData.accompanyNum" :step="1" :precision="0"
                    style="width:50%;"></a-input-number>
            </a-form-item>
            <a-form-item label="接待时间" name="time" :rules="[{
                required: true, message: '请选择接待时间'
            }]">
                <a-date-picker v-model:value="officialData.time" :show-time="{ format: 'HH点mm分' }"
                    valueFormat="YYYY年MM月DD日 HH点mm分" format="YYYY年MM月DD日 HH点mm分" style="width:100%" />
            </a-form-item>
            <a-form-item label="接待地点" name="address">
                <a-input v-model:value="officialData.address" placeholder="请输入接待地点"></a-input>
            </a-form-item>
            <a-form-item label="来访内容" name="content">
                <a-textarea v-model:value="officialData.content" placeholder="请简要概述来访内容" :maxlength="70" showCount
                    :rows="3">
                </a-textarea>
            </a-form-item>
            <form-footer :loading="createLoading" @clickEmpty="(type) => downloadFile(type)"></form-footer>
        </a-form>
    </div>
</template>