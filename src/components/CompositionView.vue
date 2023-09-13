<template lang="html">
  <section class="flex flex-col bg-slate-200" v-if="mergedData && mergedData.length">
    <nav class="p-2 border-b border-slate-300 bg-slate-400 flex justify-center">
      <button @click="stop"
        class="py-2 rounded bg-slate-500 text-slate-200 hover:bg-slate-600 hover:text-slate-100 transition-all w-20"
        v-if="playback.playing">
        <font-awesome-icon :icon="['fas', 'stop']"></font-awesome-icon>
      </button>
      <button @click="play"
        class="py-2 rounded bg-slate-500 text-slate-200 hover:bg-slate-600 hover:text-slate-100 transition-all w-20"
        v-else>
        <font-awesome-icon :icon="['fas', 'play']"></font-awesome-icon>
      </button>
    </nav>
    <ul class="flex p-4 overflow-y-auto max-h-[200px] flex-wrap">
      <li
        class="h-14 mr-1 mb-1 last:mr-0 flex justify-center items-center bg-teal-300 border-teal-500 border-2 rounded-md"
        :class="{
          'min-w-[20px] w-[20px]': data.duration === '16n',
          'min-w-[40px] w-[40px]': data.duration === '8n',
          'min-w-[80px] w-[80px]': data.duration === '4n',
          'min-w-[160px] w-[160px]': data.duration === '2n',
          'min-w-[320px] w-[320px]': data.duration === '1m',
        }" v-for="(data, index) in mergedData" :key="index">
        <span class="select-none text-3xl text-teal-700" :class="{ 'text-white': data.idx === counter }"
          v-html="useDurationCode(data.duration).code"></span>
      </li>
    </ul>
  </section>
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
    const playback = ref({
      playing: false
    })
    const counter = ref(-1)
    const synth = new Tone.Synth({
      onsilence: () => stop()
    }).toDestination()

    const addNote = (val) => {
      melody.value.rhythm.push(val.duration)
      melody.value.pitches.push(val.note)

      mergedData.value = mergeMusicDataPart({
        rhythms: melody.value.rhythm,
        notes: melody.value.pitches,
        startTime: 0
      })
    }

    const play = () => {
      playback.value.playing = true
      counter.value = -1

      let part = new Tone.Part((time, value) => {
        synth.triggerAttackRelease(value.note, value.duration, time)

        counter.value++
      }, mergedData.value).start()

      Tone.Transport.start()
    }

    const stop = () => {
      playback.value.playing = false
      counter.value = -1

      Tone.Transport.cancel()
    }

    return {
      counter,
      addNote,
      mergedData,
      useDurationCode,
      playback,
      play,
      stop
    }
  }
}
</script>
<style lang="css"></style>