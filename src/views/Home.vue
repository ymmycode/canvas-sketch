<template>
  <div>
    <vue-drawing-canvas 
      ref="VueCanvasDrawing" 
      :width="1920"
      :height="1080"
      :styles="{
        border: 'solid 1px #000',
      }"
    />
  </div>
</template>

<script setup>
import VueDrawingCanvas from 'vue-drawing-canvas'

</script>

<style lang="scss" scoped>

</style>