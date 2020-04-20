<template>
	<div class="Ordinary clear">
		<app_nav ms='/Setinfo' />
		<div class="rigth">
			<app_top />
			<div class="main">
				<div class="table">
					<el-form ref="form" :model="form" label-width="80px">
						<el-form-item label="旧密码">
							<el-input v-model="form.password" show-password></el-input>
						</el-form-item>
						<el-form-item label="新密码">
							<el-input v-model="form.password1" show-password></el-input>
						</el-form-item>
						<el-form-item label="再次确认">
							<el-input v-model="form.password2" show-password @blur="yanzheng"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onSubmit">确认</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import app_nav from '../card/Inquirenav.vue'
	import app_top from '../card/Inquirehead.vue'
	export default {
		name: 'Class',
		data() {
			return {
				
				form:{
					password:'',
					password1:'',
					password2:'',
				}
			}
		},
		created() {
		},
		mounted() {
		},
		components: {
			app_nav,
			app_top
		},
		methods: {
			//开关弹窗
			yanzheng(e){
				if(this.form.password1!=this.form.password2){
					this.$message.error('两次密码输入不同,请确认')
				}
			},
			onSubmit(){
				var that = this;
				if(this.form.password==''||this.form.password1==''||this.form.password2==''){
					this.$message.error('请输入完整信息!')
				}
				if(this.form.password1!=this.form.password2){
					this.$message.error('两次密码输入不同,请确认')
				}
				that.$axios
					.post(
						"admin/set_pwd?admin_token="+sessionStorage.getItem("admin_token"),
						that.$qs.stringify(that.form)
					)
					.then(res => {
						if (res.data.code == 10000) {
							that.$message({
								message: res.data.msg,
								type: 'success'
							})
							that.form = {
								password:'',
								password1:'',
								password2:'',
							}
						}else if(res.data.code == 10002) {
							this.$message.error("登录信息失效，请重新登录!")
							this.$router.push("/Login")
						}else{
							this.$message.error(res.data.msg)
						}
					});
			},
		}
	}
</script>

<style lang="scss" scoped>
.bg{
	background: #4a93f6 !important;
}
.color{
	color: #fff !important;
}
.time-select >>> .el-input__prefix{
	display: none;
	border:none !important;
}
.time-select{
	border: none !important;
}
	.Ordinary {
		height: 100%;
		.rigth {
			width: 88%;
			min-width: 880px;
			height: 100%;
			background: white;
			float: right;
			background: #f2f1e9;
			position: relative;

			>.main {
				margin-top: 0.85rem;
				width: 100%;
				padding: 0.2rem;
				.table {
					min-height: calc(100vh - 1.25rem);
					background: white;
					padding: 0.3rem 0.4rem;
					position: relative;
				}
			}
		}
	}

</style>
