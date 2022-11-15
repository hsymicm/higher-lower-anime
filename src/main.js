import { createApp } from 'vue'
import i18n from '@/i18n.js'
import App from '@/App.vue'
import '@/assets/css/tailwind.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 
{ 
    faCaretDown, 
    faCaretUp, 
    faCaretLeft, 
    faCaretRight, 
    faCheck, 
    faXmark, 
    faShare, 
    faGlobe,
    faGamepad,
} 
from '@fortawesome/free-solid-svg-icons'

library.add(
    faCaretDown, 
    faCaretUp, 
    faCaretLeft, 
    faCaretRight, 
    faCheck, 
    faXmark, 
    faShare, 
    faGlobe,
    faGamepad,
)

/* add font awesome icon component */
createApp(App)
.use(i18n)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
