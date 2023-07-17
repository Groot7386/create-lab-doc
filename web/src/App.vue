<!--
 * @Author: fanjf
 * @Date: 2022-11-28 15:47:22
 * @LastEditTime: 2022-12-26 17:24:50
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\App.vue
 * @Description: 🎉🎉🎉
-->
<script setup>
import { onMounted, reactive } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import { HomeOutlined, UnorderedListOutlined } from '@ant-design/icons-vue'
import { menuList } from '@/views/config'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn')
const metaInfo = reactive({
  time: '',
  user: '',
  email: ''
})
onMounted(() => {
  metaInfo.time = document.getElementsByTagName("meta")?.time?.content || '20221129 09:17:53';
  metaInfo.user = document.getElementsByTagName("meta")?.user?.content || 'あがつまぜんいつ';
  metaInfo.email = document.getElementsByTagName("meta")?.email?.content || 'hdu424fan@qq.com';
  let version = document.getElementsByTagName("meta")?.version?.content;
  localStorage.setItem('version',version)
})
const url = location.href;
const notShowPage = {
  header: ['notFound'],
  footer: ['notFound']
}
</script>

<template>
  <header v-if="!notShowPage.header.includes($route.name)">
    <a-page-header class="page-header" style="border: 1px solid rgb(235, 237, 240)"
      :title="$route.meta?.title || '我、夜ト神来たり降り'" @back="() => $router.push({ name: 'home' })">
      <template #backIcon>
        <HomeOutlined />
      </template>
      <template #extra>
        <a-dropdown key="more" :trigger="['click']">
          <a-button shape="circle" type="link">
            <UnorderedListOutlined :style="{ fontSize: '20px', verticalAlign: 'top' }" />
          </a-button>
          <template #overlay>
            <a-menu @click="({ key }) => $router.push({ name: key })">
              <template v-for="item in menuList" :key="item.key">
                <a-menu-item v-if="item.show" :key="item.key"> {{ item.title }}</a-menu-item>
              </template>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-page-header>
  </header>
  <Suspense>
    <ConfigProvider :locale="zhCN">
      <router-view v-slot="{ Component }" class="router-box">
        <transition name="scale" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </ConfigProvider>
  </Suspense>
  <!-- <RouterView  /> -->
  <footer class="footer" v-if="!notShowPage.footer.includes($route.name)">
    <ul class="more-list">
      <li class="item">Build Time：{{ metaInfo.time }}</li>
      <li class="item">Author：{{ metaInfo.user }}</li>
      <li class="item">Email：<a-tooltip placement="right" title="Contact Me"><a
            :href="`mailto:${metaInfo.email}?subject=【反馈生成文档应用问题】&body=您好：我在使用【生成${$route.meta.title}模板】应用（构建时间：${metaInfo.time}；应用地址：${url}）时，发现一些问题，需要与您进行沟通。具体的问题与建议如下：\r\n`"
            class="email">{{ metaInfo.email }}</a></a-tooltip>
      </li>
    </ul>
  </footer>
</template>

<style scoped>
.header {
  text-align: center;
  opacity: 0;
  font-weight: bold;
  animation: dateRabge .8s linear forwards 0.8s;
}

.router-box {
  padding: 20px;
  min-height: calc(100vh - 170px);
}

.more-list {
  padding: 0;
  font-size: 16px;
  line-height: 1.6;
  color: #eef467;
  list-style-type: none;
  text-align: center;
  /* width: 300px; */
  margin: 0 auto;
  /* margin-bottom: 20px; */
}

.email {
  color: #eef467;
}

@keyframes dateRabge {
  0% {
    opacity: 0;
    transform: translateY(-100%);
    ;
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
