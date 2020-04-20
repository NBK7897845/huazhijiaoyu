import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
		  path: '/',
			redirect:'/Login',
		},
		{
			path: '/Login',
			name: 'Login',
			component:  () => import('../components/Login.vue')
    },
    {
			path: '/Index',
			name: 'Index',
			component:  () => import('../components/Index.vue')
    },
    {
			path: '/Class',
			name: 'Class',
			component:  () => import('../components/Class.vue')
		},
		{
			path: '/Credit',
			name: 'Credit',
			component:  () => import('../components/Credit.vue')
    },
		{
			path: '/Comment',
			name: 'Comment',
			component:  () => import('../components/Comment.vue')
    },
		{
			path: '/Suggest',
			name: 'Suggest',
			component:  () => import('../components/Suggest.vue')
    },
		{
			path: '/User',
			name: 'User',
			component:  () => import('../components/User.vue')
    },
		{
			path: '/Vip',
			name: 'Vip',
			component:  () => import('../components/Vip.vue')
    },
		{
			path: '/Banner',
			name: 'Banner',
			component:  () => import('../components/Banner.vue')
    },
		{
			path: '/Management',
			name: 'Management',
			component:  () => import('../components/Management.vue')
    },
		{
			path: '/Setinfo',
			name: 'Setinfo',
			component:  () => import('../components/Setinfo.vue')
    },
		{
			path: '/Power',
			name: 'Power',
			component:  () => import('../components/Power.vue')
    },
		{
			path: '/Log',
			name: 'Log',
			component:  () => import('../components/Log.vue')
    },
		{
			path: '/Category',
			name: 'Category',
			component:  () => import('../components/Category.vue')
    },
		{
			path: '/Recommend',
			name: 'Recommend',
			component:  () => import('../components/Recommend.vue')
    },
		// {// --------------------
		// 	path: '/InquirePrescriptions',
		// 	redirect:'/InquirePrescription',
		// },
		// {
		// 　　path: '/InquirePrescription',
		// 　　name: 'InquirePrescription',
		// 　　component: () => import('../components/InquirePrescription.vue')
		// },
		// {
		// 　　path: '/InquirePrescriptionweat',
		// 　　name: 'InquirePrescriptionweat',
		// 　　component: () => import('../components/InquirePrescriptionweat.vue')
		// },
  ]
})
