<template lang="html">
  <nav class="bg-slate-700 relative text-slate-400 px-2 py-2" v-click-outside="menu.close">
    <div class="max-w-5xl mx-auto flex justify-between">
      <span class="text-2xl select-none inline-flex items-center h-12">Vue3-MelodyMaker</span>
      <button @click="menu.show = !menu.show"
        class="border-2 border-slate-500 w-12 h-12 shrink-0 rounded hover:text-slate-200 transition-all md:hidden">
        <font-awesome-icon icon="bars"></font-awesome-icon>
      </button>

      <ul class="hidden md:flex">
        <li v-for="link in links" :key="link.id">
          <a :href="link.path"
            class="block p-3 hover:bg-slate-600 hover:text-slate-200 select-none cursor-pointer transition-all rounded">
            {{ link.name }}
          </a>
        </li>
      </ul>
    </div>

    <transition appear name="slide-in">
      <div class="absolute top-full left-0 right-0 bg-slate-800 p-1 mx-2 rounded-b-md md:hidden z-[9999]" v-if="menu.show">
        <ul>
          <li v-for="link in links" :key="link.id">
            <a :href="link.path"
              class="block p-3 hover:bg-slate-600 hover:text-slate-200 transition-all rounded cursor-pointer">
              {{ link.name }}</a>
          </li>
        </ul>
      </div>
    </transition>
  </nav>

  <main class="text-slate-600 leading-relaxed grow">
    <section class="bg-gray-100 max-w-5xl mx-auto">
      <ControlPanel ref="controlPanel" @update-note-length="onNoteLengthChanged" />
      <PianoKeys ref="pianoKeys" @decrease-note-length="onDecreaseNoteLength" @increase-note-length="onIncreaseNoteLength" @add-note="onAddNote" />
      <CompositionView ref="compositionView" />
    </section>
  </main>
</template>
<script>
import { ref, onMounted, onUnmounted } from 'vue'
import PianoKeys from './components/PianoKeys.vue'
import ControlPanel from './components/ControlPanel.vue'
import CompositionView from './components/CompositionView.vue'

export default {
  components: { PianoKeys, ControlPanel, CompositionView },
  setup() {
    const pianoKeys = ref(null)
    const controlPanel = ref(null)
    const compositionView = ref(null)
    
    const menu = ref({
      show: false,
      close: () => menu.value.show = false
    })

    const links = ref([
      { id: 1, name: 'Demo', path: '#' },
      { id: 2, name: 'About', path: '#' },
      { id: 3, name: 'Contact', path: '#' }
    ])

    const onResize = () => {
      if (window.innerWidth > 768 && menu.value.show) {
        menu.value.show = false
      }
    }

    const onNoteLengthChanged = (val) => {
      pianoKeys.value.setNoteLength(val)
    }

    const onDecreaseNoteLength = () => {
      controlPanel.value.decreaseNoteLength()
    }

    const onIncreaseNoteLength = () => {
      controlPanel.value.increaseNoteLength()
    }

    const onAddNote = (val) => {
      compositionView.value.addNote(val)
    }

    onMounted(() => {
      window.addEventListener('resize', onResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', onResize)
    })

    return {
      pianoKeys,
      controlPanel,
      compositionView,
      menu,
      links,
      onNoteLengthChanged,
      onDecreaseNoteLength,
      onIncreaseNoteLength,
      onAddNote
    }
  }
}
</script>
<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

html,
body {
  font-family: 'Poppins', sans-serif;
}

#app {
  height: 100vh;
}

.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-in-enter-to,
.slide-in-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: .35s ease;
}
</style>