<template>
	<view class="page">
		<view class="havetab">
		  <view class="t-name" :class="{'click':tabClick==index}" v-for="(item,index) in tabList" @click="tabChange(index)"  :key="index">
		    {{item.text}}
		    <view :class="{'down':tabClick!=index}"></view>
		  </view>
		</view>
		<swiper class="tab-box" style="height:calc(100vh - 180rpx);width:100%;" :current="tabClick" duration="300" @change="switchTab">
		  <swiper-item style="height:100%;overflow-y:scroll">
		    <block bindtap='myOrderDetails'>
		      <view class="t-left">
		        <view class="header">
		          <view class="h-left"><image src="/static/use/dengji.png"></image></view>
		          <view class="h-right">
		            <view class="xuefen">当前学分: <text style="font-size:30rpx;font-weight:700;color:#1D1D1D;">{{wdxf||0}}</text></view>
		            <view class="xuefen">我的等级: <text style="#CCA127">中级能手</text></view>
		            <view style="height:20rpx;"></view>
		            <view class="jdt"><progress border-radius="50" color="#CCA127" duration="0.5" percent="80" active /></view>
		            <view class="cha">距离下一等级还差25学分</view>
		          </view>
		        </view>
		        <view style="height:20rpx;width:100%;background:#efefef;"></view>
		        <view style="padding:30rpx;">
		          <view class="guizhe">
		            <image src="/static/use/huangguan.png"></image>
		            <view>晋级规则</view>
		          </view>
		          <view v-for="(item,index) in option" :key="index" class="query-item">
		            <view class="query-sel"></view><text>{{item.quest}}</text>
		          </view>
		        </view>
		      </view>
		    </block>
		  </swiper-item>
		  <swiper-item style="height:100%;overflow-y:scroll">
		    <block bindtap='myOrderDetails'>
		      <view class="t-right">
						<view v-if="classList.length==0" style="text-align: center;margin-top:1.5rem;font-size:40rpx;color:#9f9f9f;">
							暂无记录
						</view>
		        <view class="r-item" v-for="(item,index) in classList" :key="index">
		          <view class="i-left">+{{item.get_score}}</view>
		          <view class="i-right">
		            <view class="classname">{{item.score_type==1?'观看':'回答'}}《{{item.class_name}}》{{item.score_type==1?'视频':'题目'}}</view>
		            <view class="classtime">{{item.create_time}}</view>
		          </view>
		        </view>
		      </view>
		    </block>
		  </swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [
					{ id: 1, text: '我的会员', to: '' },
					{ id: 2, text: '学分记录', to: '' },
				],
				tabClick:0,
				option: [
					{ id: 1, quest: '免费观看所有在线教育视频' },
					{ id: 1, quest: '免费观看所有在线教育视频' },
					{ id: 1, quest: '免费观看所有在线教育视频' },
					{ id: 1, quest: '免费观看所有在线教育视频' },
				],
				wdxf:0,
				classList: [
					{ id: 1, quest: '完整观看《职业素养的培训》课程', jingyan: '8' },
					{ id: 2, quest: '完整观看《职业素养的培训》课程', jingyan: '80' },
					{ id: 3, quest: '完整观看《职业素养的培训》课程', jingyan: '6.5' },
					{ id: 4, quest: '完整观看《职业素养的培训》课程', jingyan: '2' },
				],
				user_token:''
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
			// this.getBanner();
			 this.getsuccess();
			
		},
		methods:{
			tabChange (e) {
				this.tabClick = e
			},
			switchTab (e) {
				this.tabClick = e.detail.current
			},
			getsuccess(){
				uni.request({
					url: this.$url+'api/user/mycredits'+this.user_token,
					method: 'post',
					data: {},
					success: res => {
						console.log(res);
						if(res.data.code == 10000){
							this.classList = res.data.data.list;
							this.wdxf = res.data.data.wdxf;
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
	.page{
		overflow: hidden;
	}
	.havetab{
	  position: fixed;
	  width: 100%;
	  top: 88rpx;
	  background: #fff;
	  overflow: hidden;
	  border-bottom: 1px solid #D6D6D6;
		z-index:999;
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
	.tab-box{
	  margin-top:88rpx;
	}
	.header{
	  padding: 50rpx 30rpx;
	  display: flex;
	}
	.header>.h-left{
	  height: 200rpx;
	  width: 30%;
	}
	.header>.h-left>image{
	  height: 200rpx;
	  width: 180rpx;
	}
	.header>.h-right{
	  height: 200rpx;
	  width: 70%;
	  display: flex;
	  flex-direction: column;
	  justify-content: flex-end;
	  font-size: 30rpx;
	}
	.h-right>.xuefen{
	  color: #9F9F9F;
	  line-height: 50rpx;
	}
	.h-right>.cha{
	  color: #9F9F9F;
	  font-size: 25rpx;
	  text-align: center;
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
	  margin-right: 24rpx;
	  margin-left: 8rpx;
	}
	.guizhe{
	  display: flex;
	  align-items: center;
	  justify-content: flex-start;
	}
	
	.guizhe>image{
	  width: 36rpx;
	  height: 36rpx;
	}
	.guizhe>view{
	  margin-left: 20rpx;
	  line-height: 30rpx;
	  font-weight: bold;
	}
	.t-right{
	
	}
	.r-item{
	  padding: 30rpx 0;
	  display: flex;
	  border-bottom: 1px solid #C2C2C2;
	  font-size: 30rpx;
	}
	.i-left{
	  width: 135rpx;
	  text-align: center;
	  line-height: 100rpx;
	  color: #106EFA;
	
	}
	.i-right{
	  flex: 1;
	  display: flex;
	  flex-direction: column;
	  justify-content: space-around;
	
	
	}
	.classtime{
	  font-size: 25rpx;
	  color: #adadad;
	}
</style>