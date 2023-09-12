<template lang="html">
  <ul class="flex bg-gray-200 p-4">
    <li class="w-[100%] h-14 mr-1 last:mr-0 flex justify-center items-center bg-teal-300 border-teal-500 border-2 rounded-md">
      <span class="select-none text-3xl text-teal-700" v-html="'&#119137'"></span>
    </li>
  </ul>
</template>
<script>
import { ref } from 'vue'

export default {
  setup() {
    const melody = ref({
      rhythm: ['4n', '2n', '16n', '16n', '16n', '16n'],
      pitches: ['C3', 'E3', 'G3', 'F3', 'E3', 'D3']
    })

    return {
      melody
    }
  }
}
</script>
<style lang="css">
  
</style>