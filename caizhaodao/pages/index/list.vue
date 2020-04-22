<template>
	<view class="box">
		<view class="header">
		  <view class="select">
		    <image class="h-img" :src="userInfo.headerimg||'http://39.98.47.251:91/upload/xcximg/touxiang.png'" @click="Touser"></image>
		    <input @focus="Toselect" placeholder="请输入关键字搜索"></input>
		    <image class="i-img" src="/static/shouye/6.png"></image>
		  </view>
		  <view class="tab">
		    <view class="t-selects" :class="{'click':tabClick==index}" v-for="(item,index) in tabList" @click="tabChange(index)" :key="index">
		      {{item.text}}
		      <view :class="{'down':tabClick!=index}"></view>
		    </view>
		  </view>
		</view>
		<view class="footer">
		  <swiper class="tab-box" style="height:calc(100vh - 260rpx);width:100%;" :current="tabClick" duration="300" @change="switchTab">
		    <swiper-item style="height:100%;overflow-y:scroll">
		      <block @click='myOrderDetails'>
		        <view class="info">
		          <view class="subject" v-for="(item,index) in subjectList1" @click="tabChange(index)" :key="index">
		            <image class="s-image" :src="item.class_cover"  @click="Todetail(item.class_id)"></image>
		            <view class="title" @click="Todetail(item.class_id)">
		              <view class="t-name">{{item.class_name}}</view>
		              <view class="t-text">{{item.describe}}</view>
		              <view class="t-num">
		                <image src="/static/shouye/look.png"></image>
		                <text>{{item.watchnums}}</text>
		              </view>
		              <view class="look" >去学习</view>
		            </view>
		          </view>
		        </view>
		      </block>
		    </swiper-item>
				<swiper-item style="height:100%;overflow-y:scroll">
		      <block @click='myOrderDetails'>
		        <view class="info">
		          <view class="subject" v-for="(item,index) in subjectList2" @click="tabChange(index)" :key="index">
		            <image class="s-image" :src="item.class_cover" @click="Todetail(item.class_id)"></image>
		            <view class="title" @click="Todetail(item.class_id)">
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
		      </block>
		    </swiper-item>
				<swiper-item style="height:100%;overflow-y:scroll">
		      <block @click='myOrderDetails'>
		        <view class="info">
		          <view class="subject" v-for="(item,index) in subjectList3" @click="tabChange(index)" :key="index">
		            <image class="s-image" :src="item.class_cover" @click="Todetail(item.class_id)"></image>
		            <view class="title" @click="Todetail(item.class_id)">
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
		      </block>
		    </swiper-item>
				<swiper-item style="height:100%;overflow-y:scroll">
		      <block @click='myOrderDetails'>
		        <view class="info">
		          <view class="subject" v-for="(item,index) in subjectList4" @click="tabChange(index)" :key="index">
		            <image class="s-image" :src="item.class_cover" @click="Todetail(item.class_id)"></image>
		            <view class="title" @click="Todetail(item.class_id)">
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
		      </block>
		    </swiper-item>
		  </swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList:[
					{ id: 1, src: '../../../img/shouye/13.png', text: 'AI开发', to: '' },
					{ id: 2, src: '../../../img/shouye/10.png', text: 'AI营销', to: '' },
					{ id: 3, src: '../../../img/shouye/11.png', text: 'AI艺术', to: '' },
					{ id: 4, src: '../../../img/shouye/12.png', text: 'AI养老', to: '' },
				],
				mode:'aspectFill',
				user_token:'',
				userInfo:'',
				subjectList1: [],// 视频列表
				subjectList2: [],// 视频列表
				subjectList3: [],// 视频列表
				subjectList4: [],// 视频列表
				category_id:[2,3,4,5],// 
				page:[1,1,1,1],
				pagesize:10,
				total:[0,0,0,0],
				tabClick:0,// 页面
				slideLeft:20,
				winWidth:0,
				winHeight:0,
			}
		},
		created(){
			// uni.getSystemInfo({
			// 	success:  (res)=> {
			// 		console.log(res)
			// 			this.winWidth = res.windowWidth;
			// 			this.winHeight = res.windowHeight;
			// 			this.swiperstyle.height = this.winHeight-100+'px'
			// 	}
			// });
			
		},
		onLoad(e) {
			var that = this;
			console.log(e)
			this.tabClick = e.id
			// this.getBanner();
			uni.getStorage({
			    key: 'user_token',
			    success: (res)=> {
						console.log(res)
			      that.user_token = res.data;
			    }
			});
			this.getClass();
			uni.getStorage({
			    key: 'userInfo',
			    success: (res)=> {
						console.log(res)
			      that.userInfo = res.data;
			    }
			});
			console.log(this.user_token)
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
		methods:{
			Toselect(){
				uni.navigateTo({
				    url: 'select'
				});
			},
			Todetail(e){// 跳转到详细视频
				uni.navigateTo({
				    url: 'class?class_id='+e
				});
			},
			Touser(e){// 跳转到详细视频
				uni.navigateTo({
				    url: '/pages/user/user'
				});
			},
			tabChange(e){// 切换显示页面
				this.tabClick = e;
			},
			Judge(){
				if(this.tabClick==0){
					if(this.subjectList1.length==0){
						this.getClass();
					};
				}else if(this.tabClick==1){
					if(this.subjectList2.length==0){
						this.getClass();
					};
				}else if(this.tabClick==2){
					if(this.subjectList3.length==0){
						this.getClass();
					};
				}else{
					if(this.subjectList4.length==0){
						this.getClass();
					};
				}
			},
			switchTab(e) {// 轮播图变化
			  this.tabClick = e.detail.current;
				this.Judge();
			},
			getClass(){// 获取视频
			  console.log(this.tabClick)
				uni.request({
					url: this.$url+'api/classes/index'+this.user_token+'&category_id='+this.category_id[this.tabClick]+'&page='+this.page[this.tabClick]+'&num='+this.pagesize,
					method: 'post',
					data: {},
					success: res => {
						console.log(res,'课程');
						if(res.data.code == 10000){
							if(this.tabClick==0){
								this.subjectList1 = [...this.subjectList1,...res.data.data.list];
								this.total[this.tabClick] = res.data.data.total_num;
							}else if(this.tabClick==1){
								this.subjectList2 = [...this.subjectList2,...res.data.data.list];
								this.total[this.tabClick] = res.data.data.total_num;
							}else if(this.tabClick==2){
								this.subjectList3 = [...this.subjectList3,...res.data.data.list];
								this.total[this.tabClick] = res.data.data.total_num;
							}else{
								this.subjectList4 = [...this.subjectList4,...res.data.data.list];
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

<style  lang="scss">
	.box{
		overflow: hidden;
	}
	.header{
	  padding: 0 30rpx 10rpx 30rpx;
	  background: #fff;
	  position: fixed;
	  width: 100%;
	  box-sizing: border-box;
	  // top: 0;
	}
	.select{
	  padding: 18rpx 0;
	  position: relative;
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
	  top: 32rpx;
	  right: 400rpx;
	}
	.select input{
	  position: absolute;
	  right: 0;
	  top: 18rpx;
	  text-align: center;
	  height: 60rpx;
	  width: 87%;
	  font-size: 26rpx;
	  border-radius: 30rpx;
	  background: #EFEFEF;
	}
	.tab{
	  display: flex;
	  justify-content: space-between;
	}
	.t-selects{
	  float: left;
	  width: 24%;
	  height: 60rpx;
	  line-height: 60rpx;
	  font-size: 30rpx;
	  text-align: center;
	}
	.t-selects view{
	  position: relative;
	  top: -3px;
	  left: 50%;
	  transform: translate(-50%,0) ;
	  width: 80rpx;
	  height: 3px;
	  background: #106EFA;
	  border-radius:1.5px;
	}
	.slide{
	  width:80rpx;
	  height: 8rpx;
	  background: #106EFA;
	  border-radius: 4rpx;
	  margin-left: 22rpx;
	  margin-top: 10rpx;
	}
	.tab-click{
	  color: #121212;
	  font-size: 30rpx;
	  font-weight: bold;
	}
	.down{
	  display: none;
	}
	.footer{
		position: fixed;
	  top: 260rpx;
		height: calc(100vh - 260rpx);
		width: 100%;
	}
	.info{
	  padding: 0 20rpx;
	}
	.subject{
	  padding-top: 56rpx;
	}
	.subject .s-image{
	  width: 100%;
	  // height: 230rpx;
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
		width: 80%;
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
	  margin: 22rpx 0;
	}
	.title .t-num{
	  position: absolute;
	  right: 10rpx;
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
	  font-size: 28rpx;
	  color:rgba(255,255,255,1);
	  line-height: 60rpx;
	  height: 60rpx;
	  text-align: center;
	  background:rgba(16,110,250,1);
	  border-radius: 33rpx;
	  width: 130rpx;
	}
	.subject+.subject{
	  border-top: 1rpx #CFCFCF solid;
	}
</style>
