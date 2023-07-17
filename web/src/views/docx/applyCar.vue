<!--
 * @Author: fanjf
 * @Date: 2022-12-05 14:44:35
 * @LastEditTime: 2022-12-06 17:26:32
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\views\docx\applyCar.vue
 * @Description: 🎉🎉🎉
-->
<script setup>
import { reactive } from 'vue'
import dayjs from 'dayjs';
import { createDoc } from '@/hooks/createDoc'
import { researchNameList } from '@/views/config.js'
// import {formFooter} from '@/components/formFooter.vue'

const { createLoading, downloadDoc } = createDoc();
const carData = reactive({
    username: '',//姓名
    researchName: '大数据技术研究中心',
    phone: '',//手机号码
    useTime: [],//使用时间
    useReason: '',//使用原因
})

const downloadFile = (type) => {
    let docData = {};
    if (type === 'empty') {
        docData = {
            username: '',//姓名
            researchName: carData.researchName,
            phone: '',//手机号码
            useReason: '',//使用原因
            by: '    ',
            bm: '  ',
            bd: '  ',
            bh: '  ',
            bmin: '  ',
            ey: '    ',
            em: '  ',
            ed: '  ',
            eh: '  ',
            emin: '  '
        }
    } else {
        docData = carData;
        let beginTime = carData.useTime[0];
        let endTime = carData.useTime[1];
        docData.by = dayjs(beginTime).year();
        docData.bm = dayjs(beginTime).month() + 1;
        docData.bd = dayjs(beginTime).date();
        docData.bh = dayjs(beginTime).hour();
        docData.bmin = dayjs(beginTime).minute();
        docData.ey = dayjs(endTime).year();
        docData.em = dayjs(endTime).month() + 1;
        docData.ed = dayjs(endTime).date();
        docData.eh = dayjs(endTime).hour();
        docData.emin = dayjs(endTime).minute();
    }
    downloadDoc({ type, templateName: 'applyCarTemplate.docx', docData });
}
</script>
<template>
    <div class="ltinerary-box">
        <a-form :model="carData" name="car" ref="carForm" layout="vertical" @finish="downloadFile('notEmpty')">
            <a-form-item label="所属中心" name="researchName" :rules="[{
                required: true, message: '请选择所属中心'
            }]">
                <a-select v-model:value="carData.researchName" placeholder="请选择你所属的中心">
                    <a-select-option v-for="item in researchNameList" :value="item">{{ item }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="使用人" name="username" :rules="[{
                required: true, message: '请填写使用人的姓名'
            }]">
                <a-input v-model:value="carData.username" placeholder="请输入使用人"></a-input>
            </a-form-item>
            <a-form-item label="手机号码" name="phone" :rules="[{
                required: true, message: '请填写手机号码'
            }]">
                <a-input v-model:value="carData.phone" placeholder="请输入联系方式"></a-input>
            </a-form-item>
            <a-form-item label="用车时间" name="useTime" :rules="[{
                required: true, message: '请选择用车时间'
            }]">
                <a-range-picker v-model:value="carData.useTime" :show-time="{ format: 'HH点mm分' }"
                    format="YYYY年MM月DD日 HH点mm分" style="width:100%" />
            </a-form-item>
            <a-form-item label="用车事由" name="useReason" :rules="[{
                required: true, message: '请填写你的用车事由'
            }]">
                <a-textarea v-model:value="carData.useReason" placeholder="请填写你的用车事由（要前往何处，去办理何事）" :maxlength="110"
                    showCount :rows="4">
                </a-textarea>
            </a-form-item>
            
            <form-footer :loading="createLoading" @clickEmpty="(type)=>downloadFile(type)"></form-footer>
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