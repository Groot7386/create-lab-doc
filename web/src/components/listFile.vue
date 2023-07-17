<!--
 * @Author: fanjf
 * @Date: 2022-12-22 16:49:10
 * @LastEditTime: 2023-01-29 09:47:03
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\components\listFile.vue
 * @Description: 🎉🎉🎉
-->
<script setup>
import { ref, reactive, computed } from 'vue'
import { InfoCircleOutlined } from '@ant-design/icons-vue'
const colorData = ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple']
const hoursEmoji = {
    0: '🕛',
    12: '🕛',
    1: '🕐',
    13: '🕐',
    2: '🕑',
    14: '🕑',
    3: '🕒',
    15: '🕒',
    4: '🕓',
    16: '🕓',
    5: '🕔',
    17: '🕔',
    6: '🕕',
    18: '🕕',
    7: '🕖',
    19: '🕖',
    8: '🕗',
    20: '🕗',
    9: '🕘',
    21: '🕘',
    10: '🕙',
    22: '🕙',
    11: '🕚',
    23: '🕚'
}
const props = defineProps({
    fileList: {
        type: Array,
        default: () => {
            return []
        }
    },
})

const isShowDialog = ref(false)
const currentComponent = ref('')
const tagColorList = ref({})
const colorIndex = (arr) => {
    let index = Math.floor(Math.random() * arr.length);
    return index
}
// const
let tempColorData = [...colorData]
// const tagValue = ref([])
props.fileList.forEach(ele => {
    ele.tag.forEach(i => {
        if (!tagColorList.value.hasOwnProperty(i)) {
            let index = colorIndex(tempColorData)
            tagColorList.value[i] = tempColorData[index]
            tempColorData.splice(index, 1)
            if (tempColorData.length === 0) {
                tempColorData = [...colorData]
            }
        }
    })
})
const searchParams = reactive({
    name: '',
    tagValue: 'all'
})
const cListFile = computed(() => { return props.fileList.filter(ele => ele.name.includes(searchParams.name) && (searchParams.tagValue === 'all' || ele.tag.includes(searchParams.tagValue))) })
</script>
<template>
    <div>
        <a-space style="margin-top:10px;">
            <a-select style="width:100px;" v-model:value="searchParams.tagValue">
                <a-select-option value="all">全部</a-select-option>
                <a-select-option v-for="item in Object.keys(tagColorList)" :value="item">{{ item }}</a-select-option>
            </a-select> <a-input v-model:value="searchParams.name" placeholder="名称检索"></a-input></a-space>
        <a-list item-layout="horizontal" :data-source="cListFile" :pagination="{
            pageSize: 10,
        }">
            <template #renderItem="{ item }">
                <a-list-item v-if="item.show">
                    <a-list-item-meta>
                        <template #title>
                            <div><span class="file-title">{{ item.name }}</span>
                                <a-space><a-tag v-for="tag in item.tag" :color="tagColorList[tag]"
                                        style="vertical-align: top;">{{ tag }}</a-tag>
                                </a-space>
                            </div>
                        </template>
                        <template #description>
                            <div>🎅🏻 {{ item?.user || '佚 名' }}&nbsp;&nbsp;&nbsp;&nbsp;{{
                                hoursEmoji[new
                                    Date(item.time).getHours()]
                            }} <span :title="$formatDate(item.time, 'yyyy-MM-dd HH:mm:ss')">{{
                                    $formatDate(item.time)
                                }}</span></div>
                            <div style="margin-top:5px" v-if="!!item.desc">🔍 {{ item.desc }}</div>
                        </template>
                    </a-list-item-meta>
                    <!-- {{ item.desc }} -->
                    <template #actions>
                        <template v-if="item.btn.download.length > 0">
                            <d-btn :url="item.btn.download"></d-btn>
                        </template>
                        <template v-if="item.btn.preview.length > 0">
                            <p-btn :url="item.btn.preview[0]"></p-btn> <!--考虑下多个文件需要预览，目前只支持一个文件预览-->
                        </template>
                        <template v-if="item.btn.link.length > 0">
                            <l-btn :url="item.btn.link[0]"></l-btn>
                        </template>
                        <template v-if="!!item.btn.detail">
                            <a-button type="link" @click="currentComponent = item.btn.detail; isShowDialog = true"
                                title="查看详情">
                                <template #icon>
                                    <InfoCircleOutlined></InfoCircleOutlined>
                                </template>
                            </a-button>
                        </template>
                    </template>
                </a-list-item>
            </template>
        </a-list>
        <a-drawer title="关于文件的补充说明" v-model:visible="isShowDialog">
            <!-- <zhelibao-text></zhelibao-text> -->
            <h1>🙇🏻‍♂️敬请期待</h1>
            <hr />
            <component :is="currentComponent"></component>
            <!-- <[currentComponent]></[currentComponent]> -->
        </a-drawer>
    </div>

</template>
