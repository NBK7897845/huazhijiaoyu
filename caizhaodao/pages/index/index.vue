<template>
	<view class="content">
		<view class="header">
		  <view class="select">
		    <image class="h-img" :src="userInfo.headerimg||'http://39.98.47.251:91/upload/xcximg/touxiang.png'" @click="Touser"></image>
		    <input @focus='Toselect' placeholder="请输入关键字搜索"></input>
		    <image class="i-img" src="/static/shouye/6.png"></image>
		  </view>
		  <swiper class='lunbo'  autoplay='true' interval='4000'>
		    <swiper-item v-for="(item,index) in lunboList" @click="Todetail(item.classurl)" :key="index">
		      <image :src='item.imgurl'></image>
		    </swiper-item>
		  </swiper>
		  <view class="tab">
		    <view class="t-item" v-for="(item,index) in tabList" @click="Tolist(item.id)" :key="index">
		      <image mode=widthFix :src="item.imgurl"></image>
		      <view>{{item.text}}</view>
		    </view>
		  </view>
		</view>
		<view class="container">
		  <view class="c-top">
				<image class="c-img" src="http://39.98.47.251:91/upload/xcximg/100.png"></image>
				<!-- <image class="c-img" src="/static/shouye/11.png"></image> -->
		    <view class="c-left">新课推荐</view>
		  </view>
		  <view class="c-item">
		    <view class="class" v-for="(item,index) in classList" @click="Todetail(item.class_id)" :key="index">
		      <image :src="item.class_cover"></image>
		      <view class="c-name">{{item.class_name}}</view>
		      <view class="c-title">
		        <view class="can" v-if="item.is_charge=='2'">免费</view>
		        <view class="can blue" v-else>会员</view>
		        <view class="c-tab" style="color:#A0A0A0">{{item.category_name}}</view>
		      </view>
		    </view>
		  </view>
		</view>
		<view class="container">
		  <view class="c-top">
				<image class="c-img" src="http://39.98.47.251:91/upload/xcximg/102.png"></image>
		    <view class="c-left">人气推荐</view>
		  </view>
		  <view class="p-item">
				<view class="class" v-for="(item,index) in classList" @click="Todetail(item.class_id)" :key="index">
					<image :src="item.class_cover"></image>
					<view class="p-right">
						<view class="p-name">{{item.class_name}}</view>
						<view class="p-title">
						  <view class="can" v-if="item.is_charge=='2'">免费</view>
						  <view class="can blue" v-else>会员</view>
						  <view class="p-tab" style="color:#A0A0A0">{{item.category_name}}</view>
						</view>
					</view>
				</view>
		  </view>
		</view>
		<view class="container">
		  <view class="c-top">
				<image class="c-img" src="http://39.98.47.251:91/upload/xcximg/101.png"></image>
		    <view class="c-left">推荐课程</view>
		    <view class="c-right" @click="Tolist(0)">更多</view>
		  </view>
		  <view class="r-item">
		    <view class="class" v-for="(item,index) in classList" @click="Todetail(item.class_id)" :key="index">
		      <image :src="item.class_cover"></image>
		      <view class="r-name">{{item.class_name}}</view>
		      <view class="r-title">
		        <view class="can" v-if="item.is_charge=='2'">免费</view>
		        <view class="can blue" v-else>会员</view>
		        <view class="r-tab" style="color:#A0A0A0">{{item.category_name}}</view>
		      </view>
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				userInfo:'',
				page:1,
				pagesize:10,
				user_token:'d8b3cc8c269c7e7cc78e7b8f3c08ae48',
				lunboList:[],
				tabList: [
					{ id: 0,imgurl:'/static/shouye/13.png',text:'AI开发',classurl:'6'},
					{ id: 1,imgurl:'/static/shouye/10.png',text:'AI营销',classurl:'6'},
					{ id: 2,imgurl:'/static/shouye/11.png',text:'AI艺术',classurl:'6'},
					{ id: 3,imgurl:'/static/shouye/12.png',text:'AI养老',classurl:'6'},
				],
				classList: [],
			}
		},
		onLoad() {
			// this.alogin()
			// var state = this.HGetUrl("LoginType")
			// if (state == null) {
			// 		state = "4"
			// }
			// console.log(state)
			// var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfa1ed8188640c520&redirect_uri=http%3a%2f%2fgzh.caizhaodao.com&response_type=code&connect_redirect=1&scope=snsapi_base&state=" + '4' + "#wechat_redirect"
			// console.log(url)
			// // if (this.HGetUrl("state")==null) { window.location.href = url }
			// // var code = this.HGetUrl("code");
			// var code ='code'
			// console.log('code',code)
			// this.login(code)
			
			uni.setStorage({
				key: 'user_token',
				data: '?user_token='+'d8b3cc8c269c7e7cc78e7b8f3c08ae48',
				success: () =>{
					this.user_token = '?user_token='+'d8b3cc8c269c7e7cc78e7b8f3c08ae48'
					this.getBanner();
					this.getClass();
				}
			});
		},
		// onReachBottom(){
		// 	console.log('上拉');
		// 	this.getClass()
		// },
		methods: {
			// alogin(){
			// 	console.log('alogin')
			// 	uni.request({
			// 		url:'https://wx.caizhaodao.com/'+'api/login/wechat',
			// 		method:'post',
			// 		data:{},
			// 		success:res=>{
			// 			console.log(res)
			// 		}
			// 	})
			// },
			login(code){
				
				// api/login/wechat;
				uni.request({
					url: this.$url+'api/login/wechat'+code,
					method: 'post',
					data: {},
					success: res => {
						console.log(res,'用户信息');
						if(res.data.code == 10000){
							this.userInfo = res.data.data.data;
							this.user_token = "?user_token=" + res.data.data.user_token
							console.log('this.userInfo')
							console.log('this.user_token')
							uni.setStorage({
								key: 'userInfo',
								data: JSON.stringify(this.userInfo),
								success: () =>{
									//console.log(1)
								}
							});
							uni.setStorage({
								key: 'user_token',
								data: '?user_token='+res.data.data.user_token,
								success: () =>{
									//console.log(1)
								}
							});
							this.getBanner();
							this.getClass();
						}else{
							this.$msg(res.data.msg)
						}
					},
				})
			},
			HGetUrl(name) {
			    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			    var r = window.location.search.substr(1).match(reg);
			    if (r != null) return decodeURIComponent(r[2]); return null;
			},
			Toselect(){
				uni.navigateTo({
				    url: 'select'
				});
			},
			Tolist(e){
				uni.navigateTo({
				    url: 'list?id='+e
				});
			},
			Todetail(e){
				uni.navigateTo({
				    url: 'class?class_id='+e
				});
			},
			Touser(e){
				uni.navigateTo({
				    url: '/pages/user/user'
				});
			},
			getdata(){
				uni.request({
					url: this.$url+'api/user/personalcenter'+this.user_token,
					method: 'post',
					data: {},
					success: res => {
						console.log(res,'信息');
						if(res.data.code == 10000){
							this.userInfo.headerimg = res.data.data.headerimg;//this.lunboList = res.data.data
						}else{
							this.$msg(res.data.msg)
						}
					},
				})
			},
			getClass(){// 获取推荐视频
				if(this.total){
					if(this.page*this.pagesize>this.total){
						this.$msg('没有更多数据了')
						return false;
					}else{
						this.page++
					}
				}
				uni.request({
					url: this.$url+'api/classes/recommend'+this.user_token+'&page=1&num=6',
					method: 'post',
					data: {},
					success: res => {
						console.log(res,'推荐视频');
						if(res.data.code == 10000){
							this.classList = [...this.classList,...res.data.data.list];
							this.total = res.data.data.total_num;
						}else{
							this.$msg(res.data.msg)
						}
					},
				})
			},
			getBanner(){// 获取轮播图
				uni.request({
					url: this.$url+'api/banner/firstpage'+this.user_token,
					method: 'post',
					data: {},
					success: res => {
						console.log(res,'轮播');
						if(res.data.code == 10000){
							this.lunboList = res.data.data
						}else{
							this.$msg(res.data.msg)
						}
					},
				})
			},
		}
	}
