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
	
					<div class="t_main" >
						<el-table   border:header-cell-style="{'background-color': '#28313F','color': '#fff','height':'0.5rem'}" :stripe="true" :data="tableData" style="width: 100%;max-height:100%" :row-style="{'height':'0.5rem'}">
								
							<el-table-column prop="nickname" label="昵称" sortable header-align='center' align='center'>
							</el-table-column>
							<el-table-column prop="mobile" label="手机" header-align='center' align='center'></el-table-column>
							<el-table-column width="60px" prop="totalcredits" label="总学分" header-align='center' align='center'></el-table-column>
							<el-table-column width="60px" prop="exam" label="试题" header-align='center' align='center'></el-table-column>
							<el-table-column width="60px" prop="watch" label="视频" header-align='center' align='center'></el-table-column>
							<el-table-column label="学分详情" header-align="center" align="center">
								<template slot-scope="scope">
									<el-button size="mini"   @click="getCreditlists(scope)" class="el-table_row">查看</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					
					<el-pagination style="text-align: center;height: 0.45rem;" v-if="tableData.length>0"
					 @current-change="CurrentChange1" @size-change="handleSizeChange1" :current-page="Page1" :page-size="PageSize1"  :page-sizes="[10, 20, 30]" layout="total,sizes, prev, pager, next, jumper"
					 :total="total1length"></el-pagination>
				</div>
				<div class="table">
					<div class="t_top clear">
						<div class="t_left">
							<select v-model="status_account" style="color:#777">
								<option value="0">全部</option>
								<option value="1">视频得分</option>
								<option value="2">试题得分</option>
							</select>
							<button class="btn1" @click="getCreditlists(1)">查询</button>
						</div>
					</div>
					<div class="t_main">
						<el-table border :header-cell-style="{'background-color': '#28313F','color': '#fff','height':'0.6rem'}" :stripe="true" :data="tableData2" style="width: 100%;max-height:95%" :row-style="{'height':'0.7rem'}">
							<el-table-column prop="score_type_name" label="获取途径" sortable header-align='center' align='center'></el-table-column>
							<el-table-column prop="get_score" label="获取学分" header-align='center' align='center'></el-table-column>
							<el-table-column prop="create_time" label="获取时间" header-align='center' align='center'></el-table-column>
						</el-table>
					</div>
					<el-pagination style="text-align: center;height: 0.45rem;" v-if="tableData.length>0"
					 @current-change="CurrentChange2" @size-change="handleSizeChange2"
					 :current-page="Page2" :page-sizes="[10, 20, 30]" :page-size="PageSize2" layout="total,sizes, prev, pager, next, jumper"
					 :total="total2length"></el-pagination>
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
				tableData2:[],
				wx_account: "",
				phone_account: "",
				name_account: "",
				status_account: "",
				data_account: "",
				Page1: 1,
				PageSize1: 10,
				total1: 0,
				Page2: 1,
				PageSize2: 10,
				total2: 0,
				pinglunTotal:0,
				total1length:0,
				total2length:0,
				nowid:0,
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
			CurrentChange2(num) {
				//console.log(val)
				this.Page2 = num;
				this.getCreditlists()

			},
			handleSizeChange2(num){
				this.PageSize2 = num;
				this.getCreditlists()

			},
			GetClass(a) {
				var that = this;
				if(a==1){
					that.Page=1;
				}
				that.$axios
					.post(
						"user/creditlist?admin_token="+sessionStorage.getItem("admin_token"),
						that.$qs.stringify({
							keyword:this.name_account
							
						})
					)
					.then(res => {
						console.log(res)
						if (res.data.code == 10000) {
							console.log(res, "学分列表");
							
							that.tableData = res.data.data;
							this.total1length=that.tableData.length
							console.log('that.tableData',that.tableData)
							 that.tableData=that.tableData.slice(this.PageSize1*(this.Page1-1),this.PageSize1*(this.Page1))
						}else if(res.data.code == 10002) {
							this.$message.error("登录信息失效，请重新登录!")
							this.$router.push("/Login")
						}else{
							this.$message.error(res.data.msg)
						}
					});
			},
			getCreditlists(scope){
				var that = this;
				// let  nickname=tableData.nickname
				if(scope!=undefined&&scope!=1){
				this.nowid=scope.row.user_id
				}
				if(scope!=undefined||scope==1){
				that.$axios
					.post(
						"user/creditdetails?admin_token="+sessionStorage.getItem("admin_token"),
						that.$qs.stringify({
							user_id:this.nowid,
							score_type:this.status_account
          })
					)
					.then(res => {
						
						if (res.data.code == 10000) {
							this.tableData2=res.data.data
							this.total2length=this.tableData2.length
             this.tableData2=this.tableData2.slice(this.PageSize2*(this.Page2-1),this.PageSize2*(this.Page2))
						}else if(res.data.code == 10002) {
							this.$message.error("登录信息失效，请重新登录!")
							this.$router.push("/Login")
						}else{
							this.$message.error(res.data.msg)
						}
					});
				}
			}
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
							.index_A{
								width:2.0rem !important;
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
