import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'


Vue.config.productionTip = false
Vue.use(Vuetify, {
  iconfont: 'mdi'
}
);

export default new Vuetify({
});