</script>

<style  lang="scss">

	.content {
		background: #efefef;
	}
	.header {
		padding: 0 30rpx 30rpx 30rpx;
		background: #ffffff;
	}
	.select{
	  padding: 18rpx 0;
	  position: relative;
		display: flex;
		align-items: center;
	}
	.select .h-img{
	  width: 60rpx;
	  height: 60rpx;
	  border-radius: 50%;
	}
	.select .i-img{
	  width: 32rpx;
	  height: 32rpx;
	  border-radius: 50%;
	  position: absolute;
	  top: 50%;
	  transform: translate(0, -50%);
	  right: 420rpx;
	}
	.select input{
	  position: absolute;
	  right: 0;
	  top: 50%;
	  transform: translate(0, -50%);
	  text-align: center;
	  height: 60rpx;
	  width: 87%;
	  font-size: 26rpx;
	  border-radius: 30rpx;
	  background: #EFEFEF;
	}
	.lunbo{
	  width: 100%;
	  height: 320rpx;
	  margin-top: 12rpx;
	  border-radius: 30rpx;
	  overflow: hidden;
	}
	.lunbo image{
	  width: 100%;
	  height: 320rpx;
	}
	.tab{
	  display: flex;
	  justify-content: space-between;
	  margin-top: 25rpx;
	}
	.tab .t-item{
	  width: 121rpx;
	  font-size: 25rpx;
	  text-align: center;
	  color: #727272;
	}
	.tab .t-item image{
	  width: 100%;
	}
	.container{
	  padding: 30rpx 30rpx 30rpx 30rpx;
	  margin: 30rpx 0 0 0;
	  background: #fff;
	}
	.container .c-top{
	  position: relative;
	  font-size: 30rpx;
	  margin-bottom:30rpx;
		display: flex;
		line-height: 2;
	}
	.container .c-top .c-img{
		width: 50rpx;
		height: 50rpx;
	}
	.container .c-top .c-left{
	  color: #1d1d1d;
		margin-left: 10rpx;
	}
	.container .c-top .c-right{
	  position: absolute;
	  right: 0;
	  bottom: 0;
	  color: #727272;
	  font-size: 26rpx;
	}
	.container .c-item{
	  display: flex;
	  justify-content: space-between;
	  flex-wrap: wrap;
	}
	.container .c-item .class{
	  margin-bottom: 30rpx;
	  width: 48%;
		box-shadow:0px 10rpx 12rpx 0px rgba(0, 0, 0, 0.11);
	}
	.container .c-item .class image{
	  width: 100%;
	  height: 175rpx;
	  
	}
	.container .c-item .class .c-name{
	  font-size: 26rpx;
	  line-height: 40rpx;
		height: 80rpx;
		padding: 0 10rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	  margin-top: 12rpx;
	}
	.container .c-item .class .c-title{
	  font-size: 22rpx;
	  color: #a0a0a0;
		padding: 0 10rpx;
		margin: 22rpx 0 30rpx;
	}
	.can{
	  float: right;
		color: green;
	}
	.blue{
	  color: #109AFA;
	}
	.container .p-item .class{
		display: flex;
		width: 100%;
	}
	.container .p-item .class:not(:last-of-type){
		border-bottom: 1px solid #ccc;
		margin-bottom: 30rpx;
		padding-bottom: 30rpx;
	}
	.container .p-item .class image{
		width: 43%;
		height: 170rpx;
		margin-right: 40rpx;
		border-radius: 16rpx;
	}
	.container .p-item .p-right{
		width: 51%;
		display: flex;
		flex-flow: column;
		justify-content: space-between;
	}
	.container .p-right .p-name{
	  font-size: 26rpx;
	  line-height: 1.7;
	}
	.container .p-right .p-title{
		font-size: 22rpx;
		color: #a0a0a0;
	}
	.container .r-item .class:not(:last-of-type){
		border-bottom: 1px solid #ccc;
		margin-bottom: 30rpx;
		padding-bottom: 30rpx;
	}
	.container .r-item .class image{
		width: 100%;
		height: 320rpx;
		border-radius: 16rpx;
	}
	.container .r-item .class .r-name{
		font-size: 28rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		margin: 16rpx 0;
	}
	.container .r-item .class .r-title{
		font-size: 22rpx;
		color: #a0a0a0;
	}
</style>
