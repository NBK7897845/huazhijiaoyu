<template>
	<div class="top_app">
		<img src="../assets/Index/header.png" alt="">
		<el-button @click="Toindex" class="black" v-if="black">返回主页</el-button> 
		<div class="text">
			<span>{{time}}</span> 
			<span>欢迎您，{{name}}</span>
			<img src="../assets/Index/推出.png" @click="quit" alt="">
		</div>
	</div>
</template>

<script>
	export default {
		name: "top_app",
		props: {},
		data() {
			return {
				name: '',
				time:'',
				black: false,
			}
		},
		created() {
			this.name = sessionStorage.getItem("UserName")
			let power = sessionStorage.getItem("power");
			if(power>4){
				this.black = true;
			}
			this.getTime()
			setInterval(this.getTime, 1000);
			//this.watchrouter()
		},
		mounted() {

		},
		methods: {
			getTime(){
        this.time = this.newTime()
			},
			quit() {
				this.$confirm('确认退出登录吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(() => {
					this.$router.push("/Login")
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			Toindex(){
				this.$router.push("/Index")
			},
			watchrouter() {
				let that = this
				var PassWord = sessionStorage.getItem("PassWord");
				var UserName = sessionStorage.getItem("UserName");
				if (!UserName) {
					this.$router.push("/Login")
					this.$message.error("登录信息错误，请重新登录")
					return false
				}
				console.log(UserName, "route")
				this.$axios.post("login/index", this.$qs.stringify({
					PassWord: PassWord,
					admin_name:UserName 
				})).then(res => {
					console.log(res)
					if (res.status != 200) {
						this.$router.push("/Login")
						this.$message.error("登录信息错误，请重新登录")
					}
				})
				.catch(()=>{
					this.$router.push("/Login")
					this.$message.error("登录信息错误，请重新登录")
				})
			}
		},

	}
</script>

<style scoped lang="scss">
	.top_app {
		width: 100%;
		height: 0.85rem;
		background: white;
		float: right;
		position: relative;
		box-shadow:0px 5px 6px 0px rgba(0, 0, 0, 0.11);
		>span{
			font-size: 0.3rem;
			position: absolute;
			padding: 0.2rem;
			font-weight: 500;
		}
		>.black{
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: 3.5rem;
		}
		>img {
			font-size: 0.4rem;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: 0.3rem;
		}

		>.text {
			font-size: 0.16rem;
			position: absolute;
			height: 0.85rem;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			right: 0.4rem;

			>span {
				margin-right: 0.5rem;
			}

			>.btn {
				cursor: pointer;
				color: #ffffff;
				>img {
					width: 0.25rem;
				}
			}
			>img{
				width: 0.32rem;
				height: 0.32rem;
			}
		}
	}
</style>
