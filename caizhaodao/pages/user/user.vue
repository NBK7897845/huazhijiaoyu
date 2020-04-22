<template>
	<view class="">
		<view class="header">
		  <image src="/static/use/beijing.png"></image>
		  <view class="h-info">
		    <image :src="form.headerimg||'http://39.98.47.251:91/upload/xcximg/touxiang.png'" mode="aspectFill"></image>
		    <view class="h-name">
		      <image v-if="form.vipstatus" src="/static/use/huiyuan.png"></image><text>{{form.realname||'昵称'}}</text>
		    </view>
		    <view class="h-list">
		      <view class="h-item">
		        <view>{{form.wdxf||0}}</view>
		        <view class="danwei">我的学分</view>
		      </view>
		      <view class="h-item">
		        <view>{{form.yxsc||0}}</view>
		        <view class="danwei">已学时长</view>
		      </view>
		      <view class="h-item">
		        <view>{{form.yxkc||0}}</view>
		        <view class="danwei">已学课程</view>
		      </view>
		    </view>
		  </view>
		  <view class="pages">
		    <view class="p-item" v-for="(item,index) in mylist" @click="toDetail(item.name)" :key="index">
		      <view>
		        <image class="p-left" :src="item.src" mode="widthFix"></image>
		        <text>{{item.name}}</text>
		      </view>
		      <image class="p-right" src="/static/use/to.png"></image>
		    </view>
		  </view>
		</view>
		<view style="height:20rpx;background:#EFEFEF;"></view>
		<view class="pages" style="padding-top:10rpx;padding-bottom:250rpx;overflow: hidden;">
		  <view class="p-item" v-for="(item,index) in mylist2" @click="toDetail(item.name)" :key="index">
		    <view>
		      <image class="p-left" :src="item.src"></image>
		      <view>{{item.name}}</view>
		    </view>
		    <image class="p-right" src="/static/use/to.png"></image>
		  </view>
		</view>
		<view class="towhite" @click="toIndex">返回首页</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_token:'',
				form:{
					headerimg:'',
					realname:'',
					vipstatus:false,
					wdxf:'',
					yxkc:'',
					yxsc:'',
				},
				mylist:[
					{ id: 1, name: "个人信息", src:"/static/use/yonghuming.png"},
					{ id: 2, name: "我的会员", src:"/static/use/xingxing.png"},
					{ id: 3, name: "我的课程", src:"/static/use/wenjianjia.png"},
					{ id: 4, name: "我的成就", src:"/static/use/biaoqian.png"},
				],
				mylist2: [
					{ id: 1, name: "关于华职", src: "/static/use/gongneng.png" },
					{ id: 2, name: "意见反馈", src: "/static/use/xinxi.png" },
				]
			}
		},
		onShow() {
			this.getdata();
		},
		created(){
			
			
		},
		onLoad() {
			var that = this;
			uni.getStorage({
			    key: 'user_token',
			    success: (res)=> {
						console.log(res)
			      that.user_token = res.data;
			    }
			});
			this.getdata();
			// this.getBanner();
			// this.getClass();
		},
		methods:{
			toDetail(e){
				var that = this;
				console.log(e)
				if (e == '个人信息') {
					wx.navigateTo({
						url: '/pages/user/setuser',
					})
				} else if (e == '我的会员') {
					wx.navigateTo({
						url: '/pages/user/member',
					})
				} else if (e == '我的课程') {
					wx.navigateTo({
						url: '/pages/user/myclass',
					})
				} else if (e == '我的成就') {
					wx.navigateTo({
						url: '/pages/user/success',
					})
				} else if (e == '关于华职') {
					wx.navigateTo({
						url: '/pages/user/aboutus',
					})
				} else if (e == '意见反馈') {
					wx.navigateTo({
						url: '/pages/user/feedback',
					})
				}
			},
			toIndex(){
				wx.navigateTo({
					url: '/pages/index/index',
				})
			},
			getdata(){
				uni.request({
					url: this.$url+'api/user/personalcenter'+this.user_token,
					method: 'post',
					data: {},
					success: res => {
						console.log(res,'信息');
						if(res.data.code == 10000){
							this.form = res.data.data;//this.lunboList = res.data.data
						}else{
							this.$msg(res.data.msg)
						}
					},
				})
			},
		},
	}
</script>
<style lang="scss">
	.header{
	  position: relative;
	  background: #fff;
	}
	.header>image{
	  height: 300rpx;
	  width: 1000rpx;
	  margin-left: -130rpx;
	}
	.h-info{
	  top: 100rpx; 
	  width: 690rpx;
	  left: 30rpx;
	  position: absolute;
	  background: #fff;
	  border-radius:16rpx;
	  box-shadow:0 9rpx 32rpx 0 rgba(35,31,32,0.19);
	}
	.h-info>image{
	  width: 140rpx;
	  height: 140rpx;
	  position: absolute;
	  top: -60rpx;
	  left: 50%;
	  transform: translate(-50%,0);
	  border:6rpx solid rgba(255, 255, 255, 1);
	  border-radius:50%;
	}
	.h-info>.h-name{
	  text-align: center;
	  align-items: center;
	  margin-top: 120rpx;
	  display: flex;
	  justify-content: center;
	}
	.h-info>.h-name>image{
	  width: 40rpx;
	  height: 35rpx;
	}
	.h-list{
	  overflow: hidden;
	  margin: 30rpx 0;
	}
	.h-item{
	  float: left;
	  width: 33%;
	  text-align: center;
	  font-size: 35rpx;
	  font-weight: bold;
	  line-height: 60rpx;
	  color: #1D1D1D;
	}
	
	.danwei{
	  font-weight:400;
	  font-size: 30rpx;
	  color: #707070;
	}
	.pages{
	  padding: 200rpx 30rpx 0;
	}
	.p-item{
	  height: 120rpx;
	  font-size: 35rpx; 
	  width: 100%;
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	
	}
	.p-item>view{
	  width: 50%;
	  display: flex;
	  align-items: center;
	  font-size: 30rpx;
	  color: #252525;
	}
	.p-left{
	  width: 40rpx;
	  height : 40rpx;
	  margin-right: 50rpx;
	}
	.p-right{
	  width: 40rpx;
	  height: 40rpx;
	}
	.towhite{
	  position: fixed;
	  bottom: 30rpx;
	  width: 690rpx;
	  left: 50%;
	  transform: translate(-50%,0);
	  background: #106EFA;
	  text-align: center;
	  font-size: 35rpx;
	  height: 100rpx;
	  color: #fff;
	  border-radius: 50rpx;
	  line-height: 100rpx;
	  
	}
</style>