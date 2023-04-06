<template>
  <div>
    <!-- 容器 -->
    <n-card class="w-60vw h-1200px shadow-lg" style="margin: 0 auto">
      <div class="flex flex-row">
        <!-- 左侧内容区 -->
        <div
          class="flex flex-col items-center mr-2"
          style="height: 70vh; width: 30%">
          <!-- 学校头像 -->
          <n-image class="w-25 h-25 m-5" preview-disabled :src="imgUrl" />
          <div>{{ schoolDetail.schoolName }}</div>
          <n-divider />
          <!-- 学校信息 -->
          <n-space class="ml-10 mr-3 mt-4">
            <n-tag v-if="schoolDetail.is211">211院校</n-tag>
            <n-tag v-if="schoolDetail.is985">985院校</n-tag>
            <n-tag type="success">位置:{{ schoolDetail.region }}</n-tag>
            <n-tag type="warning">直属：{{ schoolDetail.subjection }}</n-tag>
            <n-tag type="error" v-if="schoolDetail.graduateSchool">
              研究生院
            </n-tag>
            <n-tag type="info" v-if="schoolDetail.selfMarking">自主招生</n-tag>
            <n-tag type="success">学校编码:{{ schoolDetail.code }}</n-tag>
            <n-tag type="warning">学校所属类别:{{ schoolDetail.ab }}</n-tag>
            <n-tag type="error">学校等级评定结果:{{ schoolDetail.df }}</n-tag>
          </n-space>
        </div>
        <!-- 右侧区 -->
        <div>
          <!-- 右侧上侧 -->
          <div class="flex flex-col" style="width: 70%">
            <!-- 题目 -->
            <div class="font-sans text-3xl w-20">专业数据</div>
            <!-- 检索区 -->
            <div class="w-130 h-18 mr-10 ml-20 mt-5">
              <n-space class="flex flex-row justify-center items-end">
                <!-- 专业名称 -->
                <n-dropdown
                  class=""
                  trigger="hover"
                  :options="subjectOptions"
                  @select="changeSubject">
                  <n-button>专业名称:{{ subject }}</n-button>
                </n-dropdown>
                <!-- 硕士类型 -->
                <n-dropdown
                  class=""
                  trigger="hover"
                  :options="MasterTypeOptions"
                  @select="changeMasterType">
                  <n-button>硕士类型:{{ showMaster }}</n-button>
                </n-dropdown>
                <!-- 年份 -->
                <n-dropdown
                  class=""
                  trigger="hover"
                  :options="yearOptions"
                  @select="changeYear">
                  <n-button>年份:{{ year }}</n-button>
                </n-dropdown>
                <n-button type="info" @click="filterSubjectData(filterParams)">
                  搜索
                </n-button>
              </n-space>
            </div>
          </div>
          <!-- 右侧下侧:列表区 -->
          <n-data-table
            class="mb-3"
            :columns="subjectColumns"
            :data="subjectDataList.list"
            :pagination="pagination"
            :bordered="true"
            @update:page="handlePageChange" />
          <n-data-table
            :columns="courseColumns"
            :data="subjectDataList.list"
            :pagination="pagination"
            :bordered="true"
            @update:page="handlePageChange" />
        </div>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import queryString from 'query-string'
