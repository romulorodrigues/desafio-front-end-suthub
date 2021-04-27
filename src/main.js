import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import '@/assets/icofont.min.css';
import '@/assets/style.css';

Vue.config.productionTip = false

import '@/axios/index.js';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
