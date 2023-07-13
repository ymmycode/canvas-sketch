import {defineStore} from 'pinia'
import { ref, computed } from 'vue'

export const useMainStore = defineStore('main', {

  state: () => ({ 
    count: 0, 
    canvasStream: null,
  }),

  getters: {
  },

  actions: {
    increment() {
      this.count++
    },

    captureCanvasStream(payload) {
      console.log(payload)
      // this.canvasStream = payload
    }
  },
})