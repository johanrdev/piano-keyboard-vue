<template lang="html">
  <ul class="flex overflow-x-auto pb-8 sm:justify-center">
    <li v-for="key in piano.keys" :key="key.base" class="shrink-0 rounded-b" :class="{
      'w-16 h-40 mx-1 bg-white text-slate-500': key.color === 'W',
      'w-12 h-20 -mx-6 z-10 bg-gray-900 text-slate-300': key.color === 'B',
      'bg-slate-300': key.pressed && key.color === 'W',
      'bg-slate-500': key.pressed && key.color === 'B'
    }">
      <button @click="trigger(key)" class="inline-flex justify-center items-end w-full h-full cursor-pointer select-none">
        <span v-if="settings.labels.show">{{ key.base }}</span>
      </button>
    </li>
  </ul>
</template>
<script>
import { onMounted, onUnmounted, ref } from 'vue'
import * as Tone from 'tone'

export default {
  setup() {
    const settings = ref({
      labels: {
        show: false
      }
    })

    const piano = ref({
      range: [2, 5],
      octave: 3,
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

    const playback = ref({
      duration: '4n'
    })

    const synth = new Tone.Synth().toDestination()

    const trigger = (key) => {
      key.pressed = true

      const note = key.base + piano.value.octave
      synth.triggerAttackRelease(note, playback.value.duration)

      setTimeout(() => key.pressed = false, Tone.Time('4n').toSeconds() * 1000)
    }

    const onKeydown = (event) => {
      console.log(event.key)

      switch (event.key) {
        case 'z':
          trigger(piano.value.keys.find(k => k.base === 'C'))
          break
        case 's':
          trigger(piano.value.keys.find(k => k.base === 'C#'))
          break
        case 'x':
          trigger(piano.value.keys.find(k => k.base === 'D'))
          break
        case 'd':
          trigger(piano.value.keys.find(k => k.base === 'D#'))
          break
        case 'c':
          trigger(piano.value.keys.find(k => k.base === 'E'))
          break
        case 'v':
          trigger(piano.value.keys.find(k => k.base === 'F'))
          break
        case 'g':
          trigger(piano.value.keys.find(k => k.base === 'F#'))
          break
        case 'b':
          trigger(piano.value.keys.find(k => k.base === 'G'))
          break
        case 'h':
          trigger(piano.value.keys.find(k => k.base === 'G#'))
          break
        case 'n':
          trigger(piano.value.keys.find(k => k.base === 'A'))
          break
        case 'j':
          trigger(piano.value.keys.find(k => k.base === 'A#'))
          break
        case 'm':
          trigger(piano.value.keys.find(k => k.base === 'B'))
          break
      }
    }

    onMounted(() => {
      document.addEventListener('keydown', onKeydown)
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', onKeydown)
    })

    return {
      settings,
      piano,
      trigger
    }
  }
}
</script>
<style lang="css"></style>