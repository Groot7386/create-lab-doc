<!--
 * @Author: fanjf
 * @Date: 2022-12-08 09:26:58
 * @LastEditTime: 2022-12-08 15:05:23
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\views\docx\laborCosts.vue
 * @Description: 🎉🎉🎉
-->
<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs';
import { createDoc } from '@/hooks/createDoc'
import { researchNameList } from '@/views/config.js'
import { RestOutlined, LeftCircleOutlined, RightCircleOutlined, FileAddOutlined } from '@ant-design/icons-vue'

const constTypeList = {
    class: '讲课费',//讲课费 0 00
    royalties: '稿费',//稿费 1 11
    examination: '考务费',//考务费 2 22
    judge: '评审费',//3 33
    consultation: '咨询费',// 4 44
    other: '其它',//5 55
}
const costsUnits = ['元/学时', '元/天', '元/周', '元/月', '元/年']
const currentItem = ref(0);
const contsData = ref({
    researchName: '大数据技术研究中心',
    projectName: '',//劳务活动项目
    time: [],//活动使劲
    costType: [],//劳务费类别
    moneyStandard: 100,//发放标准的数额
    moneyUnit: '元/学时',//大方标准的单位
    desc: '',//情况说明 160字以内
    costs: []

})
const itemLen = computed(() => contsData.value.costs.length)
const { createLoading, downloadDoc } = createDoc();
const downloadFile = (type) => {
    let docData = {};
    let constTypeKeys = Object.keys(constTypeList);
    if (type === 'empty') {
        docData = {
            researchName: contsData.value.researchName,
            projectName: '',//劳务活动项目
            moneyStandard: '',//发放标准的数额
            moneyUnit: '元/学时',//大方标准的单位
            desc: '',//情况说明 160字以内
            by: '    ',
            bm: '  ',
            bd: '  ',
            ey: '    ',
            em: '  ',
            ed: '  ',
            costs: []
        }
        constTypeKeys.forEach((ele, index) => {
            docData[index] = false
            docData[`${index}${index}`] = true
        })
        for (let i = 0; i < 5; i++) {
            docData.costs.push({
                username: '',//姓名
                idcard: '',//身份证号
                company: '',//工作单位
                job: '',//职称、职务
                money: '',//发放金额
                bank: '',//开户银行
                bankNum: '',//银行卡号
            })
        }
    } else {
        docData = { ...contsData.value }
        let beginDate = docData.time[0];
        let endDate = docData.time[1];
        docData.by = dayjs(beginDate).year();
        docData.bm = dayjs(beginDate).month() + 1;
        docData.bd = dayjs(beginDate).date();
        docData.ey = dayjs(endDate).year();
        docData.em = dayjs(endDate).month() + 1;
        docData.ed = dayjs(endDate).date();
        constTypeKeys.forEach((ele, index) => {
            if (docData.costType.includes(ele)) {
                docData[index] = true
                docData[`${index}${index}`] = false
            } else {
                docData[index] = false
                docData[`${index}${index}`] = true
            }

        })
    }
    downloadDoc({ type, templateName: 'laborCostsTemplate.docx', docData });
}
const changeitems = (type) => {
    // carouselDom.value[type]();
    if (type === 'next') {
        if (currentItem.value === itemLen.value - 1) {
            currentItem.value = 0
        } else {
            currentItem.value++;
        }

    } else {
        if (currentItem.value === 0) {
            currentItem.value = itemLen.value - 1;
        } else {
            currentItem.value--;
        }

    }
}
const itemOPeration = (type) => {
    // let len = handData.items.length;
    // cardLoading.value = true;
    if (type === 'add') {
        contsData.value.costs.push({
            name: '',
            number: '',
            count: 1,
            serial: '',
            desc: '',//15字以内
            key: `fan${Date.now()}`
        })
        currentItem.value = itemLen.value - 1;
    } else {
        contsData.value.costs.splice(currentItem.value, 1)
        currentItem.value = 0;
    }
}

