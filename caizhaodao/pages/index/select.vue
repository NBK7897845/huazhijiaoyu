<template>
	<view class="content">
		<view class="header">
		  <view class="select">
		    <image class="h-img" :src="userInfo.headerimg||'http://39.98.47.251:91/upload/xcximg/touxiang.png'" @click="Touser"></image>
		    <input input='inputchange' :value="value" focus='true' placeholder="请输入关键字搜索"></input>
		    <image class="i-img" src="/static/shouye/6.png"></image>		
				<button type="primary" class="button" @click="getClass">搜索</button>
		  </view>
		</view>
		<view class="info">
			<view class="subject" v-for="(item,index) in subjectList" :key="index">
				<image class="s-image" :src="item.class_cover"></image>
				<view class="title">
					<view class="t-name">{{item.class_name}}</view>
					<view class="t-text">{{item.describe}}</view>
					<view class="t-num">
						<image src="/static/shouye/look.png"></image>
						<text>{{item.watchnums}}</text>
					</view>
					<view class="look" @click="Todetail(item.class_id)">去学习</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				subjectList:[],
				value:'',
				userInfo:'',
			}
		},
		created(){
	
		},
		onLoad() {
			uni.getStorage({
			    key: 'user_token',
			    success: (res)=> {
						console.log(res)
			      this.user_token = res.data;
			    }
			});
			uni.getStorage({
			    key: 'userInfo',
			    success: (res)=> {
						console.log(res)
			      this.userInfo = res.data;
			    }
			});
			// this.getBanner();
			//this.getClass();
		},
		methods:{
			Todetail(e){// 跳转到详细视频
				uni.navigateTo({
				    url: 'class?class_id='+e
				});
			},
			inputchange(e){
				console.log(e);
				this.value = e.detail.value;
			},
			getClass(){// 获取视频列表
			  if(this.value == ''){
					this.$msg('请输入内容搜索')
				};
				uni.request({
					url: this.$url+'api/classes/index'+this.user_token,
					method: 'post',
					data: {},
					success: res => {
						console.log(res,'课程');
						if(res.data.code == 10000){
							this.subjectList = res.data.data.list;
							this.total = res.data.data.total_num;
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
		margin-right: 30rpx;
	}
	.select .i-img{
	  width: 32rpx;
	  height: 32rpx;
	  border-radius: 50%;
	  position: absolute;
	  top: 50%;
	  transform: translate(0, -50%);
	  left: 190rpx;
	}
	.select input{
	  // position: absolute;
	  // right: 0;
	  // left: 0;
	  // top: 50%;
	  // transform: translate(50%, -50%);
		flex:1;
	  text-align: center;
	  height: 60rpx;
	  width: 60%;
	  font-size: 26rpx;
	  border-radius: 30rpx;
	  background: #EFEFEF;
	}
	.button{
		width: 100rpx;
		height: 60rpx;
		border-radius: 30rpx;
		margin-left: 20rpx;
		font-size:26rpx;
		line-height:60rpx;
		padding:0;
	}
	.info{
	  padding: 0 20rpx;
		background:#ffffff;
	}
	.subject{
	  padding-top: 30rpx;
	}
	.subject .s-image{
	  width: 100%;
	  height: 230rpx;
	  border-radius: 20rpx;
	}
	.subject .title{
	  margin: 30rpx 0;
	  position: relative;
	}
	.title .t-name{
	  font-size:35rpx;
	  font-weight:400;
	  color:rgba(29,29,29,1);
	  line-height:55rpx;
	}
	.title .t-text{
	  width: 500rpx;
	  height: 80rpx;
	  font-size: 25rpx;
	  font-weight: 400;
	  color: rgba(132,132,132,1);
	  line-height: 40rpx;
	  display: -webkit-box;
	  -webkit-box-orient: vertical;
	  -webkit-line-clamp: 2;
	  overflow: hidden;
	  margin: 10rpx 0;
	}
	.title .t-num{
	  position: absolute;
	  right: 0;
	  top: 0;
	  font-size: 30rpx;
	  line-height: 34rpx;
	  color:rgba(179,179,179,1);
		display: flex;
	}
	.title .t-num text{
	  font-size: 30rpx;
	  line-height: 34rpx;
	  color:rgba(179,179,179,1);
	} 
	.t-num image{
	  width: 34rpx;
	  height: 34rpx;
	  margin-right: 10rpx;
	}
	.title .look{
	  position: absolute;
	  right: 0;
	  bottom: 0;
	  font-size: 30rpx;
	  color:rgba(255,255,255,1);
	  line-height: 65rpx;
	  height: 65rpx;
	  text-align: center;
	  background:rgba(16,110,250,1);
	  border-radius: 33rpx;
	  width: 130rpx;
	}
	.subject+.subject{
	  border-top: 1rpx #CFCFCF solid;
	}
</style>