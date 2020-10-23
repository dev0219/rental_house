import Vue from 'vue'
import App from './App.vue'
import "@/plugins/echarts";
import 'echarts/lib/component/title';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import vuetify from './plugins/vuetify';
import alert from './plugins/alert';
import axios from 'axios';

// import styles
import './assets/styles/styles.scss';

import router from './router'


Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  alert,
  vuetify,
  render: h => h(App)
}).$mount('#app')
