<!--
 * @Author: fanjf
 * @Date: 2022-12-06 17:30:08
 * @LastEditTime: 2022-12-08 14:18:06
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\views\docx\handoverItemBackup.vue
 * @Description: 🎉🎉🎉
-->
<script setup>
import { ref, computed,getCurrentInstance  } from 'vue'
import { createDoc } from '@/hooks/createDoc'
import { researchNameList } from '@/views/config.js'
import { RestOutlined, LeftCircleOutlined, RightCircleOutlined, FileAddOutlined } from '@ant-design/icons-vue'
const internalInstance = getCurrentInstance()
const carouselDom = ref(null);
const currentItem = ref(0);
const cardLoading = ref(false);
const handData = ref({
    username: '',//姓名
    researchName: '大数据技术研究中心',//所在中心
    phone: '',//联系电话
    idcard: '',//身份证号码
    post: '',//岗位
    grade: '',//等级
    items: [
        {
            index: 1,
            name: 1,
            number: '',
            count: 1,
            serial: '',
            desc: '',//15字以内
            key: 'fan'
        },
    ]

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

    }
    downloadDoc({ type, templateName: 'handoverItemTemplate.docx', docData });
}

const changeitems = (type) => {
    carouselDom.value[type]();
}
const changeBefore = (current) => {
    console.log('current', current)
    // cardLoading.value = true;
    currentItem.value = current;

}
const changeAfter = (current) => {
    console.log('afterCahg🙇🏻‍♂️🙇🏻‍♂️🙇🏻‍♂️')
    // cardLoading.value = false;
}
const itemOPeration = (type) => {
    // let len = handData.items.length;
    // cardLoading.value = true;
    if (type === 'add') {
        handData.value.items.push({
            index: itemLen.value + 1,
            name: itemLen.value + 1,
            number: '',
            count: 1,
            serial: '',
            desc: '',//15字以内
            key: `fan${Date.now()}`
        })
        carouselDom.value.goTo(itemLen.value - 1);
        // cardLoading.value = false;
    } else {
        console.log('before', currentItem.value)
        console.log('handData.items before', JSON.stringify(handData.value.items));
        let data = [...handData.value.items]
        data.splice(currentItem.value,1);
        handData.value.items = [...data]
        internalInstance.ctx.$forceUpdate();
        // handData.value.items=data
        console.log('handData.items after', JSON.stringify(handData.value.items))
        carouselDom.value.next();
        // cardLoading.value = false;
        // if()
    }
}
</script>
<template>
    <div class="ltinerary-box">
        <a-form :model="handData" name="hand" ref="handForm" layout="vertical" @finish="downloadFile('notEmpty')">
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
            {{handData.items}}
            <a-card :title="`物品${currentItem + 1}`" style="overflow:hidden;height:530px;">
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
                            :disabled="cardLoading">
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
       
                <a-carousel :dots="false" ref="carouselDom" :before-change="(from, to) => changeBefore(to)"
                    :after-change="(current) => changeAfter(current)">
                    <div v-for="(item, index) in handData.items" :key="index">
                        {{handData.items}}
                        <a-form-item :label="`物品名称${item.name}`" :name="['items', index, 'name']" :rules="[{
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
                </a-carousel>
            </a-card>

            <form-footer :loading="createLoading" @clickEmpty="(type) => downloadFile(type)"></form-footer>
        </a-form>
    </div>
</template>