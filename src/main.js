import Vue from 'vue'
import App from './App.vue'

// 关闭vue的生产提示
Vue.config.productionTip = false

new Vue({
  el:'#root',
  render: h => h(App),
  //安装全局事件总线，$bus就是当前应用的vm
  beforeCreate() {
    Vue.prototype.$bus = this
  }
})