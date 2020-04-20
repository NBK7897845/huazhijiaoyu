<template>
	<div class="Ordinary clear">
		<app_nav ms='/Credit'  />
		<div class="rigth">
			<app_top />
			<div class="main">
				<div class="table">
					<div class="t_top clear">
						<div class="t_left">
							<input type="text" class="index_A" placeholder="请输入姓名或手机号" v-model="name_account">
							<button class="btn1" @click="GetClass(1)">查询</button>
						</div>
					</div>
					<div class="t_main">
						<el-table border :header-cell-style="{'background-color': '#28313F','color': '#fff','height':'0.5rem'}" :stripe="true" :data="tableData" style="width: 100%;max-height:100%" :row-style="{'height':'0.4rem'}">
							<el-table-column prop="class_name" label="昵称" sortable header-align='center' align='center'></el-table-column>
							<el-table-column prop="category_id" label="手机" header-align='center' align='center'></el-table-column>
							<el-table-column prop="Age" label="总学分" header-align='center' align='center'></el-table-column>
							<el-table-column prop="watchnums" label="试题" header-align='center' align='center'></el-table-column>
							<el-table-column prop="sharenums" label="视频" header-align='center' align='center'></el-table-column>
						</el-table>
					</div>
					<el-pagination style="text-align: center;height: 0.45rem;" v-if="tableData.length>0"
					 @current-change="CurrentChange1" @size-change="handleSizeChange1" :current-page="Page1" :page-size="PageSize1"  :page-sizes="[10, 20, 30]" layout="total,sizes, prev, pager, next, jumper"
					 :total="total1"></el-pagination>
				</div>
				<div class="table">
					<div class="t_top clear">
						<div class="t_left">
							<select v-model="status_account" style="color:#777">
								<option value="">全部</option>
								<option value="1">视频得分</option>
								<option value="2">试题得分</option>
							</select>
							<button class="btn1" @click="GetClass(1)">查询</button>
						</div>
					</div>
					<div class="t_main">
						<el-table border :header-cell-style="{'background-color': '#28313F','color': '#fff','height':'0.5rem'}" :stripe="true" :data="tableData" style="width: 100%;max-height:95%" :row-style="{'height':'0.4rem'}">
							<el-table-column prop="class_name" label="获取途径" sortable header-align='center' align='center'></el-table-column>
							<el-table-column prop="category_id" label="获取时间" header-align='center' align='center'></el-table-column>
							<el-table-column prop="Age" label="获取时间" header-align='center' align='center'></el-table-column>
						</el-table>
					</div>
					<el-pagination style="text-align: center;height: 0.45rem;" v-if="tableData.length>0"
					 @current-change="CurrentChange2" @size-change="handleSizeChange2"
					 :current-page="Page2" :page-sizes="[10, 20, 30]" :page-size="PageSize2" layout="total,sizes, prev, pager, next, jumper"
					 :total="total2"></el-pagination>
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
				wx_account: "",
				phone_account: "",
				name_account: "",
				status_account: "",
				data_account: "",
				Page1: 1,
				PageSize1: 7,
				total1: 0,
				Page2: 1,
				PageSize2: 7,
				total2: 0,
				pinglunTotal:0,
			}
		},
		created() {
			this.GetClass();
			
		},
		mounted() {
		},
		components: {
			app_nav,
			app_top
		},
		methods: {
			//开关弹窗
			Popups() {
				this.isPopup = !this.isPopup
			},
			
			CurrentChange1(val) {
				//console.log(val)
				this.Page1 = val;
				this.GetClass()
			},
			handleSizeChange1(val){
				this.PageSize1= val;
				this.GetClass()
			},
			CurrentChange2(val) {
				//console.log(val)
				this.Page2 = val;
				this.GetClass()
			},
			handleSizeChange2(val){
				this.PageSize2 = val;
				this.GetClass()
			},
			GetClass(a) {
				var that = this;
				if(a==1){
					that.Page=1;
				}
				that.$axios
					.post(
						"credit/add?admin_token="+sessionStorage.getItem("admin_token"),
						that.$qs.stringify({
							
						})
					)
					.then(res => {
						console.log(res)
						if (res.data.code == 10000) {
							console.log(res, "学分列表");
							// that.tableData = res.data.data.list;
							// that.total = res.data.data.total_num
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
				display: flex;
				.table {
					width: 50%;
					height: calc(100vh - 1.25rem);
					background: white;
					overflow: auto;
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
								padding: 0.05rem;
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
						flex:1;
						.i_table {
							text-align: center;
						}
					}
				}
			}
		}
	}

</style>
