<template lang="html">
  <ul class="flex overflow-x-auto pb-8 sm:justify-center">
    <li v-for="key in piano.keys" :key="key.base" class="shrink-0 rounded-md transition-all" :class="{
      'w-16 h-40 mx-0.5 text-slate-500': key.color === 'W',
      'w-12 h-20 -mx-6 z-10 text-slate-300': key.color === 'B',
      'bg-white': !key.pressed && key.color === 'W',
      'bg-gray-900': !key.pressed && key.color === 'B',
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
  setup(_, { emit }) {
    const settings = ref({
      labels: {
        show: false
      }
    })

    const piano = ref({
      range: [1, 6],
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

    const synth = new Tone.Synth({
      onsilence: () => {
        piano.value.keys.forEach((key) => key.pressed = false)
      }
    }).toDestination()

    const trigger = (key) => {
      const note = key.base + piano.value.octave
      synth.triggerAttackRelease(note, playback.value.duration)
      key.pressed = true

      emit('addNote', { note, duration: playback.value.duration })
    }

    const increaseOctave = () => {
      piano.value.octave++

      if (piano.value.octave > piano.value.range[1]) {
        piano.value.octave = piano.value.range[1]
      }
    }

    const decreaseOctave = () => {
      piano.value.octave--

      if (piano.value.octave < piano.value.range[0]) {
        piano.value.octave = piano.value.range[0]
      }
    }

    const setNoteLength = (val) => {
      playback.value.duration = val
    }

    const increaseNoteLength = () => {
      emit('increaseNoteLength')
    }

    const decreaseNoteLength = () => {
      emit('decreaseNoteLength')
    }

    const onKeydown = (event) => {
      switch (event.key) {
        case 'a':
          trigger(piano.value.keys.find(k => k.base === 'C'))
          break
        case 'w':
          trigger(piano.value.keys.find(k => k.base === 'C#'))
          break
        case 's':
          trigger(piano.value.keys.find(k => k.base === 'D'))
          break
        case 'e':
          trigger(piano.value.keys.find(k => k.base === 'D#'))
          break
        case 'd':
          trigger(piano.value.keys.find(k => k.base === 'E'))
          break
        case 'f':
          trigger(piano.value.keys.find(k => k.base === 'F'))
          break
        case 't':
          trigger(piano.value.keys.find(k => k.base === 'F#'))
          break
        case 'g':
          trigger(piano.value.keys.find(k => k.base === 'G'))
          break
        case 'y':
          trigger(piano.value.keys.find(k => k.base === 'G#'))
          break
        case 'h':
          trigger(piano.value.keys.find(k => k.base === 'A'))
          break
        case 'u':
          trigger(piano.value.keys.find(k => k.base === 'A#'))
          break
        case 'j':
          trigger(piano.value.keys.find(k => k.base === 'B'))
          break
        case '-':
          decreaseOctave()
          break
        case '+':
          increaseOctave()
          break
        case 'ArrowLeft':
          decreaseNoteLength()
          break
        case 'ArrowRight':
          increaseNoteLength()
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
      trigger,
      setNoteLength
    }
  }
}
</script>
<style lang="css"></style>