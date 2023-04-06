<template>
  <div class="h-45vh bg-sky-50 border-1 border-blue-500 rounded-lg">
    <!-- 标题区 -->
    <div class="flex justify-between items-center ml-2 mt-2 mb-4">
      <div class="flex justify-start items-center">
        <n-icon size="40">
          <icon-bx-book></icon-bx-book>
        </n-icon>
        <p class="text-2xl">院校库</p>
      </div>
      <div class="w-130 flex mr-10">
        <!-- 模糊查询 -->
        <n-space class="flex justify-center items-center mr-5">
          <n-input
            class="!w-40 mr-0.5"
            v-model:value="queryKey"
            type="text"
            placeholder="模糊查询" />
          <n-button type="info" @click="querySchoolListByKey">搜索</n-button>
        </n-space>
        <n-space>
          <!-- 省份 -->
          <n-input
            class="!w-20 mr-1"
            v-model:value="querySelectData.province"
            type="text"
            placeholder="省份"
            @keydown.enter="handleEnterKey" />
          <!-- 院校类型 -->
          <n-dropdown
            class=""
            trigger="hover"
            :options="schoolTypeOptions"
            @select="handleSchoolType">
            <n-button>院校类型</n-button>
          </n-dropdown>
        </n-space>
      </div>
    </div>
    <!-- 院校列表 -->
    <div class="flex justify-center flex-col items-center relative">
      <n-space justify="center">
        <div v-for="(data, index) in schoolDetailList.list" :key="index">
          <router-link
            :to="{
              path: '/Institution',
              query: {
                schoolName: data.schoolName,
                region: data.region,
                subjection: data.subjection,
                graduateSchool: data.graduateSchool,
                selfMarking: data.selfMarking,
                code: data.code,
                is211: data.is211,
                is985: data.is985,
                ab: data.ab,
                df: data.df,
              },
            }">
            <n-card
              hoverable
              bordered
              size="medium"
              class="flex flex-row justify-center items-center cursor-pointer">
              <n-image
                class="w-4 center"
                preview-disabled
                :src="imgUrlList[data.schoolName]" />
              {{ data.schoolName }}
            </n-card>
          </router-link>
        </div>
      </n-space>
      <!-- 分页 -->
      <n-pagination
        class="mt-6 absolute top-55"
        v-model:page="pagination.current"
        :page-count="schoolDetailList.total"
        simple />
    </div>
  </div>
</template>

<script lang="ts" setup>
import queryString from 'query-string'
// @part: 学校信息
// 分页信息
interface Pagination {
  current: number
  pageSize: number
}
const pagination = reactive<Pagination>({
  current: 1,
  pageSize: 15,
})
interface SchoolListDataParams {
  province?: string
  type?: string
}
interface SchoolDetail {
  schoolName: string
  region: string
  subjection: string
  graduateSchool: string
  selfMarking: string
  code: string
  is211: string
  is985: string
  ab: string
  df: string
  doctorStation?: any
}
interface SchoolDetailList {
  total: number
  list: SchoolDetail[]
}
const schoolDetailList = ref<SchoolDetailList>({ total: 10, list: [] })
// @function: 获取学校信息接口
const fetchSchoolList = async (data: SchoolListDataParams) => {
  try {
    const res = await axios.post(
      '/api/institutions/school-detail/list',
      queryString.stringify(data),
      {
        params: { current: pagination.current, pageSize: pagination.pageSize },
      }
    )
    schoolDetailList.value.list = res.data.page
    schoolDetailList.value.total = res.data.total
    //获取图片
    res.data.page.forEach((item: any) => {
      fetchSchoolImage(item.schoolName)
    })
  } catch (err) {
  } finally {
  }
}

// @part: 学校图片信息
// 所有学校的图片数据存在一个对象里
interface ImgUrlList {
  [schoolName: string]: string
}
const imgUrlList = ref<ImgUrlList>({})
// @function: 获取学校图片接口
const fetchSchoolImage = async (schoolName: string) => {
  //TODO:增加loading条
  // setLoading(true);
  try {
    const res = (await axios.get(`/static/${schoolName}.jpg`, {
      responseType: 'blob',
    })) as Blob
    let blob = new Blob([res], { type: res.type })
    imgUrlList.value[schoolName] = URL.createObjectURL(blob)
  } catch (err) {
    console.log(err)
  } finally {
    // setLoading(false)
  }
}

// @part: 检索部分
const querySelectData = ref<SchoolListDataParams>({})
const schoolTypeOptions = [
  {
    label: '985高校',
    key: 0,
  },
  {
    label: '211高校',
    key: 1,
  },
  {
    label: '双一流高校',
    key: 2,
  },
]

const handleEnterKey = async () => {
  pagination.current = 1
  pagination.pageSize = 15
  fetchSchoolList(querySelectData.value)
  console.log(schoolDetailList.value)
  //清除输入框内容
  // querySelectData.value.province = ''
}

const handleSchoolType = async (key: string) => {
  querySelectData.value.type = key
  // 刷新页码
  pagination.current = 1
  pagination.pageSize = 15
  fetchSchoolList(querySelectData.value)
}
// 模糊查询
const queryKey = ref<string>('')
const querySchoolList = async (queryKey: string) => {
  try {
    const res = await axios.get('/api/institutions/like-search/school', {
      params: {
        current: pagination.current,
        pageSize: pagination.pageSize,
        school_name: queryKey,
      },
    })
    schoolDetailList.value.list = res.data.page
    schoolDetailList.value.total = res.data.total
    //获取图片
    res.data.page.forEach((item: any) => {
      fetchSchoolImage(item.schoolName)
    })
  } catch (err) {
  } finally {
  }
}

// 点击按钮搜索
const querySchoolListByKey = async () => {
  // 刷新页码
  pagination.current = 1
  pagination.pageSize = 15
  querySchoolList(queryKey.value)
  //清楚搜索框的值
  queryKey.value = ''
}

// 当前页改动就重新请求
watch(pagination, async () => {
  fetchSchoolList({})
})
// 先请求一次
onMounted(async () => {
  fetchSchoolList({})
})
</script>

<style lang="sass" scoped>
n-input:focus
  border-color:#0284c7
  box-shadow: none
</style>
