<template>
	<view class="">
		<view class="">
			<view class="none" v-if="!userpay">
			  <image src="/static/use/none.png"></image>
			  <view class="text">您还不是会员哦~</view>
			  <view v-if="false" class="towhite" @click="paychange">立即购买</view>
			</view>
			<view class="toast" v-if="pay">
			  <view class="mask"></view>
			  <view class="toast-info">
			    <view class="t-header">
			      <image src="/static/use/close.png"></image>
			      <view>购买会员</view>
			    </view>
			    <view class="t-list">
			      <view class="tab">
			        <view class="right" style="color:rgba(16,110,250,1);">288元/年</view>
			        <view class="left">会员价格</view>
			      </view>
			      <view class="tab">
			        <view class="right" style="color:rgba(166,166,166,1);">2020.1.5 - 2021.1.4</view>
			        <view class="left">有效时间</view>
			      </view>
			      <view class="tab">
			        <view class="right">查看权益</view>
			        <view class="left">会员权益</view>
			      </view>
			      <view class="tab">
			        <view  class="right">
			          <image class="right-image" src="/static/use/weixin.png"></image>
			        </view>
			        <view class="left">付款方式</view>
			      </view>
			    </view>
			    <view class="towhite" @click="topay">立即购买</view>
			  </view>
			</view>
			<view class="have" v-if="userpay">
			  <view class="havetab">
			    <view class="t-name" :class="{'click':tabClick==index}" v-for="(item,index) in tabList" @click="tabChange(index)" :key="index">
			      {{item.text}}
			      <view :class="{'down':tabClick!=index}"></view>
			    </view>
			  </view>
			  <view class="have-left" v-if="tabClick==0">
			    <image src="/static/use/buytime.png"></image>
			    <view class="paytime">会员时间:2020.1.5 - 2021.1.4</view>
			    <view style="height:80rpx;"></view>
			    <view class="left-name">
			      <image src="/static/use/huiyuan.png"></image>
			      <view>会员权益</view>
			    </view>
			    <view style="height:40rpx;"></view>
			    <view v-for="(item,index) in option" :key="index" class="query-item">
			      <view class="query-sel"></view><text>{{item.quest}}</text>
			    </view>
			  </view>
			  <view class="have-right" v-else>
			    <view class="right-item" v-for="(item,index) in payList" :key="index">
			      <view class="note">
			        <image src="/static/use/duihao.png"></image>
			        <view style="font-size: 30rpx;color:#B8B8B7;">{{item.time}}</view>
			      </view>
			      <view class="right-text">{{item.quest}}</view>
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
				pay:false,
				userpay:false,
				tabList: [
					{ id: 1, text: '我的会员', to: '' },
					{ id: 2, text: '购买记录', to: '' },
				],
				tabClick:0,
				option: [
					{ id: 1, quest: '免费观看所有在线教育视频'},
					{ id: 1, quest: '免费观看所有在线教育视频'},
					{ id: 1, quest: '免费观看所有在线教育视频'},
					{ id: 1, quest: '免费观看所有在线教育视频'},
				],
				payList: [
					{ id: 1, quest: '微信支付288购买会员', time:'2019-09-02 15:23:36'},
					{ id: 2, quest: '微信支付288购买会员' , time: '2019-09-02 15:23:36'},
					{ id: 3, quest: '微信支付288购买会员'  ,time: '2019-09-02 15:23:36'},
				]
			}
		},
		created(){
	
		},
		onLoad() {
			// this.getBanner();
			// this.getClass();
		},
		methods:{
			topay(){
				let that = this;
				this.$msg('付款成功')
				that.setData({
					userpay: !that.data.userpay
				});
				that.paychange();
				//console.log(that.data.pay)
			},
			tabChange (e) {
				this.tabClick= e;
			},
			paychange(){
				var that = this;
				this.pay = !this.pay
			},
		},
	}
