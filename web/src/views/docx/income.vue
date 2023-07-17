<!--
 * @Author: fanjf
 * @Date: 2022-12-02 09:30:21
 * @LastEditTime: 2022-12-05 16:18:05
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\views\docx\income.vue
 * @Description: 🎉🎉🎉
-->
<script setup>
import { reactive, computed } from 'vue'
import { createDoc } from '@/hooks/createDoc'
import { researchNameList } from '@/views/config.js'
import { numberMoney } from '@/util/tools'
const incomeData = reactive({
    username: '',
    idcard: '',
    researchName: '大数据技术研究中心',
    income: 10000,
    incomeZh: ''
})
const incomeZh = computed(() => (numberMoney(incomeData.income)))
const { createLoading, downloadDoc } = createDoc();
const downloadFile = (type) => {
    let docData = type === 'empty' ? {
        researchName: incomeData.researchName,
        username: '       ',
        idcard: '                 ',
        income: '   ',
        incomeZh: '           '
    } : { ...incomeData, incomeZh: incomeZh.value }

    downloadDoc({ type, templateName: 'incomeTemplate.docx', docData });
}

</script>
<template>
    <div class="ltinerary-box">
        <a-form :model="incomeData" name="income" ref="incomeForm" layout="vertical" @finish="downloadFile('notEmpty')">
            <a-form-item label="所属中心" name="researchName" :rules="[{
                required: true, message: '请选择所属中心'
            }]">
                <a-select v-model:value="incomeData.researchName" placeholder="请选择你所属的中心">
                    <a-select-option v-for="item in researchNameList" :value="item">{{ item }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="姓 名" name="username" :rules="[{
                required: true, message: '请填写你的姓名'
            }]">
                <a-input v-model:value="incomeData.username" placeholder="请输入你的姓名"></a-input>
            </a-form-item>
            <a-form-item label="身份证号码" name="idcard" :rules="[{
                required: true, message: '请填写你的身份证号码'
            }]">
                <a-input v-model:value="incomeData.idcard" placeholder="请输入你的身份证号码"></a-input>
            </a-form-item>
            <a-form-item label="年薪税前" name="income" :rules="[{
                required: true, message: '请填写你的年薪(税前)'
            }]">
                <a-input-number :precision="2" :min="1" :max="999999999999.99" v-model:value="incomeData.income"
                    :step="10000" style="width:50%;">
                </a-input-number>
            </a-form-item>
            <a-form-item label="年薪税前(中文大写)" name="income">
                <span class="income-zh">{{ incomeZh }}</span>
            </a-form-item>
            <form-footer :loading="createLoading" @clickEmpty="(type)=>downloadFile(type)"></form-footer>
            <!-- <a-divider orientation="left">{{$route.meta?.idiom || '🌸💰🌛👇'}}</a-divider>
            <a-form-item>
                <a-space>
                    <a-button type="primary" html-type="submit" :loading="createLoading">生成{{ $route.meta?.title }}
                    </a-button>
                    <a-button :loading="createLoading" @click="downloadFile('empty')">下载空模板</a-button>
                </a-space>
            </a-form-item> -->
        </a-form>
    </div>
</template>
<style>
.income-zh {
    font-size: 18px;
    font-weight: bold;
    color: gold;
}
</style>