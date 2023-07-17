<!--
 * @Author: fanjf
 * @Date: 2022-11-28 15:47:22
 * @LastEditTime: 2022-12-05 16:18:13
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\views\docx\travel.vue
 * @Description: 🎉🎉🎉
-->
<script setup>
import { reactive } from 'vue'
import { createDoc } from '@/hooks/createDoc'
import { researchNameList } from '@/views/config.js'
// const researchNameList = ['大数据技术研究中心', '人工智能芯片与系统研究中心', '数智技术研究中心', '可定义射频芯片与系统研究中心', '数字生命与智能医学研究中心', '先进生物制造研究中心']
const ltineraryData = reactive({
    researchName: '大数据技术研究中心',
    submitDate: '',
    username: '',
    leaveReason: '',
    ltinerary: '',
    vehicle: '',
    returnDate: ''
})
// const createLoading = ref(false);
const { createLoading, downloadDoc } = createDoc()

const downloadFile = (type) => {
    let docData = type === 'empty' ? {
        researchName: ltineraryData.researchName,
        submitDate: '',
        username: '',
        leaveReason: '',
        ltinerary: '',
        vehicle: '',
        returnDate: ''
    } : ltineraryData;

    downloadDoc({ type, templateName: 'travelTemplate.docx', docData });
}
</script>

<template>
    <div class="ltinerary-box">
        <a-form :model="ltineraryData" name="ltinerary" ref="ltineraryForm" class="ltinerary" layout="vertical"
            @finish="downloadFile('notEmpty')">
            <a-form-item label="所属中心" name="researchName" :rules="[{
                required: true, message: '请选择所属中心'
            }]">
                <a-select v-model:value="ltineraryData.researchName" placeholder="请选择你所属的中心">
                    <a-select-option v-for="item in researchNameList" :value="item">{{ item }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="姓 名" name="username" :rules="[{
                required: true, message: '请填写你的姓名'
            }]">
                <a-input v-model:value="ltineraryData.username" placeholder="请输入你的姓名"></a-input>
            </a-form-item>
            <a-form-item label="离嘉事由" name="leaveReason" :rules="[{
                required: true, message: '请填写你的离嘉事由'
            }]">
                <a-textarea v-model:value="ltineraryData.leaveReason" placeholder="请填写你的离家事由"></a-textarea>
            </a-form-item>
            <a-form-item label="行程安排" name="ltinerary" :rules="[{
                required: true, message: '请填写你的行程安排'
            }]">
                <a-textarea v-model:value="ltineraryData.ltinerary" placeholder="请填写你的行程安排"></a-textarea>
            </a-form-item>
            <a-form-item label="航班、车次" name="vehicle" :rules="[{
                required: true, message: '请填写你的航班、车次'
            }]">
                <a-input v-model:value="ltineraryData.vehicle" placeholder="请填写你的航班车次"></a-input>
            </a-form-item>
            <a-form-item label="预计何时返回" name="returnDate" :rules="[{
                required: true, message: '请选择你的返回时间'
            }]">
                <a-date-picker show-time placeholder="选择返回时间" v-model:value="ltineraryData.returnDate"
                    valueFormat="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm:ss" />
            </a-form-item>
            <form-footer :loading="createLoading" @clickEmpty="(type)=>downloadFile(type)"></form-footer>
            <!-- <a-divider orientation="left">{{$route.meta?.idiom || '🌸💰🌛👇'}}</a-divider>
            <a-form-item>
                <a-space>
                    <a-button type="primary" html-type="submit" :loading="createLoading">生成{{ $route.meta?.title }}
                    </a-button>
                    <a-button :loading="createLoading" @click="downloadFile('empty')">下载空模板
                    </a-button>
                </a-space>

            </a-form-item> -->
        </a-form>
    </div>

</template>
<style scoped>

</style>