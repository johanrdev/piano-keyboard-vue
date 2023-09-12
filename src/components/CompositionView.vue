<template lang="html">
  <ul class="flex bg-gray-200 p-4">
    <li class="h-14 mr-1 last:mr-0 flex justify-center items-center bg-teal-300 border-teal-500 border-2 rounded-md" :class="{ 
      'w-[25%]': data.duration === '16n',
      'w-[50%]': data.duration === '8n',
      'w-[100%]': data.duration === '4n',
      'w-[200%]': data.duration === '2n',
      'w-[400%]': data.duration === '1m'
      }" v-for="(data, index) in mergedData" :key="index">
      <span class="select-none text-3xl text-teal-700" v-html="useDurationCode(data.duration).code"></span>
    </li>
  </ul>
</template>
<script>
import { ref } from 'vue'
import * as Tone from 'tone'
import { toneRhythm } from 'tone-rhythm'
import { useDurationCode } from '../composables/useDurationCode'

export default {
  setup() {
    const { mergeMusicDataPart } = toneRhythm(Tone.Time)
    const melody = ref({
      rhythm: ['4n', '2n', '16n', '16n', '16n', '16n'],
      pitches: ['C3', 'E3', 'G3', 'F3', 'E3', 'D3']
    })
    const mergedData = ref(null)

    mergedData.value = mergeMusicDataPart({
      rhythms: melody.value.rhythm,
      notes: melody.value.pitches,
      startTime: 0
    })

    return {
      mergedData,
      useDurationCode
    }
  }
}
</script>
<style lang="css">
  
</style>