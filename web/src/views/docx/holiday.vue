<!--
 * @Author: fanjf
 * @Date: 2022-12-01 09:46:43
 * @LastEditTime: 2023-03-17 11:41:02
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\views\docx\holiday.vue
 * @Description: 🎉🎉🎉
-->
<script setup>
import { reactive } from 'vue'
import dayjs from 'dayjs';
import { createDoc } from '@/hooks/createDoc'
import { researchAliasNameList } from '@/views/config.js'

const holidayTypeList = {
    thing: '事假', //0 00
    sickness: '病假',//1 11
    marriage: '婚假',//2 22
    pregnancy: '孕假',//3 33
    funeral: '丧假',//4 44
    other: '其他'//5 55
}
// const researchNameList = ['大数据技术', '人工智能芯片', '数智技术', '可定义射频', '数字生命', '先进生物']
const holidayData = reactive({
    username: '',//姓名
    researchName: '大数据技术',//中心
    phone: '',//联系方式
    holidayType: 'other',//thing:事假 sickness:病假 marriage:婚假 pregnancy:孕假 funeral:丧假 other:其他
    holidayReason: '',//请假原因
    wantDays: 0.5,//拟请假天数  工作日
    beginDateYear: '',
    beginDateMonth: '',
    beginDateDate: '',
    endDateYear: '',//请假结束日期
    endDateMonth: '',
    endDateDate: '',
    holidayRange: [],//请假开始结束日期  
    isSync: false,//是否将销假单的内容与请假单的内容保持一致
})
const { createLoading, downloadDoc } = createDoc();
const downloadFile = (type) => {
    let docData = {};
    let holidayTypeKeys = Object.keys(holidayTypeList);
    if (type === 'empty') {
        docData = {
            researchName: holidayData.researchName,
            submitDate: '',
            username: '',
            phone: '',
            holidayType: '',//thing:事假 sickness:病假 marriage:婚假 pregnancy:孕假 funeral:丧假 other:其他
            holidayReason: '',//请假原因
            wantDays: '  ',//拟请假天数  工作日
            beginDateYear: '    ',
            beginDateMonth: '  ',
            beginDateDate: '  ',
            endDateYear: '    ',//请假结束日期
            endDateMonth: '  ',
            endDateDate: '  ',
            isSync: false,//是否将销假单的内容与请假单的内容保持一致
        };
        holidayTypeKeys.forEach((ele, index) => {
            docData[index] = false
            docData[`${index}${index}`] = true
        })
        downloadDoc({ type, templateName: `holidayTemplate.docx`, docData });
    } else {
        let beginDate = holidayData.holidayRange[0];
        let endDate = holidayData.holidayRange[1];
        holidayData.beginDateYear = dayjs(beginDate).year();
        holidayData.beginDateMonth = dayjs(beginDate).month() + 1;
        holidayData.beginDateDate = dayjs(beginDate).date();
        holidayData.endDateYear = dayjs(endDate).year();
        holidayData.endDateMonth = dayjs(endDate).month() + 1;
        holidayData.endDateDate = dayjs(endDate).date();
        holidayTypeKeys.forEach((ele, index) => {
            if (ele === holidayData.holidayType) {
                holidayData[index] = true;
                holidayData[`${index}${index}`] = false
            } else {
                holidayData[index] = false;
                holidayData[`${index}${index}`] = true
            }

        })
        docData = holidayData;
        downloadDoc({ type, templateName: `holidayTemplate${docData.isSync ? 'New' : ''}.docx`, docData });
    }

}
</script>
<template>
    <div class="ltinerary-box">
        <a-form :model="holidayData" name="holiday" ref="holidayForm" class="holiday" layout="vertical"
            @finish="downloadFile('notEmpty')">
            <a-form-item label="所属中心" name="researchName" :rules="[{
                required: true, message: '请选择所属中心'
            }]">
                <a-select v-model:value="holidayData.researchName" placeholder="请选择你所属的中心">
                    <a-select-option v-for="item in researchAliasNameList" :value="item">{{ item }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="姓 名" name="username" :rules="[{
                required: true, message: '请填写你的姓名'
            }]">
                <a-input v-model:value="holidayData.username" placeholder="请输入你的姓名"></a-input>
            </a-form-item>
            <a-form-item label="联系方式" name="phone" :rules="[{
                required: true, message: '请填写你的联系方式'
            }]">
                <a-input v-model:value="holidayData.phone" placeholder="请输入你的联系方式"></a-input>
            </a-form-item>
            <a-form-item label="请假类型" name="holidayType" :rules="[{
                required: true, message: '请选择请假类型'
            }]">
                <!-- <a-select v-model:value="holidayData.holidayType" placeholder="请选择请假的类型">
                        <a-select-option v-for="(value, key) in holidayTypeList" :value="key">{{ value }}</a-select-option>
                    </a-select> -->
                <a-radio-group v-model:value="holidayData.holidayType" button-style="solid">
                    <a-radio-button v-for="(value, key) in holidayTypeList" :value="key">{{ value }}</a-radio-button>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="拟请假天数" name="wantDays" :rules="[{
                required: true, message: '请填写拟请假天数'
            }]">
                <a-input-number :min="0.5" v-model:value="holidayData.wantDays" :step="0.5"
                    style="width:50%;"></a-input-number>
            </a-form-item>
            <a-form-item label="请假日期" name="holidayRange" :rules="[{
                required: true, message: '请选择拟请假日期'
            }]">
                <a-range-picker v-model:value="holidayData.holidayRange" format="YYYY年MM月DD日" style="width:50%;" />
            </a-form-item>
            <a-form-item label="请假原因" name="holidayReason" :rules="[{
                required: true, message: '请填写你的请假原因'
            }]">
                <a-textarea v-model:value="holidayData.holidayReason" placeholder="请填写你的请假原因" :maxlength="50" showCount>
                </a-textarea>
            </a-form-item>
            <a-form-item label="是否将销假单的内容与请假单的内容保持一致?" name="isSync">
                <a-switch v-model:checked="holidayData.isSync" />
            </a-form-item>
            <form-footer :loading="createLoading" @clickEmpty="(type) => downloadFile(type)">
                <template #fan>
                    <p-btn text="请销假制度" url="南湖实验室请销假制度20210630.pdf"></p-btn>
                    <!-- <d-btn text="请销假制度" :url="['关于开展“学习贯彻党的二十大精神”专题主题党日活动的通知12.2.docx','经办人浙里办.pptx']" title="预览南湖实验室请销假制度20210630"></d-btn> -->
                </template>
            </form-footer>
        </a-form>
    </div>
</template>