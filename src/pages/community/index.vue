<template>
  <div>
    <!-- 容器 -->
    <n-scrollbar>
      <n-card class="w-60vw h-1300px shadow-lg" style="margin: 0 auto">
        <div class="flex flex-col">
          <!-- 标题区 -->
          <div
            class="flex flex-row justify-center mr-2 bg-sky-100 text-3xl font-sans w-full">
            {{ cname }}
          </div>
          <n-divider />
          <!-- 内容区 -->
          <n-list hoverable clickable bordered>
            <!-- FIXME: 间隔问题待修复 -->
            <n-list-item v-for="(data, index) in postList.list" :key="index">
              <n-thing content-style="margin-top: 10px;">
                <!-- 题目 -->
                <template #header>
                  <div class="font-sans text-2xl">{{ data.topic.title }}</div>
                </template>
                <!-- 头像 -->
                <template #avatar>
                  <n-avatar round size="large" class="mt-2">
                    <n-icon size="25">
                      <icon-fa6-solid-user-graduate></icon-fa6-solid-user-graduate>
                    </n-icon>
                  </n-avatar>
                </template>
                <!-- 帖子信息 -->
                <template #description>
                  <n-space
                    class="font-sans text-2xl"
                    size="small"
                    style="margin-top: 4px">
                    <n-tag :bordered="false" type="info" size="small">
                      {{ data.topicUser[0].name }}
                    </n-tag>
                    <n-tag :bordered="false" type="info" size="small">
                      {{ data.topic.createTime }}
                    </n-tag>
                  </n-space>
                </template>
                <!-- {{ data.topic.content }} -->
                我是博客正文
                <template #footer>
                  <div class="flex flex-row mt-10">
                    <p class="font-sans text-2xl">评论:</p>
                    <div class="ml-4">
                      <div
                        v-for="(comment, index) in data.postData"
                        :key="index">
                        {{ comment.post.content }} ————@
                        {{ comment.user[0].name }}
                      </div>
                    </div>
                  </div>
                </template>
              </n-thing>
            </n-list-item>
          </n-list>
        </div>
      </n-card>
    </n-scrollbar>
  </div>
</template>

<script lang="ts" setup>
// TODO:以后增加markdown支持
import { dateSolve } from '@/utils/date'
import { PostList } from './types/post'

const route = useRoute()
interface TempTalkParams {
  id: number
  cname: string
}
const tempTalkParams = ref<TempTalkParams>(
  route.query as unknown as TempTalkParams
)
const { id, cname } = toRefs(tempTalkParams.value)

const postList = ref<PostList>({ total: 1, list: [] })
const pagination = reactive({
  current: 1,
  pageSize: 5,
})
// @part:获取主题下的帖子
const fetchPostList = async () => {
  try {
    //FIXME: total后台出错所以这里要处理
    const res = await axios.get(`/talk/api/community/topic/cid/${id.value}`, {
      params: { current: pagination.current, pageSize: pagination.pageSize },
    })
    // postList.value.total = res.data.total
    postList.value.total = res.data.data.length
    postList.value.list = res.data.data
    // 处理时间字符串
    //TODO:注意这里处理得不完全
    postList.value.list.forEach((item) => {
      item.topic.createTime = dateSolve(item.topic.createTime)
    })
  } catch (error) {
    console.log(error)
  }
}
onMounted(async () => {
  fetchPostList()
})
</script>

<style lang="sass" scoped></style>
