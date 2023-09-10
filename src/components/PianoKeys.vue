<template lang="html">
  <ul class="flex overflow-x-auto pb-8 sm:justify-center">
    <li v-for="key in piano.keys" :key="key.base" class="shrink-0 rounded-b" :class="{
      'w-16 h-60 mx-1 bg-white text-slate-500': key.color === 'W',
      'w-12 h-40 -mx-6 z-10 bg-gray-900 text-slate-300': key.color === 'B'
    }">
      <button @click="trigger(key)" class="inline-flex justify-center items-end w-full h-full cursor-pointer select-none">
        <span v-if="settings.labels.show">{{ key.base }}</span>
      </button>
    </li>
  </ul>
</template>
<script>
import { ref } from 'vue'
import * as Tone from 'tone'

export default {
  setup() {
    const settings = ref({
      labels: {
        show: false
      }
    })

    const piano = ref({
      octave: { min: 2, max: 5, value: 3 },
      keys: [
        { base: 'C', color: 'W', pressed: false },
        { base: 'C#', color: 'B', pressed: false },
        { base: 'D', color: 'W', pressed: false },
        { base: 'D#', color: 'B', pressed: false },

        { base: 'E', color: 'W', pressed: false },
        { base: 'F', color: 'W', pressed: false },
        { base: 'F#', color: 'B', pressed: false },
        { base: 'G', color: 'W', pressed: false },

        { base: 'G#', color: 'B', pressed: false },
        { base: 'A', color: 'W', pressed: false },
        { base: 'A#', color: 'B', pressed: false },
        { base: 'B', color: 'W', pressed: false },
      ]
    })

    const synth = new Tone.Synth().toDestination()

    const trigger = (key) => {
      const note = key.base + piano.value.octave.value
      synth.triggerAttackRelease(note, '4n')
    }

    return {
      settings,
      piano,
      trigger
    }
  }
}
</script>
<style lang="css"></style>