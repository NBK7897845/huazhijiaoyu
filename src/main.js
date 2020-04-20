// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import qs from 'qs'
import echarts from 'echarts'
import element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import Filters from './filters/index.js';
import fun from './filters/fun.js'
//全局函数
Vue.use(fun);
Vue.use(element);
Vue.use(echarts);

Vue.config.productionTip = false
//全局过滤器
Object.keys(Filters).forEach(k => Vue.filter(k, Filters[k]));
//axios.defaults.baseURL= 'http://118.190.55.27:1001/'
axios.defaults.baseURL= 'http://39.98.47.251:91/'
//axios.defaults.baseURL= 'http://localhost:6555/'

Vue.prototype.$axios = axios
Vue.prototype.$qs = qs

// 富文本编辑器
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
new Vue({
	router,
	store,
	mounted() {
		setRem();
	},
	render: h => h(App)
}).$mount('#app')
function setRem() {
	var whdef = 100 / 1920; // 表示1920的设计图,使用100PX的默认值
	var bodyWidth = document.body.clientWidth; // 当前窗口的宽度
	if (bodyWidth < 1100) { //设置最小宽度
		bodyWidth = 1100
	}
	var rem = bodyWidth * whdef; // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
	document.getElementsByTagName('html')[0].style.fontSize = rem + 'px';
}
window.addEventListener('load', setRem);
window.addEventListener('resize', setRem);