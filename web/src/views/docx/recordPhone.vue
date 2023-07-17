<!--
 * @Author: fanjf
 * @Date: 2022-12-05 16:28:31
 * @LastEditTime: 2022-12-05 17:27:36
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\views\docx\recordPhone.vue
 * @Description: 🎉🎉🎉
-->
<script setup>
import { reactive } from 'vue'
import dayjs from 'dayjs';
import { createDoc } from '@/hooks/createDoc'


const { createLoading, downloadDoc } = createDoc();
const phoneData = reactive({
    recordUser: '',//记录人
    phoneCompany: '',//来电单位
    time: dayjs(),//接电时间
    phoneUser: '',//来电人
    phoneNum: '',//来电人联系电话
    phoneContent: '',//来电内容
    advice: '',//拟办意见
})
const downloadFile = (type) => {
    let docData = type === 'empty' ? {
        recordUser: '',//记录人
        phoneCompany: '',//来电单位
        time: '',//接电时间
        phoneUser: '',//来电人
        phoneNum: '',//来电人联系电话
        phoneContent: '',//来电内容
        advice: '',//拟办意见
    } : phoneData
    downloadDoc({ type, templateName: 'recordPhone.docx', docData });
}
</script>
<template>
    <div class="ltinerary-box">
        <a-form :model="phoneData" name="phone" ref="phoneForm" layout="vertical" @finish="downloadFile('notEmpty')">
            <a-form-item label="来电单位" name="phoneCompany" :rules="[{
                required: true, message: '请填写来电单位'
            }]">
                <a-input v-model:value="phoneData.phoneCompany" placeholder="请填写来电单位"></a-input>
            </a-form-item>
            <a-form-item label="来电人" name="phoneUser">
                <a-input v-model:value="phoneData.phoneUser" placeholder="请填写来电人"></a-input>
            </a-form-item>
            <a-form-item label="来电人联系电话" name="phoneNum" :rules="[{
                required: true, message: '请填写来电人联系电话'
            }]">
                <a-input v-model:value="phoneData.phoneNum" placeholder="请填写来电人联系电话"></a-input>
            </a-form-item>
            <a-form-item label="记录人" name="recordUser" :rules="[{
                required: true, message: '请填写记录人'
            }]">
                <a-input v-model:value="phoneData.recordUser" placeholder="请填写记录人"></a-input>
            </a-form-item>
            <a-form-item label="来电时间" name="time" :rules="[{
                required: true, message: '请选择来电时间'
            }]">
                <a-date-picker show-time placeholder="请选择来电时间" v-model:value="phoneData.time" style="width:50%;"
                    valueFormat="YYYY-MM-DD HH:mm:ss" />
                <!-- <a-input  placeholder="请填写记录时间"></a-input> -->
            </a-form-item>
            <a-form-item label="来电内容" name="phoneContent" :rules="[{
                required: true, message: '请简要概述来电内容'
            }]">
                <a-textarea v-model:value="phoneData.phoneContent" placeholder="请简要概述来电内容" :maxlength="250" showCount
                    :rows="6">
                </a-textarea>
            </a-form-item>
            <a-form-item label="拟办意见" name="advice">
                <a-textarea v-model:value="phoneData.advice" placeholder="拟办意见" :maxlength="40" showCount>
                </a-textarea>
            </a-form-item>
            <form-footer :loading="createLoading" @clickEmpty="(type) => downloadFile(type)"></form-footer>
        </a-form>
    </div>
</template>