const validateFaild = ({ errorFields }) => {
    let findData = errorFields.find(ele => ele.name.length === 3);
    if (!!findData) {
        currentItem.value = findData.name[1];
    }
}
</script>
<template>
    <div class="ltinerary-box">
        <a-form :model="contsData" name="conts" ref="costsForm" layout="vertical" @finish="downloadFile('notEmpty')"
            @finishFailed="(data) => validateFaild(data)">
            <a-form-item label="所属中心" name="researchName" :rules="[{
                required: true, message: '请选择所属中心'
            }]">
                <a-select v-model:value="contsData.researchName" placeholder="请选择你所属的中心">
                    <a-select-option v-for="item in researchNameList" :value="item">{{ item }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="活动时间" name="time" :rules="[{
                required: true, message: '请选择活动时间'
            }]">
                <a-range-picker v-model:value="contsData.time" format="YYYY年MM月DD日" style="width:50%;" />
            </a-form-item>
            <a-form-item label="劳务活动项目" name="projectName" :rules="[{
                required: true, message: '请填写劳务活动项目名称'
            }]">
                <a-input v-model:value="contsData.projectName" placeholder="请填写劳务活动项目名称"></a-input>
            </a-form-item>
            <a-form-item label="劳务费类别" name="costType" :rules="[{
                required: true, message: '请选择劳务费类别'
            }]">
                <a-checkbox-group v-model:value="contsData.costType">
                    <a-checkbox :value="key" v-for="(value, key) in constTypeList">{{ value }}</a-checkbox>
                </a-checkbox-group>
            </a-form-item>
            <a-form-item label="发放标准" name="moneyStandard" :rules="[{
                required: true, message: '请填写发放标准'
            }]">
                <a-input-number :min="1" v-model:value="contsData.moneyStandard" :step="100" :precision="2"
                    style="width:50%;">
                    <template #addonAfter>
                        <a-select v-model:value="contsData.moneyUnit" style="width:100px;">
                            <a-select-option v-for="item in costsUnits" :value="item">{{ item }}</a-select-option>
                        </a-select>
                    </template>
                </a-input-number>
            </a-form-item>
            <a-form-item label="情况说明" name="desc" :rules="[{
                required: true, message: '请填写情况说明'
            }]">
                <a-textarea v-model:value="contsData.desc" placeholder="请填写情况说明" :maxlength="170" showCount :rows="4">
                </a-textarea>
            </a-form-item>
            <a-divider orientation="center">
                <h3>💰发放清单{{ (itemLen > 0 ? `【人数:${itemLen}】` : '') }}</h3>
            </a-divider>
            <a-card :title="itemLen === 0 ? '' : `人员${currentItem + 1}`" style="overflow:hidden;height:700px;">
                <template #extra>
                    <a-space>
                        <a-button type="link" shape="circle" size="large" title="上一个" @click="changeitems('prev')"
                            :disabled="itemLen < 2">
                            <template #icon>
                                <LeftCircleOutlined></LeftCircleOutlined>
                            </template>
                        </a-button>
                        <a-button type="link" shape="circle" size="large" title="添加一个人员" @click="itemOPeration('add')">
                            <template #icon>
                                <FileAddOutlined></FileAddOutlined>
                            </template>
                        </a-button>
                        <a-button type="link" shape="circle" size="large" title="删除此人员" @click="itemOPeration('delete')"
                            :disabled="itemLen === 0">
                            <template #icon>
                                <RestOutlined></RestOutlined>
                            </template>
                        </a-button>
                        <a-button type="link" shape="circle" size="large" title="下一个" @click="changeitems('next')"
                            :disabled="itemLen < 2">
                            <template #icon>
                                <RightCircleOutlined></RightCircleOutlined>
                            </template>
                        </a-button>
                    </a-space>
                </template>
                <template v-if="itemLen > 0">
                    <transition-group tag="div" name="fade-transform">
                        <div v-for="(item, index) in contsData.costs" :key="index" v-show="(index === currentItem)">
                            <a-form-item label="姓名" :name="['costs', index, 'username']" :rules="[{
                                required: true, message: '请输入姓名'
                            }]">
                                <a-input v-model:value="item.username" placeholder="请输入姓名"></a-input>
                            </a-form-item>
                            <a-form-item label="身份证号" :name="['costs', index, 'idcard']" :rules="[{
                                required: true, message: '身份证号'
                            }]">
                                <a-input v-model:value="item.idcard" placeholder="请输入身份证号码"></a-input>
                            </a-form-item>
                            <a-form-item label="发放金额（税后）" :name="['costs', index, 'money']" :rules="[{
                                required: true, message: '请输入发放金额'
                            }]">
                                <a-input-number v-model:value="item.money" :min="1" :step="100" :precision="2"
                                    style="width:50%;" placehollder="请输入发放金额（税后）"></a-input-number>
                            </a-form-item>
                            <a-form-item label="工作单位" :name="['costs', index, 'company']" :rules="[{
                                required: true, message: '请输入工作单位'
                            }]">
                                <a-input v-model:value="item.company" placeholder="请输入工作单位"></a-input>
                            </a-form-item>
                            <a-form-item label="职称（职务）" :name="['costs', index, 'job']" :rules="[{
                                required: true, message: '请输入职称（职务）'
                            }]">
                                <a-input v-model:value="item.job" placeholder="请输入职称（职务）"></a-input>
                            </a-form-item>
                            <a-form-item label="开户银行" :name="['costs', index, 'bank']" :rules="[{
                                required: true, message: '请输入开户银行）'
                            }]">
                                <a-input v-model:value="item.bank" placeholder="开户银行"></a-input>
                            </a-form-item>
                            <a-form-item label="银行卡号" :name="['costs', index, 'bankNum']" :rules="[{
                                required: true, message: '请输入银行卡号'
                            }]">
                                <a-input v-model:value="item.bankNum" placeholder="请输入银行卡号"></a-input>
                            </a-form-item>
                        </div>
                    </transition-group>
                </template>
                <template v-else>
                    <a-empty style="margin-top:180px;" description="尚未添加人员" />
                </template>
            </a-card>
            <form-footer :loading="createLoading" @clickEmpty="(type) => downloadFile(type)"></form-footer>
        </a-form>
    </div>
</template>