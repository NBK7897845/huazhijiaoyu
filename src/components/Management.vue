<template>
	<div class="Ordinary clear">
		<app_nav ms='/Management' ims="/Management" />
		<div class="rigth">
			<app_top />
			<div class="main">
				<div class="table">
					<div class="t_top clear">
						<div class="t_left">
							<el-date-picker class="time-select" v-model="data_account" placeholder="选择时间"></el-date-picker>
							<input type="text" class="index_B" placeholder="请输入账户" v-model="user_account">
							<input type="text" class="index_B" placeholder="请输入手机号" v-model="phone_account">
							<button class="btn1" @click="GetAdmin(1)">查询</button>
						</div>
						<div class="t_rigth">
							<button class="btn1" @click="pop_member('新增')">添加</button>
						</div>
					</div>
					<div class="t_main">
						<el-table border :header-cell-style="{'background-color': '#28313F','color': '#fff','height':'0.5rem'}" :stripe="true" :data="tableData" style="width: 100%;max-height:100%" :row-style="{'height':'0.4rem'}">
							<el-table-column prop="admin_name" label="账号名" sortable header-align='center' align='center'></el-table-column>
							<el-table-column prop="username" label="名称" sortable header-align='center' align='center'></el-table-column>
							<el-table-column prop="mobile" label="手机号" header-align='center' align='center'></el-table-column>
							<el-table-column prop="role_name" label="职务" header-align='center' align='center'></el-table-column>
							<el-table-column prop="create_time" label="创建时间" header-align='center' align='center'></el-table-column>
							<el-table-column label="操作" header-align='center' align='center'>
								<template slot-scope="scope">
									<el-button size="mini" type="primary" @click="pop_member(scope.row)">修改</el-button>
									<el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<el-pagination style="text-align: center;height: 0.45rem;line-height: 0;" v-if="tableData.length>0"
					 @current-change="CurrentChange" 
					 @size-change="handleSizeChange" :current-page="Page" :page-size="PageSize" 
					 :page-sizes="[10, 20, 30]" layout="total,sizes, prev, pager, next, jumper"
					 :total="total"></el-pagination>
				</div>
			</div>
			<div class="Popup" v-show="ismember">
				<div class="none" @click="pop_member"></div>
				<div v-if="ismember" class="forms">
					<div class="name" v-if="formList.type">添加管理员</div>
					<div class="name" v-else>修改管理员</div>
					<el-form ref="form" :model="formList" label-width="80px">
						<el-form-item label="账户名">
							<el-input v-model="formList.admin_name"></el-input>
							<span v-if="formList.type">默认密码为123456</span>
						</el-form-item>
						<el-form-item label="名称">
							<el-input v-model="formList.username"></el-input>
						</el-form-item>
						<el-form-item label="角色权限">
							<el-select v-model="formList.role_id">
								<el-option v-for="(item,index) in roleOptions" :key="index" :label="item.role_name" :value='item.role_id'></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="联系方式">
							<el-input v-model="formList.mobile"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onSubmit">确认</el-button>
							<el-button>取消</el-button>
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
				tableData: [],
				ismember:false,
				phone_account: "",
				user_account: "",
				data_account: "",
				Page: 1,
				PageSize: 10,
				formList:{},
				total: 0,
				memberList:[],
				roleOptions:[],
			}
		},
		created() {
			this.GetAdmin();
			this.GetRole();
		},
		mounted() {
		},
		components: {
			app_nav,
			app_top
		},
		methods: {
			//开关弹窗
			pop_member(a){
				if(a == '新增'){
					this.formList = {
						type:true,
						admin_name:"",
						password:123456,
						role_id:'',
						username:'',
						mobile:'',
						status:1,
					}
				}else{
					this.formList = a
				}
				this.ismember = !this.ismember;
			},
			onSubmit(){
				let that = this;
				if(this.formList.adminname == ''||this.formList.user_name == ''||this.formList.mobile == ''||this.formList.role_id == ''){
					console.log(this.formList)
					this.$message.error("请输入完整信息");
					return false;
				};
				if(!this.tests('手机',this.formList.mobile)){

					console.log(this.formList,this.tests('手机',this.formList.mobile))
					this.$message.error("请输入正确手机号码");
					return false;
				}
				let url = "admin/save?admin_token="
				if(this.formList.type){
					url = "admin/add?admin_token="
				}
				this.$confirm('确认提交吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$axios
						.post(
							url+sessionStorage.getItem("admin_token"),
							that.$qs.stringify(this.formList)
						)
						.then(res => {
							console.log(res)
							if (res.data.code == 10000) {
								that.$message({
									message: res.data.msg,
									type: 'success'
								})
								that.GetAdmin();
								that.pop_member();
							}else if(res.data.code == 10002) {
								this.$message.error("登录信息失效，请重新登录!")
								this.$router.push("/Login")
							}else{
								this.$message.error(res.data.msg)
							}
						});
				}).catch(()=>{
					that.$message('已取消')
				})
			},
			del(a){
				var that = this;
				this.$confirm('确认删除吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$axios
						.post(
							"admin/del?admin_token="+sessionStorage.getItem("admin_token"),
							that.$qs.stringify(a)
						)
						.then(res => {
							console.log(res)
							if (res.data.code == 10000) {
								that.$message({
									message: res.data.msg,
									type: 'success'
								})
								that.GetAdmin();
							}else if(res.data.code == 10002) {
								this.$message.error("登录信息失效，请重新登录!")
								this.$router.push("/Login")
							}else{
								this.$message.error(res.data.msg)
							}
						});
				}).catch(()=>{
					that.$message('已取消')
				})
			},
			CurrentChange(val) {
				//console.log(val)
				this.Page = val;
				this.GetAdmin()
			},
			handleSizeChange(val){
				this.PageSize = val;
				this.GetAdmin()
			},
			GetRole(a) {
				var that = this;
				if(a==1){
					that.Page=1;
				}
				that.$axios
					.post(
						"role/index?admin_token="+sessionStorage.getItem("admin_token"),
						that.$qs.stringify({
							keyword:that.keyword_account,
							page:that.Page,
							num:that.PageSize,
							create_time:that.yymmdd(that.data_account)
						})
					)
					.then(res => {
						console.log(res)
						if (res.data.code == 10000) {
							console.log(res.data.data.list, "角色列表");
							that.roleOptions = res.data.data.list;
						}else if(res.data.code == 10002) {
							this.$message.error("登录信息失效，请重新登录!")
							this.$router.push("/Login")
						}else{
							this.$message.error(res.data.msg)
						}
					});
			},
			GetAdmin(a) {
				var that = this;
				if(a==1){
					that.Page=1;
				}
				that.$axios
					.post(
						"admin/index?admin_token="+sessionStorage.getItem("admin_token"),
						that.$qs.stringify({
							keyword:that.keyword_account,
							page:that.Page,
							num:that.PageSize,
							mobile:that.phone_account,
							admin_name:that.user_account,
							create_time:that.yymmdd(that.data_account)
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
					height: calc(100vh - 1.25rem);
					overflow: auto;
					background: white;
					padding: 0.3rem 0.4rem;
					position: relative;
					display: flex;
					flex-direction:column;
					.t_top {
						width: 100%;
						margin-bottom: 0.2rem;
						position: relative;
						button {
							height: 0.3rem;
							width: 0.55rem;
							outline: 0;
							border: 0;
							color: white;
							display: block;
						}

						>.t_left {
							display: flex;
							justify-content: flex-start;
							align-items: center;
							>div,
							>input,
							>select {
								height: 0.3rem;
								width: 1.5rem;
								border: 1px solid #AEAEAE;
								text-align: center;
								font-size: 0.14rem;
								margin-right: 0.4rem;
							}
							>.input {
								width: 1.5rem;
								display: inline-block;
								background: #fff;
								vertical-align: top;
								height: 0.3rem;
								border: none;
								top: 47%;
								padding: 0;

								
							}

							.index_B {
								left: 2rem;
							}
							
							.input{
								left: 7.3rem;
							}



							>span {
								font-size: 0.2rem;
								position: absolute;
								top: 50%;
								transform: translateY(-50%);
								left: 4rem;
							}

							>select {
								left: 5.3rem;
								padding: 0;
								line-height: 0.35rem;
							}
						}
						.t_rigth{
							text-align: right;
							position: absolute;
							right: 0;
							height: 100%;
							top: 0;	
							>{
								button{
									background: #2fcd9b;
								}
							}						
						}
					}

					.t_main {
						font-size: 0.16rem;
						border: 1px #AEAEAE solid;
						flex: 1;
						.i_table {
							text-align: center;
						}
					}
				}
			}
			.Popup {
				width: 100%;
				position: absolute;
				top: 0.85rem;
				background: rgba(0, 0, 0, 0.6);
				height: calc(100% - 0.85rem);
				z-index: 1000;

				.none {
					width: 100%;
					height: 100%;
					position: relative;
				}
				.forms{
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%,-50%);
					width: 5rem;
					max-height: 6rem;
					background: white;
					font-size: 0.16rem;
					padding: 0.2rem;
					overflow: auto;
					>.name{
						width: 100%;
						font-size: 0.2rem;
						text-align: center;
						margin-bottom: 0.2rem;
					}
					>.f-title{
						text-align: center;
						padding: 0.1rem 0.2rem;
						font-size: 0.2rem;
					}
					>.f-top{
						padding: 0.1rem 0.2rem;
						border-bottom: 1px solid #DFDFDF;
					}
					>.f-bottom{
						height: 4rem;
						overflow: auto;
						>.f-item{
							border-bottom: 1px solid #DFDFDF;
							display: flex;
							padding: 0 0.2rem;
							justify-content: space-around;
							>div{
								color: #686868;
								line-height: 0.3rem;
								font-size: 0.14rem
							}
						}
					}
				}
			}
		}
	}

</style>