import { useRoute } from 'vue-router'
const route = useRoute()
//获取图片
const imgUrl = ref<string>('')
// @function: 获取学校图片接口
const fetchSchoolImage = async (schoolName: string) => {
  //TODO:增加loading条
  // setLoading(true);
  try {
    const res = (await axios.get(`/static/${schoolName}.jpg`, {
      responseType: 'blob',
    })) as Blob
    let blob = new Blob([res], { type: res.type })
    imgUrl.value = URL.createObjectURL(blob)
  } catch (err) {
    console.log(err)
  } finally {
    // setLoading(false)
  }
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
//院校信息
const schoolDetail = route.query as unknown as SchoolDetail
onMounted(async () => {
  fetchSchoolImage(schoolDetail.schoolName)
})

// @part:获取专业数据
const subjectOptions = [
  {
    label: '计算机',
    key: '计算机',
  },
  {
    label: '软件工程',
    key: '软件工程',
  },
  {
    label: '电子信息',
    key: '电子信息',
  },
  {
    label: '网络安全',
    key: '网络安全',
  },
]
const MasterTypeOptions = [
  {
    label: '学硕',
    key: 1,
  },
  {
    label: '专硕',
    ley: 0,
  },
]
const yearOptions = [
  {
    label: '2021',
    key: 2021,
  },
  {
    label: '2022',
    key: 2022,
  },
  {
    label: '2023',
    key: 2023,
  },
]

// 选择筛选数据
// NOTE:之后记得限制严格一点，这里只能选特定选项
const subject = ref<string>('计算机')
const master = ref<number>(0)
const year = ref<number>(2021)
//展示数据
const showMaster = computed(() => {
  switch (master.value) {
    case 0:
      return '专硕'
    case 1:
      return '学硕'
    default:
      return '专硕'
  }
})
const changeSubject = async (key: string) => {
  subject.value = key
}
const changeMasterType = async (key: number) => {
  master.value = key
}
const changeYear = async (key: number) => {
  year.value = key
}

// 筛选参数
interface FilterParams {
  school: string
  year: number
  type: number
  major: string
}
const filterParams = ref<FilterParams>({
  school: schoolDetail.schoolName,
  year: year.value,
  type: master.value,
  major: subject.value,
})
interface SubjectDataItem {
  province: string
  academy: string
  institute: string
  majorNum: string
  minorNum: string
  major: string
  majorDirection: string
  pattern: string
  politics: string
  english: string
  math: string
  proCourse: string
  majorNums: string
  specityNums: string
  remark: string
}
interface SubjectDataList {
  total: number
  list: SubjectDataItem[]
}
const subjectDataList = ref<SubjectDataList>({ total: 0, list: [] })
//类型筛选数据
const filterSubjectData = async (data: FilterParams) => {
  try {
    const res = await axios.post(
      '/api/institutions/major/data',
      queryString.stringify(data),
      {
        params: {
          current: pagination.page,
          pageSize: pagination.pageSize,
        },
      }
    )
    //NOTE: page后端应该改成list
    subjectDataList.value.total = res.data.total
    subjectDataList.value.list = res.data.page
    subjectDataList.value.list.forEach((item) => {
      if (item.specityNums === 'null') {
        item.specityNums = '0'
      }
      if (item.remark === null) {
        item.remark = '无'
      }
    })
    console.log(subjectDataList.value)
  } catch (error) {
    console.log(error)
  }
}
// 分页
const pagination = reactive({
  page: 1,
  pageSize: 5,
  pageCount: Math.ceil(subjectDataList.value.total / 5),
  simple: true,
})

const handlePageChange = async () => {
  filterSubjectData(filterParams.value)
}
const subjectColumns = [
  {
    title: '专业代码',
    key: 'majorNum',
  },
  {
    title: '专业名称',
    key: 'major',
  },
  {
    title: '专业方向代码',
    key: 'minorNum',
  },
  {
    title: '专业方向名称',
    key: 'majorNum',
  },
  {
    title: '招生院系',
    key: 'institute',
  },
  {
    title: '培养方式',
    key: 'pattern',
  },
]
const courseColumns = [
  {
    title: '政治课程代码及名称',
    key: 'politics',
  },
  {
    title: '外语课程代码及名称',
    key: 'english',
  },
  {
    title: '数学课程代码及名称',
    key: 'math',
  },
  {
    title: '专业课程代码及名称',
    key: 'proCourse',
  },
  {
    title: '计划招生人数',
    key: 'majorNums',
  },
  {
    title: '特殊招生人数',
    key: 'specityNums',
  },
  {
    title: '备注信息',
    key: 'remark',
  },
]
onMounted(async () => {
  filterSubjectData(filterParams.value)
})
</script>

<style lang="sass" scoped></style>
