<!--
 * @Author: fanjf
 * @Date: 2022-12-02 10:54:13
 * @LastEditTime: 2022-12-14 21:27:34
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\views\docx\applyEmail.vue
 * @Description: 🎉🎉🎉
-->
<script setup>
import { reactive } from 'vue'
import { createDoc } from '@/hooks/createDoc'
import { researchNameList } from '@/views/config.js'

const emialTypeList = {
    department: '部门',//0 00
    person: '个人',//1 11
}

const emailUsageList = {
    research: '科研',//2 22
    work: '工作联系',//3 33
    other: '其他'// 4 44
}
const { createLoading, downloadDoc } = createDoc();
const emailData = reactive({
    username: '',//姓名
    researchName: '大数据技术研究中心',
    phone: '',//手机号码
    emailType: 'person',//部门 个人 
    email: '',//邮箱账号
    initPwd: 'Nh123456',//初始密码
    emailUsage: 'research',// research
    emailUsageother: '',//其它用户
})
const downloadFile = (type) => {
    let docData = {};
    const emialTypeKeys = Object.keys(emialTypeList);
    const lengthEmailType = emialTypeKeys.length;
    const emailUsageKes = Object.keys(emailUsageList);
    if (type === 'empty') {
        docData = {
            username: '',//姓名
            researchName: emailData.researchName,
            phone: '',//手机号码
            emailType: '',//部门 个人 
            email: '',//邮箱账号
            initPwd: emailData.initPwd,//初始密码
            emailUsage: '',// research
            emailUsageother: '',//其它用户
        }
        emialTypeKeys.forEach((ele, index) => {
            docData[index] = false;
            docData[`${index}${index}`] = true
        })
        emailUsageKes.forEach((ele, index) => {
            let lastIndex = lengthEmailType + index;
            docData[lastIndex] = false;
            docData[`${lastIndex}${lastIndex}`] = true
        })
    } else {
        docData = emailData;
        emialTypeKeys.forEach((ele, index) => {
            if (ele === emailData.emailType) {
                docData[index] = true;
                docData[`${index}${index}`] = false
            } else {
                docData[index] = false;
                docData[`${index}${index}`] = true
            }
        })
        emailUsageKes.forEach((ele, index) => {
            let lastIndex = lengthEmailType + index;
            if (ele === emailData.emailUsage) {
                docData[lastIndex] = true;
                docData[`${lastIndex}${lastIndex}`] = false
            } else {
                docData[lastIndex] = false;
                docData[`${lastIndex}${lastIndex}`] = true
            }
        })

        docData.emailUsageother = emailData.emailUsage === 'other' ? emailData.emailUsageother : '     ';
    }
    console.log(docData)
    downloadDoc({ type, templateName: 'applyEmailTemplate.docx', docData });
}
</script>
<template>
    <div class="ltinerary-box">
        <a-form :model="emailData" name="email" ref="emailForm" layout="vertical" @finish="downloadFile('notEmpty')">
            <a-form-item label="所属中心" name="researchName" :rules="[{
                required: true, message: '请选择所属中心'
            }]">
                <a-select v-model:value="emailData.researchName" placeholder="请选择你所属的中心">
                    <a-select-option v-for="item in researchNameList" :value="item">{{ item }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="姓 名" name="username" :rules="[{
                required: true, message: '请填写你的姓名'
            }]">
                <a-input v-model:value="emailData.username" placeholder="请输入你的姓名"></a-input>
            </a-form-item>
            <a-form-item label="手机号码" name="phone" :rules="[{
                required: true, message: '请填写你的手机号码'
            }]">
                <a-input v-model:value="emailData.phone" placeholder="请输入你的手机号码"></a-input>
            </a-form-item>
            <a-form-item label="邮箱账号" name="email" :rules="[{
                required: true, message: '请填写你的邮箱账号'
            }]">
                <a-input v-model:value="emailData.email" addon-after="@nanhulab.ac.cn" placeholder="请在此输入要申请邮箱的前缀" />
            </a-form-item>
            <a-form-item label="初始密码" name="initPwd" :rules="[{
                required: true, message: '请填写你的邮箱账号'
            }]">
                <a-input v-model:value="emailData.initPwd" placeholder="请在此输入要申请邮箱的前缀" disabled />
            </a-form-item>
            <a-form-item label="邮箱性质" name="emailType" :rules="[{
                required: true, message: '请选择你的邮箱性质'
            }]">
                <a-radio-group v-model:value="emailData.emailType" button-style="solid">
                    <a-radio-button v-for="(value, key) in emialTypeList" :value="key">{{ value }}</a-radio-button>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="邮箱用途" name="emailType" :rules="[{
                required: true, message: '请选择你的邮箱用途'
            }]">
                <a-radio-group v-model:value="emailData.emailUsage" button-style="solid">
                    <a-radio-button v-for="(value, key) in emailUsageList" :value="key">{{ value }}</a-radio-button>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="请补充你的邮箱用途" name="emailUsageother" v-show="emailData.emailUsage === 'other'" :rules="[{
                required: emailData.emailUsage === 'other', message: '请在此补充你的邮箱用途'
            }]">
                <a-input v-model:value="emailData.emailUsageother" placeholder="请在此补充你的邮箱用途" show-count
                    :maxlength="15" />
            </a-form-item>
            <form-footer :loading="createLoading" @clickEmpty="(type) => downloadFile(type)">
                <template #fan>
                    <l-btn url="http://mail.nanhulab.ac.cn/" text="邮箱登录地址"></l-btn>
                </template>
            </form-footer>
            <!-- <a-divider orientation="left">{{ $route.meta?.idiom || '🌸💰🌛👇' }}</a-divider>
            <a-form-item>
                <a-space>
                    <a-button type="primary" html-type="submit" :loading="createLoading">生成{{ $route.meta?.title
                    }}</a-button>
                    <a-button :loading="createLoading" @click="downloadFile('empty')">下载空模板</a-button>
                </a-space>
            </a-form-item> -->
        </a-form>
    </div>
</template>
