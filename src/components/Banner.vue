<template>
	<div class="Ordinary clear">
		<app_nav ms='/Banner'  />
		<div class="rigth">
			<app_top />
			<div class="main">
				<div class="info">
					<div class="header">
						<button class="btn" @click="AddBanner">新增广告位</button>
					</div>
					<div class="station" v-for="(item,index) in tableData" :key="index">
						<div class="top">
							<span>广告{{index+1}}</span>
							<div @click="del(item.id)">X</div>
						</div>
						<div class="bottom">
							<div class="img-box">
								<div v-if="!item.imgurl">
									<img src="../assets/Index/noimg2.png" alt="">
									<div>未上传图片</div>
								</div>
								<img v-else :src="item.imgurl" alt="">
							</div>
							<div class="right">
								<button class="btn" @click="submitImgs(item)">替换</button>
								<div>建议尺寸658*174像素</div>
								<button class="btn" @click="set(item,'图')">删除</button>
								<div>课程编号</div>
								<input type="text" v-model="item.classurl">
							</div>
							<button class="btn" @click="set(item)">确认</button>
						</div>
					</div>
				</div>
				<el-upload ref="uploads" id="upload1" class="avatar-uploader" :http-request="upload" :auto-upload="false" action="upload2" :on-success="handleSuccess" :on-change="submitUpload" :show-file-list="false" 
				:before-upload="beforeAvatarUpload">
				</el-upload>
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
				tableData: [],
				total:0,
				setId:{},
			}
		},
		created() {
			this.GetBanner();
		},
		mounted() {
		},
		components: {
			app_nav,
			app_top
		},
		methods: {
			CurrentChange(val) {
				//console.log(val)
				this.Page = val;
				this.GetTreat()
			},
			GetBanner() {
				var that = this;
				that.$axios
					.post(
						"banner/info?admin_token="+sessionStorage.getItem("admin_token"),
						that.$qs.stringify({
							banner_id:1,// 广告位置
						})
					)
					.then(res => {
						console.log(res)
						if (res.data.code == 10000) {
							console.log(res.data.data.list, "用户列表");
							that.tableData = res.data.data.list;
							that.total = res.data.data.total_num
						}else if(res.data.code == 10002) {
							this.$message.error("登录信息失效，请重新登录!")
							this.$router.push("/Login")
						}else{
							this.$message.error(res.data.msg)
						}
					});
			},
			del(a){
				var that = this;
				that.$axios
					.post(
						"banner/infodel?admin_token="+sessionStorage.getItem("admin_token"),
						that.$qs.stringify({
							id:a,// 广告位置
						})
					)
					.then(res => {
						console.log(res)
						if (res.data.code == 10000) {
							console.log(res, "用户列表");
							that.GetBanner();
							that.$message("删除成功")
						}else if(res.data.code == 10002) {
							this.$message.error("登录信息失效，请重新登录!")
							this.$router.push("/Login")
						}else{
							this.$message.error(res.data.msg)
						}
					});
			},
			set(a,b){
				var that = this;
				if(b=='图'){
					this.$confirm('确认删除吗?','提示',{
						confirmButtonText:"确定",
						cancelButtonText:"取消",
						type:"warning"
					}).then(()=>{
						a.imgurl = ''
					}).catch(()=>{
						this.$message({
							type:'info',
							message:"已取消删除"
						})

					})
					
				}
				that.$axios
					.post(
						"banner/save?admin_token="+sessionStorage.getItem("admin_token"),
						that.$qs.stringify(a)
					)
					.then(res => {
						console.log(res)
						if (res.data.code == 10000) {
							that.GetBanner();
							that.$message({
								message: '修改成功',
								type: 'success'
							})
						}else if(res.data.code == 10002) {
							this.$message.error("登录信息失效，请重新登录!")
							this.$router.push("/Login")
						}else{
							this.$message.error(res.data.msg)
						}
					});
			},
			AddBanner(){
				var that = this;
				that.$axios
					.post(
						"banner/addinfos?admin_token="+sessionStorage.getItem("admin_token"),
						that.$qs.stringify({
							banner_id:1,// 广告位置
						})
					)
					.then(res => {
						console.log(res)
						if (res.data.code == 10000) {
							console.log(res, "用户列表");
							that.GetBanner();
							that.$message("添加成功")
						}else if(res.data.code == 10002) {
							this.$message.error("登录信息失效，请重新登录!")
							this.$router.push("/Login")
						}else{
							this.$message.error(res.data.msg)
						}
					});
			},
			submitUpload() {
				this.$refs.uploads.submit();
			},
			handleSuccess(response, file, fileList) {
				//console.log(response);
				//console.log(file, fileList);
			},
			beforeAvatarUpload(file) {
				console.log(file,"上传前")
				const isJPG = file.type === "image/jpeg" || "image/gif" || "image/png";
				const isLt2M = file.size / 1024 / 1024 < 20000;
				// if (!isJPG) {
				// 	this.$message.error("上传图片只能是图片格式!");
				// }
				// if (!isLt2M) {
				// 	this.$message.error("上传图片大小不能超过 2MB!");
				// }
				return isJPG && isLt2M;
			},
			submitImgs(a){
				this.setId = a
				document.querySelector(".avatar-uploader input").click()
			},
			upload(file) {
				console.log(file)
				let that = this;
				var formData = new FormData();
				formData.append("file", file.file);
				formData.append("upload_type", file.file.type.split('/')[0]);
				that.$refs.uploads.clearFiles()
				that.$axios
					.post("upload/index?admin_token="+sessionStorage.getItem("admin_token"),
					formData,
					{
						  headers: {
							"Content-type": "multipart/form-data"
						}
					})
					.then(res => {
						console.log(res)
						if (res.data.code == 10000) {
							console.log(res,that.setId)
							that.setId.imgurl = res.data.data
							that.set(that.setId)
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
<style lang='scss'>

	
	.t_left{
			.el-input__inner{
		padding-left: 10px;
		padding-right: 10px;
	}
	}
</style>
<style lang="scss" scoped>
.clear:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
		content: "";
		display: block;
		height: 0;
		clear:both;
		visibility: hidden;
}
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
				height: calc(100vh - 0.85rem);
				overflow: auto;
				margin-top: 0.85rem;
				width: 12.07rem;
				padding: 0.2rem;
				>.info{
					>.header{
						display: flex;
						justify-content:flex-end;
						margin-bottom: 0.2rem;
					}
					.station+.station{
						margin-top: 0.45rem;
					}
					.station{
						padding: 0.2rem;
						background: #ffffff;
						font-size: 0.18rem;
						>.top{
							display: flex;
							justify-content:space-between;
							>div{
								width:0.33rem;
								height:0.33rem;
								background:rgba(253,41,111,1);
								border-radius:50%;
								color: #ffffff;
								text-align: center;
								line-height: 0.33rem;
								cursor: pointer;
							}

						}
						>.bottom{
							margin-top: 0.2rem;
							position: relative;
							>.img-box{
								>div{
									position: relative;
									width:6.58rem;
									height: 1.74rem;
									background: #DDDDDD;
									>img{
										position: absolute;
										top: 50%;
										right: 50%;
										transform: translate(50%,-50%);
										width:4.63rem;
										height: 0.89rem;
									}
									>div{
										position: absolute;
										bottom: 0.1rem;
										width: 100%;
										text-align: center;
										color: #908F8F;
									}
								}
								>img{
									width:6.58rem;
									height: 1.74rem;
								}
							}
							.right{
								position: absolute;
								top: 0;
								right: 1rem;
								height:1.74rem;
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								align-items: center;
								>button,input{
									width: 3.23rem;
									height: 0.4rem;
									text-align: center;
								}
								>div{
									color:rgba(119,119,119,1);
									font-size:0.14rem;
								}
							}
							>.btn{
								position: absolute;right:0;bottom:0;width:0.8rem;
							}
						}
					}
				}
			}
		}
	}

</style>
