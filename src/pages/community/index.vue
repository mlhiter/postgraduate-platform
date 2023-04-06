<template>
  <div></div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()
interface TempTalkParams {
  id: number
  cname: string
}
const tempTalkParams = ref(route.query as unknown as TempTalkParams)
const talkParams = toRefs(tempTalkParams.value)
</script>

<style lang="sass" scoped></style>