</script>
<style lang="scss">
	/* pages/user/member/member.wxss */
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
	.none{
	  text-align: center;
	}
	.none>image{
	  margin-top: 100rpx; 
	  width: 500rpx;
	  height: 400rpx;
	}
	.none>.text{
	  margin-top: 30rpx;
	  font-size: 30rpx;
	  color: #bcbcbc;
	}
	.toast{
	  top:0;
	  position: absolute;
	  width: 100%;
	  height: 100vh;
	  z-index: 2000;
	}
	.mask{
	  width: 100%;
	  height: 100vh;
	  background: #000;
	  opacity: 0.4;
	}
	.toast-info {
	  position: absolute;
	  width: 100%;
	  height: 700rpx;
	  bottom: -10rpx;
	  background: #fff;
	  z-index: 1002;
	  border-radius: 16rpx;
	}
	.t-header{
	  position: relative;
	  height: 100rpx;
	  text-align: center;
	  border-bottom: 1px solid #DBDBDB; 
	  font-size: 35rpx;
	}
	.t-header>view{
	  line-height: 100rpx;
	}
	.t-header>image{
	  position: absolute;
	  width: 30rpx;
	  height: 30rpx;
	  top: 36rpx;
	  left: 30rpx;
	}
	.t-list{
	  padding: 0 30rpx;
	}
	.tab{
	  width: 100%;
	  height: 100rpx;
	  font-size: 30rpx;
	  margin-bottom: 5rpx ;
	  background: #fff;  
	  position: relative;
	  overflow: hidden;
	  border-bottom: 1px solid #eeeeee;
	}
	.left{
	  line-height: 100rpx;
	  color: #1B1B1B;
	}
	.right{
	  height: 100rpx;
	  position: absolute;
	  line-height: 100rpx;
	  right: 0;
	  top: 0;            
	}
	.right-image{
	  vertical-align:middle;
	  height: 40rpx;
	  width: 50rpx;
	}
	.havetab{
	  margin-top:20rpx;
	  background: #fff;
	  overflow: hidden;
	  border-bottom: 1px solid #D6D6D6;
	}
	.t-name{
	  float: left;
	  width: 49.5%;
	  height: 100rpx;
	  line-height: 100rpx;
	  font-size: 30rpx;
	  text-align: center;
	}
	.t-name view{
	  position: relative;
	  top: -3px;
	  left: 50%;
	  transform: translate(-50%,0) ;
	  width: 80rpx;
	  height: 3px;
	  background: #106EFA;
	  border-radius:1.5px;
	}
	.down{
	  display: none;
	}
	.click{
	  font-weight: bold;
	}
	
	
	.have-left{
	  padding: 30rpx;
	  position: relative;
	}
	.paytime{
	  position: absolute;
	  color: #ffffff;
	  font-size: 30rpx;
	  text-align: center;
	  top: 75rpx;
	  left: 190rpx;
	}
	.have-left>image{
	  width: 100%;
	  height: 130rpx
	}
	.left-name{
	  display: flex;
	  align-items: center;
	  justify-content: flex-start;
	}
	.left-name>image{
	  width: 40rpx;
	  height: 35rpx;
	}
	.left-name>view{
	  font-size: 32rpx;
	  color: #282828;
	  margin-left: 10rpx;
	}
	.query-item{
	  color:rgba(124,124,124,1);
	  font-size:27rpx;
	  height: 80rpx;
	  display: flex;
	  align-items: center;
	  justify-content: flex-start;
	}
	.query-sel{
	  background: #ccc;
	  height: 20rpx;
	  width: 20rpx;
	  border-radius: 50%;
	  margin-right: 20rpx;
	  margin-left: 10rpx;
	}
	.have-right{
	
	}
	.right-item{
	  padding: 30rpx;
	  position: relative;
	  border-bottom: 1px solid #CFCFCF;
	}
	.right-item image{
	  width: 30rpx;
	  height: 30rpx;
	  margin-right: 20rpx;
	}
	.note{
	  height: 100rpx;
	  font-size: 35rpx;
	  color: #3C3C3C;
	  display: flex;
	  align-items: center;
	  justify-content: flex-start;
	  
	}
	.right-text{
	  margin-left: 50rpx;
	}
</style>