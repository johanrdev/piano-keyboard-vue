<template lang="html">
  <ul class="flex bg-gray-200 p-4 overflow-x-auto flex-wrap" v-if="mergedData && mergedData.length">
    <li class="h-14 mr-1 mb-1 last:mr-0 flex justify-center items-center bg-teal-300 border-teal-500 border-2 rounded-md"
      :class="{
        'min-w-[20px] w-[20px]': data.duration === '16n',
        'min-w-[40px] w-[40px]': data.duration === '8n',
        'min-w-[80px] w-[80px]': data.duration === '4n',
        'min-w-[160px] w-[160px]': data.duration === '2n',
        'min-w-[320px] w-[320px]': data.duration === '1m'
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
      rhythm: [],
      pitches: []
    })
    const mergedData = ref(null)

    const addNote = (val) => {
      melody.value.rhythm.push(val.duration)
      melody.value.pitches.push(val.note)

      console.log(melody.value)

      mergedData.value = mergeMusicDataPart({
        rhythms: melody.value.rhythm,
        notes: melody.value.pitches,
        startTime: 0
      })
    }

    return {
      addNote,
      mergedData,
      useDurationCode
    }
  }
}
</script>
<style lang="css"></style>