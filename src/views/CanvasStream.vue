<template>
  <div>
    <video id="canvas-stream" controls></video>
  </div>
</template>

<script setup>
import { onMounted, nextTick, computed } from 'vue'
import { useMainStore } from '../store'

const store = useMainStore()
// const sourceStream = computed(() => store.canvasStream)

onMounted(() => {
  nextTick(() => {
    const vidEl = document.getElementById('canvas-stream')
    // console.log(sourceStream.value)
    vidEl.srcObject = store.canvasStream
    vidEl.play()
  })
})

</script>

<style lang="scss" scoped>

</style>