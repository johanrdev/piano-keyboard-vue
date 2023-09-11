<template lang="html">
  <nav class="flex justify-center my-2">
    <ul class="flex">
      <li class="w-10 h-10 m-0.5 rounded inline-flex" v-for="length in noteLengths" :key="length.length">
        <label class="relative grow">
          <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl pointer-events-none" v-html="length.code"></span>
          <input type="radio" v-model="currentNoteLength" :value="length"
            class="appearance-none w-full h-full bg-slate-300 checked:bg-teal-500 rounded cursor-pointer transition-all" @change="changeNoteLength()" />
        </label>
      </li>
    </ul>
  </nav>
</template>
<script>
import { ref } from 'vue'

export default {
  setup(_, { emit }) {
    const noteLengths = ref([
      { length: '16n', code: '&#119137' },
      { length: '8n', code: '&#119136;' },
      { length: '4n', code: '&#119135;' },
      { length: '2n', code: '&#119134;' },
      { length: '1m', code: '&#119133;' },
    ])
    const currentNoteLength = ref(noteLengths.value.find(d => d.length === '4n'))

    const changeNoteLength = () => {
      emit('updateNoteLength', currentNoteLength.value)
    }

    const decreaseNoteLength = () => {
      let currentIndex = noteLengths.value.indexOf(currentNoteLength.value)
      let previousIndex = currentIndex - 1

      if (previousIndex >= 0) {
        currentNoteLength.value = noteLengths.value[previousIndex]
        emit('updateNoteLength', currentNoteLength.value)
      }
    }

    const increaseNoteLength = () => {
      let currentIndex = noteLengths.value.indexOf(currentNoteLength.value)
      let nextIndex = currentIndex + 1

      if (nextIndex <= noteLengths.value.length - 1) {
        currentNoteLength.value = noteLengths.value[nextIndex]
        emit('updateNoteLength', currentNoteLength.value)
      }
    }

    return {
      currentNoteLength,
      noteLengths,
      changeNoteLength,
      decreaseNoteLength,
      increaseNoteLength
    }
  }
}
</script>
<style lang="css"></style>