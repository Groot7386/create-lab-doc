<!--
 * @Author: fanjf
 * @Date: 2022-12-06 17:30:08
 * @LastEditTime: 2022-12-14 21:25:17
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\views\docx\handoverItem.vue
 * @Description: 🎉🎉🎉
-->
<script setup>
import { ref, computed } from 'vue'
import { createDoc } from '@/hooks/createDoc'
import { researchNameList } from '@/views/config.js'
import { RestOutlined, LeftCircleOutlined, RightCircleOutlined, FileAddOutlined } from '@ant-design/icons-vue'
// const internalInstance = getCurrentInstance()
// const carouselDom = ref(null);
const currentItem = ref(0);
const cardLoading = ref(false);
const handData = ref({
    username: '',//姓名
    researchName: '大数据技术研究中心',//所在中心
    phone: '',//联系电话
    idcard: '',//身份证号码
    post: '',//岗位
    grade: '',//等级
    items: []

})

const itemLen = computed(() => handData.value.items.length)
const { createLoading, downloadDoc } = createDoc();
const downloadFile = (type) => {
    let docData = {};
    if (type === 'empty') {
        docData = {
            username: '',//姓名
            researchName: handData.value.researchName,//所在中心
            phone: '',//联系电话
            idcard: '',//身份证号码
            post: '',//岗位
            grade: '',//等级
            items: [{
                index: 1,
                name: '',
                number: '',
                count: '',
                serial: '',
                desc: ''//15字以内
            },
            {
                index: 2,
                name: '',
                number: '',
                count: '',
                serial: '',
                desc: ''//15字以内
            },
            {
                index: 3,
                name: '',
                number: '',
                count: '',
                serial: '',
                desc: ''//15字以内
            },
            {
                index: 4,
                name: '',
                number: '',
                count: '',
                serial: '',
                desc: ''//15字以内
            },
            ]
        }
    } else {
        docData = { ...handData.value };
        if (itemLen.value === 0) {
            docData.items = [{
                index: 1,
                name: '',
                number: '',
                count: '',
                serial: '',
                desc: ''//15字以内
            },
            {
                index: 2,
                name: '',
                number: '',
                count: '',
                serial: '',
                desc: ''//15字以内
            },
            {
                index: 3,
                name: '',
                number: '',
                count: '',
                serial: '',
                desc: ''//15字以内
            },
            {
                index: 4,
                name: '',
                number: '',
                count: '',
                serial: '',
                desc: ''//15字以内
            },
            ]
        } else {
            docData.items.forEach((ele, index) => {
                ele.index = index + 1
            })
        }
    }
    downloadDoc({ type, templateName: 'handoverItemTemplate.docx', docData });
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
        handData.value.items.push({
            name: '',
            number: '',
            count: 1,
            serial: '',
            desc: '',//15字以内
            key: `fan${Date.now()}`
        })
        currentItem.value = itemLen.value - 1;
    } else {
        handData.value.items.splice(currentItem.value, 1)
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
        <a-form :model="handData" name="hand" ref="handForm" layout="vertical" @finish="downloadFile('notEmpty')"
            @finishFailed="(data) => validateFaild(data)">
            <a-form-item label="所属中心" name="researchName" :rules="[{
                required: true, message: '请选择所属中心'
            }]">
                <a-select v-model:value="handData.researchName" placeholder="请选择你所属的中心">
                    <a-select-option v-for="item in researchNameList" :value="item">{{ item }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="姓名" name="username" :rules="[{
                required: true, message: '请填写姓名'
            }]">
                <a-input v-model:value="handData.username" placeholder="请输入姓名"></a-input>
            </a-form-item>
            <a-form-item label="手机号码" name="phone" :rules="[{
                required: true, message: '请填写手机号码'
            }]">
                <a-input v-model:value="handData.phone" placeholder="请输入联系方式"></a-input>
            </a-form-item>
            <a-form-item label="身份证号码" name="idcard" :rules="[{
                required: true, message: '请填写身份证号码'
            }]">
                <a-input v-model:value="handData.idcard" placeholder="请输入身份证号码"></a-input>
            </a-form-item>
            <a-form-item label="岗位" name="post" :rules="[{
                required: true, message: '请填写你的岗位'
            }]">
                <a-input v-model:value="handData.post" placeholder="请输入岗位"></a-input>
            </a-form-item>
            <a-form-item label="等级" name="grade">
                <a-input v-model:value="handData.grade" placeholder="请输入等级"></a-input>
            </a-form-item>
            <a-divider orientation="center">
                <h3>💡离职需要交接的物品列表{{ (itemLen > 0 ? `【数量:${itemLen}】` : '') }}</h3>
            </a-divider>
            <a-card :title="itemLen === 0 ? '' : `物品${currentItem + 1}`" style="overflow:hidden;height:530px;">
                <template #extra>
                    <a-space>
                        <a-button type="link" shape="circle" size="large" title="上一个" @click="changeitems('prev')"
                            :disabled="itemLen < 2 || cardLoading">
                            <template #icon>
                                <LeftCircleOutlined></LeftCircleOutlined>
                            </template>
                        </a-button>
                        <a-button type="link" shape="circle" size="large" title="添加一个物品" @click="itemOPeration('add')"
                            :disabled="cardLoading">
                            <template #icon>
                                <FileAddOutlined></FileAddOutlined>
                            </template>
                        </a-button>
                        <a-button type="link" shape="circle" size="large" title="删除此物品" @click="itemOPeration('delete')"
                            :disabled="itemLen === 0">
                            <template #icon>
                                <RestOutlined></RestOutlined>
                            </template>
                        </a-button>
                        <a-button type="link" shape="circle" size="large" title="下一个" @click="changeitems('next')"
                            :disabled="(itemLen < 2 || cardLoading)">
                            <template #icon>
                                <RightCircleOutlined></RightCircleOutlined>
                            </template>
                        </a-button>
                    </a-space>
                </template>
                <template v-if="itemLen > 0">
                    <transition-group tag="div" name="fade-transform">
                        <div v-for="(item, index) in handData.items" :key="index" v-show="(index === currentItem)">
                            <a-form-item :label="`物品名称`" :name="['items', index, 'name']" :rules="[{
                                required: true, message: '请输入物品名称'
                            }]">
                                <a-input v-model:value="item.name"></a-input>
                            </a-form-item>
                            <a-form-item label="物品编号" :name="['items', index, 'number']" :rules="[{
                                required: true, message: '请输入物品编号'
                            }]">
                                <a-input v-model:value="item.number"></a-input>
                            </a-form-item>
                            <a-form-item label="物品数量" :name="['items', index, 'count']" :rules="[{
                                required: true, message: '请输入物品数量'
                            }]">
                                <a-input-number v-model:value="item.count" :min="1" :step="1"
                                    :precision="0"></a-input-number>
                            </a-form-item>
                            <a-form-item label="设备序列号" :name="['items', index, 'serial']" :rules="[{
                                required: true, message: '请输入设备序列号'
                            }]">
                                <a-input v-model:value="item.serial"></a-input>
                            </a-form-item>
                            <a-form-item label="备注" :name="['items', index, 'desc']">
                                <a-input v-model:value="item.desc" showCount :maxlength="15"></a-input>
                            </a-form-item>
                        </div>
                    </transition-group>
                </template>
                <template v-else>
                    <a-empty style="margin-top:70px;" description="尚未添加物品" />
                </template>

            </a-card>

            <form-footer :loading="createLoading" @clickEmpty="(type) => downloadFile(type)">
                <template #fan>
                    <l-btn url="offboardApproval" text="离职审批表"></l-btn>
                    <!-- <a-button type="link" @click="$router.push({ name: 'offboardApproval' })">离职审批表</a-button> -->
                    <d-btn :url="['【人事】离岗离职承诺书.doc']" text="离职离岗承诺书.doc"></d-btn>
                </template>
            </form-footer>
        </a-form>
    </div>
</template>