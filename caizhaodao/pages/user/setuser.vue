<template>
	<view class="">
		<view class="header">
		  <image :src="form.headerimg||'http://39.98.47.251:91/upload/xcximg/touxiang.png'" mode="aspectFill"></image>
		  <view @click="upimg">编辑头像</view> 
		</view>
		<view style="padding:30rpx;margin-bottom: 150rpx;">
		  <view class="tab">
		    <view class="left">昵称</view>
		    <view class="right">
		      <input  @input="inputchange" placeholder="请输入" :value="form.nickname||''" data-name="nickname"></input>
		    </view>
		  </view>
		  <view class="tab">
		    <view class="left">性别</view>
		    <view class="right">
		      <radio-group class="radio-group" @change="inputchange" data-name="sex">
		        <radio class="radio" v-for="(item,index) in items" :key="index" :value="item.name" :checked="item.checked">
		          <text>{{item.value}}</text>
		        </radio>
		    </radio-group>
		    </view>
		  </view>
		  <view class="tab">
		    <view class="left">出生年月</view>
		    <view class="right">
		      <picker mode="date" :value="form.birthdate" start="1900-01-01" end="2020-01-01" @change="inputchange" data-name="birthdate">
		        <view class="picker">
		          {{form.birthdate}}
		        </view>
		      </picker>
		    </view>
		  </view>
		  <view class="tab">
		    <view class="left">真实姓名</view>
		    <view class="right">
		      <input @input="inputchange" data-name="realname" placeholder="请输入" :value="form.realname||''"></input>
		    </view>
		  </view>
		  <view class="tab">
		    <view class="left">手机号</view>
		    <view class="right">
		      <input @input="inputchange" data-name="mobile" placeholder="请输入" :value="form.mobile||''"></input>
		    </view>
		  </view>
		  <view class="tab">
		    <view class="left">地址</view>
		    <view class="right">
		      <input @input="inputchange" data-name="address" placeholder="请输入" :value="form.address||''"></input>
		    </view>
		  </view>
		  <view class="tab" style="padding-bottom: 250rpx;">
		    <view class="left">职业等级</view>
		    <view class="right">
		      <input @input="inputchange" data-name="occupation" placeholder="请输入" :value="form.occupation||''"></input>
		    </view>
		  </view>
		</view>
		<view class="towhite" @click="setuser">修改信息</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_token:'',
				items: [
					{ name: '1', value: '男',checked: true},
					{ name: '2', value: '女',checked: false},
				],
				form:{
					headerimg:'http://39.98.47.251:91/upload/xcximg/touxiang.png',
					nickname:'',
					realname:'',
					sex:'',
					mobile:'',
					birthdate: '2016-09-01',
					address: '',
					occupation:'',
				}
			}
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
						console.log('user_token',that.user_token)
			    }
			});
			this.getuser()
			// this.getBanner();
			// this.getClass();
		},
		methods:{
			inputchange (e) {
				var that = this;
				var name = e.currentTarget.dataset.name;
				var value = e.detail.value;
				console.log(e)
				if ( name == 'nickname') {
					this.form.nickname= value
				} else if (name == 'sex') {
					this.form.sex= value;
					console.log('修改生日',value)
				} else if (name == 'birthdate') {
					this.form.birthdate= value
				} else if (name == 'realname') {
					this.form.realname= value
				} else if (name == 'mobile') {
					this.form.mobile= value
				} else if (name == 'address') {
					this.form.address= value
				} else if (name == 'occupation') {
					this.form.occupation= value
				}
				console.log(this.form)
			},
			getuser(){// 获取用户信息
				uni.request({
					url: this.$url+'api/user/info'+this.user_token,
					method: 'post',
					data: {},
					success: res => {
						console.log(res,'用户信息');
						if(res.data.code == 10000){
							this.form = res.data.data;
							if(this.form.sex == 2){
								console.log(1)
								this.items[0].checked = false;
								this.items[1].checked = true;
							}
						}else{
							this.$msg(res.data.msg)
						}
					},
				})
			},
			setuser(){// 修改用户信息
				if(this.form.headerimg==""||this.form.nickname==""||this.form.sex==""||this.form.birthdate==""||this.form.mobile==""||this.form.address==""||this.form.realname==""||this.form.occupation==""){
					this.$msg("所有信息都是必须的!");
					return;
				}
				uni.request({
					url: this.$url+'api/user/save'+this.user_token
					+'&headerimg='+this.form.headerimg
					+'&nickname='+this.form.nickname
					+'&sex='+this.form.sex
					+'&birthdate='+this.form.birthdate
					+'&mobile='+this.form.mobile
					+'&address='+this.form.address
					+'&realname='+this.form.realname
					+'&occupation='+this.form.occupation,
					method: 'post',
					data: this.form,
					success: res => {
						console.log(res,'用户信息');
						if(res.data.code == 10000){
							this.$msg(res.data.msg)
							uni.navigateBack({
							    delta: 1
							});
							//this.form = res.data.data;
						}
						this.$msg(res.data.msg)
					},
				})
			},
			upimg(){
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success:  (res)=> {
						const tempFilePaths = res.tempFilePaths;
						const uploadTask = uni.uploadFile({
						url : this.$url+'api/upload/index'+this.user_token+'&upload_type=image',
						filePath: tempFilePaths[0],
						name: 'file',
						formData: {
						 'user': 'test'
						},
						success:  (res)=> {
							console.log(res,"图片");
							var arr = JSON.parse(res.data);
							this.form.headerimg = arr.data;
						}
					});
			 
					uploadTask.onProgressUpdate(function (res) {
						//_self.percent = res.progress;
						console.log('上传进度' + res.progress);
						console.log('已经上传的数据长度' + res.totalBytesSent);
						console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
					 });
					},
					error : function(e){
					 console.log(e);
					}
				 });
			},
		},
	}
</script>
<style lang="scss">
	.header{
	  padding: 30rpx;
	}
	.header>image{
	  float: left;
	  width: 150rpx;
	  height: 150rpx;
	  border-radius:50%;
	}
	.header>view{
	  margin-left: 180rpx;
	  line-height: 150rpx;
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
	  color: #8B8B8B;
	}
	.right{
	  position: absolute;
	  text-align: right;
	  line-height: 100rpx;
	  right: 0;
	  width: 100%;
	  height: 100rpx;
	  top: 0;
	}
	input{
	  text-align: right;
	  line-height: 100rpx;
	  height: 100rpx;
	}
	.tab .right .radio:first-of-type{
		margin-right: 30rpx;
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