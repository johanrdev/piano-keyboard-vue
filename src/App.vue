<template lang="html">
  <nav class="bg-slate-700 relative text-slate-400 px-4 py-2">
    <div class="max-w-5xl mx-auto flex justify-between">
      <span class="text-2xl select-none inline-flex items-center h-12">AppName</span>
      <button @click="menu.show = !menu.show"
        class="border-2 border-slate-500 w-12 h-12 shrink-0 rounded hover:text-slate-200 transition-all md:hidden">
        <font-awesome-icon icon="bars"></font-awesome-icon>
      </button>

      <ul class="hidden md:flex">
        <li v-for="link in links" :key="link.id">
          <a :href="link.path" class="block p-3 hover:bg-slate-600 hover:text-slate-200 transition-all rounded">{{ link.name }}</a>
        </li>
      </ul>
    </div>
    <transition appear name="slide-in">
      <div class="absolute top-full left-0 right-0 bg-slate-800 p-1 mx-2 rounded-b-md md:hidden" v-if="menu.show" v-click-outside="menu.close">
        <ul>
          <li v-for="link in links" :key="link.id">
            <a :href="link.path" class="block p-3 hover:bg-slate-600 hover:text-slate-200 transition-all rounded">{{ link.name }}</a>
          </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>
<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  setup() {
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

    onMounted(() => {
      window.addEventListener('resize', onResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', onResize)
    })

    return {
      menu,
      links
    }
  }
}
</script>
<style lang="css">
.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(-100%);
}

.slide-in-enter-to,
.slide-in-leave-from {
  transform: translateX(0);
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: .35s ease-in-out;
}
</style>