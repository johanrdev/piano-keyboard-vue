<template lang="html">
  <nav>
    <ul class="flex">
      <li class="w-10 h-10 m-0.5 rounded inline-flex" v-for="length in noteLengths" :key="length.length">
        <label class="relative grow">
          <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl pointer-events-none" v-html="length.code"></span>
          <input type="radio" v-model="currentNoteLength" :value="length"
            class="appearance-none w-full h-full bg-slate-300 checked:bg-teal-500 rounded cursor-pointer" @change="changeNoteLength()" />
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

    return {
      currentNoteLength,
      noteLengths,
      changeNoteLength
    }
  }
}
</script>
<style lang="css"></style>