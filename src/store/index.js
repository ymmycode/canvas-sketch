import {defineStore} from 'pinia'
import { ref, computed } from 'vue'

const useMainStore = defineStore('main', () => {
  const userData = ref(null)
  
  //getter example
  // const doubleCount = computed(() => count.value * 2)

  // action
  function increment() {
    count.value++
  }
})

export default useMainStore