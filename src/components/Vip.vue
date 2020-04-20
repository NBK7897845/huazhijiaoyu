<template>
	<div class="Ordinary clear">
		<app_nav ms='/Vip'  />
		<div class="rigth">
			<app_top />
			<div class="main">
				<div class="table">
					<div class="t_top clear">
						<div class="t_left">
							<input type="text" class="index_B" placeholder="请输入关键词" v-model="keyword_account">
							<el-date-picker class="time-select" v-model="data_account" placeholder="选择时间"></el-date-picker>
							<button class="btn1" @click="GetVip(1)">查询</button>
						</div>
					</div>
					<div class="t_main">
						<el-table border :header-cell-style="{'background-color': '#28313F','color': '#fff','height':'0.5rem'}" :stripe="true" :data="tableData" style="width: 100%;max-height:100%" :row-style="{'height':'0.4rem'}">
							<el-table-column prop="nickname" label="订单编号" sortable header-align='center' align='center'></el-table-column>
							<el-table-column prop="nickname" label="订单时间" sortable header-align='center' align='center'></el-table-column>	
							<el-table-column prop="sex" label="订单金额" header-align='center' align='center'>
								<template slot-scope="scope">
									<span>{{scope.row.price}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="birthdate" label="支付方式" header-align='center' align='center'></el-table-column>
							<el-table-column prop="mobile" label="昵称" header-align='center' align='center'></el-table-column>
							<el-table-column prop="address" label="真实姓名" header-align='center' align='center'></el-table-column>
							<el-table-column prop="occupation" label="手机号" header-align='center' align='center'></el-table-column>
						</el-table>
					</div>
					<el-pagination style="text-align: center;height: 0.45rem;" v-if="tableData.length>0"
					 @current-change="CurrentChange" @size-change="handleSizeChange" 
					 :page-sizes="[10, 20, 30]" :current-page="Page" :page-size="PageSize" layout="total,sizes, prev, pager, next, jumper"
					 :total="total"></el-pagination>
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
				keyword_account:'',
				phone_account: "",
				name_account: "",
				status_account: "",
				data_account: "",
				Page: 1,
				PageSize: 7,
				total: 0,
				memberList:[],
			}
		},
		created() {
			//this.GetVip();
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
				this.GetVip()
			},
			handleSizeChange(val){
				this.PageSize = val;
				this.GetVip()
			},
			GetVip(a) {
				var that = this;
				if(a==1){
					that.Page=1;
				}
				that.$axios
					.post(
						"user/index?admin_token="+sessionStorage.getItem("admin_token"),
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
					width: 8rem;
					height: 5rem;
					background: white;
					font-size: 0.16rem;
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
