<template>
  <n-grid y-gap="12" :cols="1">
    <!-- 院校库 -->
    <n-gi>
      <SchoolItem />
    </n-gi>
    <!-- 讨论区 -->
    <n-gi>
      <TalkItem />
    </n-gi>
  </n-grid>
</template>

<script lang="ts" setup>
import SchoolItem from './components/school-item.vue'
import TalkItem from './components/talk-item.vue'
</script>

<style lang="sass" scoped></style>
