<template>
  <div class="h-40vh bg-green-50 border-1 border-green-500 rounded-lg">
    <!-- 标题区 -->
    <div class="flex justify-start items-center ml-2 mt-2">
      <n-icon size="40">
        <icon-bx-comment></icon-bx-comment>
      </n-icon>
      <p class="text-2xl">讨论区</p>
    </div>
    <!-- 主题列表 -->
    <div class="flex justify-center flex-col items-center m-15">
      <n-space justify="space-between">
        <div v-for="(data, index) in themeList" :key="index" class="mr-15">
          <n-card hoverable bordered size="large">
            <div class="flex flex-col items-center">
              <n-icon size="30"><icon-bx-comment-detail /></n-icon>
              <div class="mt-3">{{ data.cname }}</div>
            </div>
          </n-card>
        </div>
      </n-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @part 获取主题栏部分
interface ThemeList {
  id: number
  cname: string
}
const themeList = ref<ThemeList[]>([])
// @function: 获取主题列表的接口
const fetchThemeList = async () => {
  try {
    const res = await axios.get('/talk/api/community/category/all')
    themeList.value = res.data.data
  } catch (error) {
    console.log(error)
  }
}
onMounted(async () => {
  fetchThemeList()
})
</script>

<style lang="sass" scoped></style>
