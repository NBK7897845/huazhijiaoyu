<template>
	<view class="page">
		<view class="container">
		  <video id="myVideo" :src="classInfo.video_url" @timeupdate='getVideoupdate' @ended="videoEnd" @play="vidoePlay" initial-time="0"></video>
		</view>
		<view class="present">
		  <!-- <image class="fenxiang" src='http://39.98.47.251:91/upload/xcximg/fenxiang.png' @click="fenxiang"></image> -->
		  <view class="p-name">
		    {{classInfo.class_name}}
		    <view>{{classInfo.describe==1?'会员':'免费'}}</view>
		  </view>
		  <view class="p-title">
		    <view class="pingfen">
		      <view style="font-size:35rpx;color:#106EFA;text-align:center;">{{classInfo.video_scores}}</view>
		      <view style="font-size:25rpx;color:#5E5E5E">学分</view>
		    </view>
		    <view class="qiexian"></view>
		    <view class="p-text">{{classInfo.describe}}</view>
		  </view>
		  <view class="p-info">
		    <view class="qiexian" style="height:22rpx;left:170rpx;top:5rpx;"></view>
		    <view>时长{{classInfo.video_length}}<text style="margin-left:100rpx;">已有{{classInfo.watchnums||0}}人观看过</text></view>
		  </view>
		</view>
		<view class="tab">
		  <view class="t-name" :class="{'click':tabClick==index}" v-for="(item,index) in tabList" @click="tabChange(index)" :key="index">
		    {{item.text}}
		    <view :class="{'down':tabClick!=index}"></view>
		  </view>
		</view>
		<view class="footer">
		  <view class="jianjie" :class="{'down':tabClick!=0}">
		    <rich-text :nodes="classInfo.details"></rich-text>
		  </view>
		  <view class="pinglun" :class="{'down':tabClick!=1}">
		    <view class="title" v-for="(item,index) in pinlunList" :key="index">
		      <view class="p-top">
		        <image :src="item.headerimg" mode="aspectFill"></image>
		        <view class="pl-info">
		          <view class="pl-name">{{item.nickname}}</view>
		          <view class="pl-day">{{item.show_time}}</view>
		        </view>
		      </view>
		      <view class="p-punlun">
		        {{item.comment}}
		      </view>
		    </view>
				<view class=""  style="text-align: center;font-size: 30rpx;color: #C8C7CC;" v-if="pinlunList.length<1">
					还没有评论
				</view>
		    <view style="height:150rpx;"></view>
		    <view class="towhite" @click="infohide">我要评论</view>
		  </view>
		  <view class="xuanze" :class="{'down':tabClick!=2}">
				<view class="" v-if="questionList.length>0">
					<view v-if="!questionWhite">
					  <view class="query" v-for="(itemName,itemIndex)  in questionList" :key="itemIndex">
					    <text class="query-name">{{itemIndex*1+1}}. {{itemName.title}}({{itemName.set_score}}分)</text>
					    <view v-for="(item,index) in itemName.options" :key="index" @click="answerSelected(itemIndex,index)"  class='query-item' :class="{'success':item.selected}">
					      {{index==0?'A':index==1?"B":index==2?'C':'D'}}、{{item.quest}}
					    </view>
					  </view>
					  <view style="height:150rpx;"></view>
					  <view class="towhite" @click="querySubmit">提交答案</view>
					</view>
					<view v-else>
					  <view class="query" v-for="(itemName,itemIndex) in questionList" :key="itemIndex">
					    <text class="query-name">{{itemIndex*1+1}}. {{itemName.title}}({{itemName.set_score}}分)</text>
					    <view v-for="(item,index) in itemName.options" :key="index" class="query-item" :class="{'error':itemName.select==item.power,'success':itemName.answer==item.power}">
					      <text>{{index==0?'A':index==1?"B":index==2?'C':'D'}}、{{item.quest}}</text>
					    </view>
					  </view>
					</view>
				</view>
		    <view class="" style="text-align: center;font-size: 30rpx;color: #C8C7CC;" v-else>
		    	该课程没有试题
		    </view>
		  </view>
		</view>
		<view class="info" v-if="writePinlun">
		  <view class="Shading" @click="infohide">
		  </view>
		  <view class="infotxt">
		    <textarea @input="textareaChange" placeholder="请输入"></textarea>
		    <view class="infobutton" @click="writeSubmit">
		      发布
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				class_id:'',
				user_token:'',
				classInfo:{},
				watchrecord:'',// 观看记录
				motto: 'Hello World',
				page:1,
				pagesize:20,
				total:0,
				Videoupdat: 0,//video播放进度
				videoTime: 0,//视频总长度
				thatTime: 0,
				videoContext: '',//video实例
				proportion: 0,//播放百分比
				userInfo: {},
				hasUserInfo: false,
				canIUse: wx.canIUse('button.open-type.getUserInfo'),
				tabList:[
					{ id: 1,text:'课程简介',to:''},
					{ id: 2,text:'课程评论',to:''},
					{ id: 3,text:'课程试卷',to:''},
				],
				tabClick:0,
				answer:[],//选择答案
				questionWhite:false,// 是否完成测试
				writePinlun:false,// 是否评论
				getpinLunbol:false,// 是否请求了评论
				getshitibol: false, // 是否请求了试题
				pinlunList:[],// 评论列表
				textareaValue:'',
				questionList:[
					// {
					// 	id:1,
					// 	name:'在有障碍的路段会车时，一般情况下()。',
					// 	daan:'2',
					// 	select:0,
					// 	type:1,
					// 	option:[
					// 		{ id: 1, quest:'有障碍的一方先行',power:1,},
					// 		{ id: 1, quest:'无障碍的一方先行',power:2},
					// 		{ id: 1, quest:'大车让小车先行',power:4},
					// 		{ id: 1, quest:'小车让大车先行',power:8},
					// 	]
					// }
				]
			}
		},
		created(){
			
		},
		onReachBottom(){
			console.log('上拉');
			if(this.total&&this.tabClick==1){
				if(this.page*this.pagesize>this.total){
					this.$msg('没有更多数据了')
					return false;
				}else{
					this.page++;
					this.getPinlun()
				}
			}
			// this.getClass()
		},
		onLoad(e) {
			var that = this;
			uni.getStorage({
			    key: 'user_token',
			    success: (res)=> {
						console.log(res)
			      that.user_token = res.data;
			    }
			});
			this.class_id = e.class_id;
			this.videoContext = uni.createVideoContext('myVideo')
			this.getClassInfo()
			// this.getClassInfo();
			// this.getClass();
		},
		onShow(){
			console.log('onShow')
		},
		onUnload(){
			if(this.watchrecord){
				if(this.watchrecord.is_finish==0){
					this.changeLength(0)
				}
			}else{
				this.changeLength(0)
			}
		},
		methods:{
			vidoePlay(){
				
			},
			videoEnd(e) {// 视频播放完成
				if(this.watchrecord&&this.watchrecord.is_finish==1){ // 如果已经看完,不做限制
					return false;
				}
				var gap = this.videoTime - this.Videoupdat
				console.log(gap)
				if (gap > 3) {
					this.videoContext.play()
					this.videoContext.seek(this.Videoupdat)
					this.$msg('请认真看完视频')
				}else{
					this.changeLength(1);
				}
			},
			textareaChange(e){// textarea
				this.textareaValue = e.detail.value
			},
			tabChange (e) {// 切换tab
				var that = this;
				if (e == 1 && that.getpinLunbol == false){
				  that.getPinlun()
				}
				if (e == 2 && that.getshitibol == false){
					that.getshiti()
				}
				this.tabClick = e;
			},
			answerSelected(outidx,idx) {// 选择答案
				// let outidx = e.currentTarget.dataset.outidx;
				// let idx = e.currentTarget.dataset.idx;
				let questionList = this.questionList;
				let question = questionList[outidx];
				let answer = this.answer;
				console.log(outidx, idx,question)
				//if (question.type == 1) {
					//单选
					for (let a = 0; a < questionList.length;a++){
						answer[a] > 0 ? '' : answer[a] = 0
					}
					for (let item of question.options) {
						item.selected = false;
					}
					question.options[idx].selected = true;
					answer[outidx] = question.options[idx].power
					console.log(answer);
					questionList[outidx] = question;
					
					this.questionList = questionList.splice(0);
					this.answer = answer;
					console.log(this.questionList)
			  //} 
				//else if (question.type == 2) {
				//   //多选
				//   question.option[idx].selected = !question.option[idx].selected;
				//   
				//     this.questionList: questionList
				//   
				// }
			},
			querySubmit(){ // 提交课程试题
				if(!this.watchrecord||this.watchrecord.is_finish == 0){
					this.$msg("视频看完后才能提交答案")
				} 
				let bool = this.answer.every((x)=>{
					console.log(x)
					return x>0
				});
				let answer = this.answer;
				if (bool){
					let questionList = this.questionList;
					console.log(questionList)
					questionList.forEach((item,index)=>{
						item.select = answer[index]
					})
					this.questionList= questionList,
					this.questionWhite= true;
					console.log(questionList)
					console.log(JSON.stringify(questionList))
					uni.request({
						url: this.$url+'api/doexam/addcredit'+this.user_token+'&strings=' + JSON.stringify(questionList),
						method: 'post',
						data: {},
						success: res => {
							console.log(res);
							if(res.data.code == 10000){
								this.questionList = JSON.parse(res.data.data);
								this.questionWhite = true;
							}else{
							  this.$msg(res.data.msg)	
							}
						},
					})
				}else{
					this.$msg('请答完所有试题')
				}
			},
			infohide(){
				this.writePinlun = !this.writePinlun
			},
			getVideoupdate(e) {//播放;
				if(this.watchrecord&&this.watchrecord.is_finish==1){ // 如果已经看完,不做限制
					return false;
				}
				var that = this;
				//console.log(e.detail.currentTime, this.Videoupdat)//播放进度
				//console.log(e)//播放进度
				var gap = e.detail.currentTime - this.Videoupdat
				if (gap > 3) {
					this.videoContext.seek(this.Videoupdat);
					this.$msg('请认真观看视频');
				} else {
						this.Videoupdat= e.detail.currentTime,
						this.videoTime= e.detail.duration,
						this.thatTime=parseInt(e.detail.currentTime),
						this.proportion= (e.detail.currentTime / e.detail.duration * 100).toFixed(2)
				}
			},
			getClassInfo(){// 获取视频信息
				uni.request({
					url: this.$url+'api/classes/info'+this.user_token+'&class_id=' + this.class_id,
					method: 'post',
					data: {},
					success: res => {
						console.log(res,'视频信息');
						if(res.data.code == 10000){
							this.classInfo = res.data.data;
							console.log('classInfo',this.classInfo)
							this.watchrecord = res.data.watchrecord;
							var watchrecord = this.watchrecord;
							if(watchrecord){
								if(watchrecord.is_finish == 0){
									this.Videoupdat = watchrecord.video_length
									this.videoContext.seek(watchrecord.video_length);
									setTimeout(() => {
										this.videoContext.play()
									}, 500);
								}
							}
						}else{
							this.$msg(res.data.msg)
						}
					},
				})
			},
			changeLength(a){// 更新数据库视频进度 a=完成1,暂停0
			if(a==1){
			uni.request({
					url: this.$url+'api/classes/watchnums'+this.user_token+'&class_id=' + this.class_id,
					method: 'post',
					data: {},
					success: res => {
						if(res.data.code == 10000){
							console.log('视频观看人数+1')
							}
						}
					})
			}
			
				uni.request({
					url: this.$url+'api/classesin/save'+this.user_token+'&class_id=' + this.class_id+'&video_length='+this.Videoupdat+'&is_finish='+a,
					method: 'post',
					data: {},
					success: res => {
						console.log(res);
						if(res.data.code == 10000){
							this.watchrecord = {
								is_finish: a,
							}
						}else{
							// this.$msg(res.data.msg)
						}
					},
				})
			},
			getPinlun(){// 获取评论信息
				uni.request({
					url: this.$url+'api/comment/info'+this.user_token+'&class_id=' + this.class_id+'&page='+this.page+'&num='+this.pagesize,
					method: 'post',
					data: {},
					success: res => {
						console.log(res);
						if(res.data.code == 10000){
							this.pinlunList = res.data.data.list;
							this.getpinLunbol = true
						}else{
							this.$msg(res.data.msg)
						}
					},
				})
			},
			writeSubmit(){// 提交评论
				uni.request({
					url: this.$url+'api/comment/add'+this.user_token+'&class_id=' + this.class_id+'&comment=' + this.textareaValue,
					method: 'post',
					data: {},
					success: res => {
						console.log(res);
						if(res.data.code == 10000){
							this.infohide();
							this.getPinlun();
						}
						this.$msg(res.data.msg)
					},
				})
			},
			getshiti(){// 查找试题
				uni.request({
					url: this.$url+'api/exam/getexaminfo'+this.user_token+'&class_id=' + this.class_id,
					method: 'post',
					data: {},
					success: res => {
						console.log(res);
						if(res.data.code == 10000){
							if(!this.watchrecord||this.watchrecord.is_finish == 0){
								this.$msg("视频看完后才能提交答案")
							} 
							if(res.data.status == "unanswered"){
								let arr = res.data.data;
								console.log(arr)
								arr.forEach((el)=>{
									el.options = JSON.parse(el.options);
									el.select = 0;
									el.type = 1;
									this.answer.push(0)
								})
								this.questionList = arr;
							}else{
								let arr = res.data.data.options;
								this.questionList = JSON.parse(arr);
								this.questionWhite = true;
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
	uni-rich-text img{
		max-width: 100% !important;
	}
	
	.page{
		overflow: hidden;
	}
	.container{
	  position: fixed;
	  top: 88rpx;
	  height: 400rpx;
	  width: 100%;
	  z-index: 9;
	}
	video{
	  width: 100%;
	  height: 400rpx;
	}
	.present{
	  padding: 30rpx;
	  background: #fff;
	  margin-top: 400rpx;
	  position: relative;
	}
	.present .fenxiang{
	  float: right;
	  width: 30rpx;
	  height: 30rpx;
	}
	.zhuanfa{
	  position: absolute;
	  right:-240rpx;
	  top: 0;
	  width: 30rpx;
	  height: 30rpx;
	  opacity: 0;
	}
	.p-name{
	  margin-bottom: 30rpx;
	  font-size:35rpx;
	  color:rgba(29,29,29,1);
	}
	.title{
	  margin-bottom: 30rpx;
	}
	.p-name view{
	  display: inline-block;
	  font-size:25rpx;
	  color:#fff;
	  line-height: 35rpx;
	  border-radius: 18rpx;
	  background: #106EFA;
	  height: 35rpx;
	  width: 90rpx;
	  text-align: center;
		margin-left: 20rpx;
	}
	.p-title{
	  position: relative;
	}
	.p-title .p-text{
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
	}
	.pingfen{
	  float: right;
	  text-align: right;
	}
	.qiexian{
	  position: absolute;
	  height: 50rpx;
	  width: 1px;
	  right: 120rpx;
	  top: 15rpx;
	  background: #E3E3E3;
	}
	.p-info{
	  position: relative;
	  color:rgba(184,184,184,1);
	  font-size: 23rpx;
	  margin-top: 30rpx;
	}
	.tab{
	  margin-top:20rpx;
	  background: #fff;
	  overflow: hidden;
	}
	.t-name{
	  float: left;
	  width: 33%;
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
	  width: 40rpx;
	  height: 3px;
	  background: #106EFA;
	  border-radius:1.5px;
	}
	.footer{
	  padding: 30rpx;
	  margin-top: 1px;
	  background: #fff;
	}
	.down{
	  display: none;
	}
	.click{
	  font-weight: bold;
	}
	.p-top image{
	  width: 70rpx;
	  height: 70rpx;
	  border-radius: 50%;
	  float: left; 
	}
	.pl-info{
	  margin-left: 90rpx;
	  font-size: 30rpx;
	}
	.pl-info .pl-name{
	  color: #181818;
	
	}
	.pl-info .pl-day{
	  color: #A2A2A2;
	  font-size: 25rpx;
	}
	.p-punlun{
	  font-size: 25rpx;
	  color:rgba(68,68,68,1);
	  line-height:36rpx;
	  margin:40rpx 0 10rpx; 
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
	.query{
	  margin-bottom: 20rpx;
	}
	.query-name{
	  font-size: 30rpx;
	}
	.query-item{
	  margin: 20rpx 0;
	  line-height: 50rpx;
	  padding-left: 40rpx;
	  background-image: url(http://39.98.47.251:91/upload/xcximg/bg4.png);
	  color: #666;
	  background-position: left center;
	  background-repeat: no-repeat;
	}
	.error{
	  background-image: url(http://39.98.47.251:91/upload/xcximg/bg3.png);
	  background-position: left center;
	  background-repeat: no-repeat;
	}
	.success{
	  background-image: url(http://39.98.47.251:91/upload/xcximg/bg2.png);
	  background-position: left center;
	  background-repeat: no-repeat;
	}
	.query-sel{
	  background: #ccc;
	  height: 30rpx;
	  width: 30rpx;
	  border-radius: 50%;
	  margin-right: 10rpx;
	  margin-left: 10rpx;
	}
	.query-click{
	  background: #106EFA;
	}
	.query + .query{
	  padding-top: 30rpx; 
	}
	.query-false{
	  background: red;
	}
	.query-true{
	  background: rgb(4, 245, 112);
	}
	
	.info {
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  z-index: 2000;
	}
	
	.Shading {
	  width: 100%;
	  height: 100%;
	  background: #000;
	  opacity: 0.4;
	  position: relative;
	}
	
	.infotxt {
	  position: absolute;
	  width: 500rpx;
	  height: 420rpx;
	  top: 10%;
	  right: 0;
	  left: 0;
	  bottom: 0;
	  margin: auto;
	  background: #fff;
	  z-index: 1002;
	  border-radius: 7rpx;
	  text-align: center;
	}
	.infotxt textarea{
	  text-align: left;
	  width: 460rpx;
	  background: #E3E3E3;
	  margin: 20rpx;
	}
	.infobutton{
	  width: 300rpx;
	  height: 70rpx;
	  background: #638ca1;
	  font-size:30rpx;
	  line-height: 70rpx;
	  color:#fff;
	  margin-left:100rpx;
	}
</style>
