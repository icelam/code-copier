import Vue from 'vue/dist/vue.esm';
import App from './popup/App';

Vue.config.productionTip = false;
Vue.config.devtools = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
