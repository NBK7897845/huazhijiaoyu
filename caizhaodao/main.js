import Vue from 'vue'
import store from './store'
import App from './App'
// 封装ajax
import request from './common/request.js'
import api from './api/index.js'
import url from './common/config.js'

import * as Filters from './Filters/index.js';// 引入全局过滤器
Object.keys(Filters).forEach(key => {
  Vue.filter(key, Filters[key])
});// 全局过滤器
const msg = (title, duration=1500, mask=false, icon='none')=>{
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
Vue.config.productionTip = false
Vue.prototype.$store = store;

Vue.prototype.$request = request
Vue.prototype.$api = api //api
Vue.prototype.$url = url //url
Vue.prototype.$msg = msg //全局提示框
Vue.prototype.$Lookbol = true //无会员是否可以观看


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
