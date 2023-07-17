<!--
 * @Author: fanjf
 * @Date: 2022-12-06 14:01:18
 * @LastEditTime: 2022-12-14 21:25:48
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\views\docx\offboardApproval.vue
 * @Description: 🎉🎉🎉
-->
<script setup>
import { reactive } from 'vue';
import { createDoc } from '@/hooks/createDoc'
import { researchAliasNameList } from '@/views/config.js'

const politicalLandscapeList = ['中共党员', '中共预备党员', '共青团员', '民革党员', '民盟盟员', '民建会员', '民进会员', '农工党党员', '致公党党员', '九三学社社员', '台盟盟员', '无党派人士', '群众']
const offworkList = {
    transfers: '调 岗',//0 00
    retire: '退 休',//1 11
    dimission: '离 职',//2 22
    seconded: '借调、挂职',//3 33
    other: '其 他',//4 44
}
const { createLoading, downloadDoc } = createDoc();
const offboardData = reactive({
    username: '',//姓名
    researchName: '大数据技术',//研究中心
    boardDay: '',//入职时间
    politics: undefined,//政治面貌
    flowForm: 'dimission',//流动形式
    office: '',//职务
    phone: '',//联系电话
    post: '',//岗位
    grade: '',//等级
    workContent: '',//工作内容
    reason: '',//离岗离职原因
})
const downloadFile = (type) => {
    let docData = {};
    const offworkListKeys = Object.keys(offworkList)
    if (type === 'empty') {
        docData = {
            username: '',//姓名
            researchName: offboardData.researchName,//研究中心
            boardDay: '',//入职时间
            politics: '',//政治面貌
            flowForm: '',//流动形式
            office: '',//职务
            phone: '',//联系电话
            post: '',//岗位
            grade: '',//等级
            workContent: '',//工作内容
            reason: '',//离岗离职原因
        }
        offworkListKeys.forEach((ele, index) => {
            docData[index] = false
            docData[`${index}${index}`] = true
        })
    } else {
        docData = offboardData;
        offworkListKeys.forEach((ele, index) => {
            if (ele === offboardData.flowForm) {
                docData[index] = true;
                docData[`${index}${index}`] = false
            } else {
                docData[index] = false;
                docData[`${index}${index}`] = true
            }

        })
    }

    downloadDoc({ type, templateName: 'offboardApprovalTemplate.docx', docData });
}
</script>
<template>
    <div class="ltinerary-box">
        <a-form :model="offboardData" name="offboard" ref="offboardForm" layout="vertical"
            @finish="downloadFile('notEmpty')">
            <a-form-item label="所属中心" name="researchName" :rules="[{
                required: true, message: '请选择所属中心'
            }]">
                <a-select v-model:value="offboardData.researchName" placeholder="请选择你所属的中心">
                    <a-select-option v-for="item in researchAliasNameList" :value="item">{{ item }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="姓名" name="username" :rules="[{
                required: true, message: '请填写姓名'
            }]">
                <a-input v-model:value="offboardData.username" placeholder="请输入姓名"></a-input>
            </a-form-item>
            <a-form-item label="入职时间" name="boardDay" :rules="[{
                required: true, message: '请选择入职时间'
            }]">
                <a-date-picker v-model:value="offboardData.boardDay" valueFormat="YYYY-MM-DD" format="YYYY-MM-DD"
                    style="width:100%" />
            </a-form-item>
            <a-form-item label="联系方式" name="phone" :rules="[{
                required: true, message: '请填写你的联系方式'
            }]">
                <a-input v-model:value="offboardData.phone" placeholder="请输入你的联系方式"></a-input>
            </a-form-item>
            <a-form-item label="政治面貌" name="politics" :rules="[{
                required: true, message: '请选择你的政治面貌'
            }]">
                <a-select v-model:value="offboardData.politics" placeholder="请选择你的政治面貌">
                    <a-select-option v-for="item in politicalLandscapeList" :value="item">{{ item }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="流动形式" name="flowForm" :rules="[{
                required: true, message: '请选择流动形式'
            }]">
                <a-radio-group v-model:value="offboardData.flowForm" button-style="solid">
                    <a-radio-button v-for="(value, key) in offworkList" :value="key">{{ value }}</a-radio-button>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="职务/职称" name="office">
                <a-input v-model:value="offboardData.office" placeholder="请输入你的职务/职称"></a-input>
            </a-form-item>
            <a-form-item label="岗位" name="post">
                <a-input v-model:value="offboardData.post" placeholder="请输入你的岗位"></a-input>
            </a-form-item>
            <a-form-item label="等级" name="grade">
                <a-input v-model:value="offboardData.grade" placeholder="请输入你的等级"></a-input>
            </a-form-item>
            <a-form-item label="从事工作内容" name="workContent">
                <a-textarea v-model:value="offboardData.workContent" placeholder="请填写从事工作内容" :maxlength="50" showCount>
                </a-textarea>
            </a-form-item>
            <a-form-item label="申请离岗/离职原因" name="reason">
                <a-textarea v-model:value="offboardData.reason" placeholder="请填写离职原因" :maxlength="25" showCount>
                </a-textarea>
            </a-form-item>
            <form-footer :loading="createLoading" @clickEmpty="(type) => downloadFile(type)">
                <template #fan>
                    <l-btn url="handoverItem" text="离职交接单"></l-btn>
                    <!-- <a-button type="link" @click="$router.push({ name: 'handoverItem' })">离职交接单</a-button> -->
                    <d-btn :url="['【人事】离岗离职承诺书.doc']" text="离职离岗承诺书.doc"></d-btn>
                </template>
            </form-footer>
        </a-form>
    </div>
</template>