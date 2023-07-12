<template>
  <div>
    <vue-drawing-canvas 
      ref="VueCanvasDrawing" 
      :width="600"
      :height="400"
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