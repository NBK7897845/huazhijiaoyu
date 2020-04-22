<template>
	<view class="">
		<view class="info">
		  <view class="name">我们会及时回复您的意见反馈</view>
		  <view class="title">
		    <textarea placeholder="说点什么吧~" @input="textChange" maxlength="300" :value='textValue'></textarea>
		    <view style="color:#CACACA;}}">{{textIndex}}/300</view>
		  </view>
		  <view class="towhite" @click="submit">我要反馈</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textValue:'',
				textIndex:0,
				user_token:'',
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
			    }
			});
			
			// this.getBanner();
			// this.getClass();
		},
		methods:{
			textChange(e){
				console.log(e.detail.value)
				this.textValue = e.detail.value,
				this.textIndex = e.detail.cursor
			},
			submit(){// 获取轮播图
			  if(!this.textValue.length){
					this.$msg('请输反馈内容');
					return false;
				};
				uni.request({
					url: this.$url+'api/suggest/add'+this.user_token+'&content='+this.textValue,
					method: 'post',
					data: {},
					success: res => {
						console.log(res,'轮播');
						if(res.data.code == 10000){
							this.textValue = '';
						}
						this.$msg(res.data.msg)
					},
				})
			},
		},
	}
</script>
<style lang="scss">
	.info{
	  padding: 30rpx;
	}
	.name{
	  font-size: 30rpx;
	  line-height: 50rpx;
	}
	.title{
	  width: 100%;
	  height: 400rpx;
	  position: relative;
	  margin-top: 20rpx;
	  box-sizing: border-box;
	}
	.title>textarea{
	  width: 100%;
	  height: 100%;
	  padding: 30rpx;
	  border-radius: 10rpx;
	  border: 1px solid #D9D9D9;
	  box-sizing: border-box;
	  font-size: 25rpx;
	}
	.title>view{
	  position: absolute;
	  bottom: 30rpx;
	  right: 30rpx;
	  font-size: 25rpx;
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