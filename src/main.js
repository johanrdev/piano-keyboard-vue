import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBars)
library.add(faPlay)
library.add(faStop)

const clickOutside = {
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = (event) => {
      event.stopPropagation()
      
      if (!(el == event.target || el.contains(event.target)))  {
        binding.value()
      }
    }
    
    document.addEventListener('mousedown', el.clickOutsideEvent)
  },
  unmounted: (el) => {
    document.removeEventListener('mousedown', el.clickOutsideEvent)
  }
}

const app = createApp(App)
app.directive('click-outside', clickOutside)
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')