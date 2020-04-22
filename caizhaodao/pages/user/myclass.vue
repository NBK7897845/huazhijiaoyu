<template>
	<view class="page">
		<view class="havetab">
		  <view  class="h-name" :class="{'click':tabClick==index}" v-for="(item,index) in tabList" @click="tabChange(index)" :key="index">
		    {{item.text}}
		    <view :class="{'down':tabClick!=index}"></view>
		  </view>
		</view>
		<swiper class="tab-box" style="height:calc(100vh - 180rpx);width:100%;" :current="tabClick" duration="300" @change="switchTab">
		  <swiper-item style="height:100%;overflow-y:scroll">
		    <block @click='myOrderDetails'>
		      <view class="info">
		        <view class="subject" v-for="(item,index) in subjectList" :key="index">
		          <image class="s-image" :src="item.class_cover"></image>
		          <view class="title">
		            <view class="t-name">{{item.class_name}}</view>
		            <view class="t-text">{{item.describe}}</view>
		            <view class="t-num">
		              <text>上次看到{{item.number|filterVtime}}</text>
		            </view>
		            <view class="look" @click="Todetail(item.class_id)">继续学习</view>
		          </view>
		        </view>
		      </view>
		    </block>
		  </swiper-item>
		  <swiper-item style="height:100%;overflow-y:scroll">
		    <block @click='myOrderDetails'>
		      <view class="info">
		        <view class="subject" v-for="(item,index) in successList" :key="index">
		          <image class="s-image" :src="item.class_cover"></image>
		          <view class="title">
		            <view class="t-name">{{item.class_name}}</view>
		            <view class="t-text">{{item.describe}}</view>
		            <view class="t-num">
		              <text>{{item.update_time}}</text>
		            </view>
		            <view class="look" @click="Todetail(item.class_id)">已完成</view>
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
				user_token:'',
				tabList: [
					{ id: 1, text: '未完成课程', to: '' },
					{ id: 2, text: '已完成课程', to: '' },
				],
				page:[1,1],
				pagesize:10,
				total:[0,0],
				tabClick: 0,
				subjectList: [],
				successList: [
					// { id: 1, src: '/static/kecheng/1.png', name: '职业技能修炼营', text: '企顾司“新晋经理成长营”系列课程，围绕首次晋升为管理角色的员工所需的各项技能展开，新晋经理新晋经理新晋经理新晋经理', number: '2019-11-19', to: '' },

				],
			}
		},
		created(){
	
		},
		onReachBottom(){
			console.log('上拉');
			if(this.total[this.tabClick]){
				if(this.page[this.tabClick]*this.pagesize>this.total[this.tabClick]){
					this.$msg('没有更多数据了')
					return false;
				}else{
					this.page[this.tabClick]++
				}
			}
			this.getClass()
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
			 this.getClass();
		},
		methods:{
			Todetail(e){
				uni.navigateTo({
				    url: '/pages/index/class?class_id='+e
				});
			},
			tabChange(e) {
				this.tabClick = e;
			},
			switchTab (e) {
				var that = this;
				this.tabClick = e.detail.current;
				this.Judge()
			},
			Judge(){
				console.log(this.tabClick,this.subjectList,this.successList)
				if(this.tabClick==0){
					if(this.subjectList.length==0){
						this.getClass();
						console.log(0)
					};
				}else if(this.tabClick==1){
					if(this.successList.length==0){
						this.getClass();
						console.log(1)
					};
				}
			},
			getClass(){// 获取视频记录
				uni.request({
					url: this.$url+'api/classesin/watchrecord'+this.user_token+'&is_finish='+this.tabClick+'&page='+this.page[this.tabClick]+'&num='+this.pagesize,
					method: 'post',
					data: {},
					success: res => {
						console.log(res,'推荐视频');
						if(res.data.code == 10000){
							if(this.tabClick==0){
								if(res.data.data.list.length>0){
									res.data.data.list.forEach((item)=>{
										let time = item.video_length;
										let miao = time%60;
										let fen = Math.floor(time/60)
										miao = miao<10?'0'+miao:miao;
										fen = fen<10?'0'+fen:fen;
										item.number = fen+':'+miao
									})
									this.subjectList = [...this.subjectList,...res.data.data.list];
								};
								this.total[this.tabClick] = res.data.data.total_num;
							}else if(this.tabClick==1){
								this.successList = [...this.successList,...res.data.data.list];
								this.total[this.tabClick] = res.data.data.total_num;
							}
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
		box-sizing: border-box;
	  border-bottom: 1px solid #D6D6D6;
		z-index: 9999;
	}
	.h-name{
	  float: left;
	  width: 49.5%;
	  height: 100rpx;
	  line-height: 100rpx;
	  font-size: 30rpx;
	  text-align: center;
		background: #ffffff;
	}
	.h-name view{
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
	  margin-top: 88rpx;
	}
	.info{
	  padding:0 30rpx 30rpx 30rpx;
	}
	.subject{
	  padding-top: 30rpx;
	}
	.subject .s-image{
	  width: 100%;
	  height: 340rpx;
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
		width: 70%; 
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
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
	  font-size: 25rpx;
	  line-height: 34rpx;
	  color:rgba(179,179,179,1);
	}
	.t-num image{
	  width: 34rpx;
	  height: 34rpx;
	  margin-right: 50rpx;
	}
	.title .look{
	  position: absolute;
	  right: 0;
	  bottom: 0;
	  font-size: 25rpx;
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