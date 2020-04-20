<template>
	<div class="nav_app">
		<div class="top">
			<img src="../assets/Index/4.png">
		</div>
		<ul>
			<li v-for="(item, index) in nav" v-bind:key="item.name">
				<div :class="{'active':ms==item.to}" @click="go(index)"><img class="leftimg" :src="ms==item.to?item.imgs:item.img"><span>{{item.name}}</span><img class="right" src="../assets/Index/箭头.png" alt="" v-if="item.item.length>0"> </div>
				<ul v-if="item.item.length>0&&item.to==ms">
					<li v-for="(items, indexs) in item.item" :class="{'active':ims==items.to}" @click="go(index,indexs)" :key="indexs"><span></span>{{items.name}}</li>
				</ul>
			</li>
		</ul>	
	</div>
</template>
<script>
	
	export default{
		name:"nav_app",
		props:['ms','ims'],
		data(){
			return {
				navs:[{name:'首页',img:require('../assets/Index/首页.png'),imgs:require('../assets/Index/首页选中.png'),item:[],to:'/Index'},
				{name:'课程管理',img:require('../assets/Index/课程表选中.png'),imgs:require('../assets/Index/课程表.png'),item:[],to:'/Class'},
				{name:'推荐管理',img:require('../assets/Index/推荐.png'),imgs:require('../assets/Index/推荐点击.png'),item:[],to:'/Recommend'},
				{name:'分类管理',img:require('../assets/Index/分类.png'),imgs:require('../assets/Index/分类点击.png'),item:[],to:'/Category'},
				{name:'学分管理',img:require('../assets/Index/学分选中.png'),imgs:require('../assets/Index/学分.png'),item:[],to:'/Credit'},
				{name:'评价管理',img:require('../assets/Index/评价选中.png'),imgs:require('../assets/Index/评价.png'),item:[],to:'/Comment'},
				{name:'消息管理',img:require('../assets/Index/微信选中.png'),imgs:require('../assets/Index/微信.png'),item:[],to:'/Suggest'},
				{name:'用户管理',img:require('../assets/Index/用户选中.png'),imgs:require('../assets/Index/用户.png'),item:[],to:'/User'},
				{name:'财务管理',img:require('../assets/Index/财富选中.png'),imgs:require('../assets/Index/财富.png'),item:[],to:'/Vip'},
				{name:'资源管理',img:require('../assets/Index/照片选中.png'),imgs:require('../assets/Index/照片.png'),item:[],to:'/Banner'},
				{name:'系统管理',img:require('../assets/Index/设置选中.png'),imgs:require('../assets/Index/设置.png'),item:[
					{name:'账号管理',to:'/Management'},
					{name:'权限管理',to:'/Power'},
					{name:'日志管理',to:'/Log'},
				],to:'/Management'},
				{name:'账号设置',img:require('../assets/Index/账户.png'),imgs:require('../assets/Index/账户选中.png'),item:[],to:'/Setinfo'}],
				navsName:['首页','课程管理','推荐管理','分类管理','学分管理','评价管理','消息管理','用户管理','财务管理','资源管理',"系统管理"],
				pages:[],//权限
				nav:[],//显示
			}
		},
		created(){
			var that = this;
			// this.nav[this.ms].active=true
			// if(this.ims){
			// 	this.nav[this.ms].item[this.ims].active=true
			// }
			// console.log(this.ims)
			this.pages = JSON.parse(sessionStorage.getItem("Pages"));
			console.log(this.pages)
			let indexs = 0
			this.pages.forEach((el)=>{
				if(that.navsName.indexOf(el.menu_title) > -1){
					indexs = that.navsName.indexOf(el.menu_title)
					that.nav.push(that.navs[indexs])
					//console.log(that.navs[indexs])
				}
			})
			that.nav.push(that.navs[11])
		},
		methods:{
			go(e,s){
				// console.log(s)
				if(s){
					this.$router.replace(this.nav[e].item[s].to)
				}else{
					this.$router.replace(this.nav[e].to)
				}
			},
		},
	}
</script>

<style scoped lang="scss">
	::-webkit-scrollbar {display:none}
	.nav_app{
		 
		
		float: left;
		width: 12%;
		min-width: 120px;
		min-height: 100vh;
		max-height: 100vh;
		overflow: auto;
		font-size: 0.16rem;
		height: 100%;
		background: #132035;
		color: #fff;
		.top{
			
			width: 100%;
			height: 0.85rem;
			text-align: center;
			align-items: center;
			padding: 0.15rem;
			>img{
				height: 0.82rem;
				width: 1.33rem;
				display: block;
				margin: 0 auto;
			}
		}
		>ul{
			width: 100%;
			padding: 0.3rem 0.2rem;
			list-style: none;
			>li{
				margin-bottom: 0.3rem;
				>div{
					cursor:pointer;
					width: 100%;
					border-radius: 0.08rem;
					line-height: 0.4rem;
					position: relative;
					>.leftimg{
						// width: 0.25rem;
						position: absolute;
						left: 0.3rem;
						top: 50%; 
					  transform: translate(-50%,-50%);
					}
					>.right{
						right: 0;
						position: absolute;
						top: 50%; 
					  transform: translate(-50%,-50%);
					}
					>span{
						margin-left: 0.65rem;
					}
				}
				>div.active{
					background: linear-gradient(to right, #4275EE 0%,#47A4F0 100%);;
					color: white;
				}
				>ul{
					list-style: none;
					width: 100%;
					padding: 0.2rem 0.2rem 0 0.45rem;
					>li{
						margin-bottom: 0.1rem;
						cursor: pointer;
						color: #aaaaaa;
						>span{
							width: 0.1rem;
							height: 0.1rem;
							display: inline-block;
							border-radius: 50%;
							margin-right: 0.1rem;
						}
						
					}
					>li.active{
						color: #38f;
						>span{
							background: #38f;
							color:#38f
						}
					}
				}
			}
		}
	}
</style>
