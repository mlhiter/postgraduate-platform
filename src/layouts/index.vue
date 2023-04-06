<template>
  <n-layout
    class="h-full relative"
    content-style="height: 100%; display: flex; flex-direction: column">
    <!-- 顶部导航区域：固定在窗口上方 -->
    <n-layout-header bordered class="h-40px bg-sky-200">
      <div class="relative px-2 flex justify-around items-center">
        <n-icon size="40">
          <router-link to="/index">
            <img src="../assets/logo.svg" alt="Icon" />
          </router-link>
        </n-icon>
        <!-- 网站题目 -->
        <p class="text-sky-600 text-30px">小青鱼</p>
        <!-- 登录注册按钮 -->
        <p class="text-sky-500 text-lg">
          <span class="m-1">登录</span>
          <span class="m-1">注册</span>
        </p>
      </div>
    </n-layout-header>
    <!-- 内容区域 -->
      <n-layout-content class="h-full mt-4 mx-40 overflow-hidden">
        <router-view v-slot="{ Component }">
          <transition :duration="200" name="fade-top" mode="out-in">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </n-layout-content>
    <!-- 底部相关信息区域 -->
    <n-layout-footer :embedded="true" class="h-40px mt-6 bg-white">
      <div>
        <!-- 项目 -->
        <div class="flex justify-center items-center">
          <n-icon-wrapper :size="24" :border-radius="10" color="#38bdf8">
            <n-icon size="20">
              <icon-material-symbols-edit></icon-material-symbols-edit>
            </n-icon>
          </n-icon-wrapper>
          <a
            class="ml-5 cursor-pointer underline underline-offset-2"
            target="_blank"
            href="https://github.com/mlhiter/postgraduate-platform">
            小青鱼 - 考研互动平台
          </a>
        </div>
        <!-- 开发者 -->
        <div class="text-center ml-1">
          <a
            class="mr-4 cursor-pointer"
            target="_blank"
            href="https://github.com/Aurorein">
            @Aurorain.
          </a>
          <a
            class="cursor-pointer"
            target="_blank"
            href="https://github.com/mlhiter">
            @mlhiter
          </a>
        </div>
      </div>
    </n-layout-footer>
  </n-layout>
</template>

<script lang="ts" setup>
import {} from 'vue'
onMounted(async () => {
  console.log(111)
})
</script>

<style lang="sass" scoped></style>
