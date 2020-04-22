<template>
	<div class="Ordinary clear">
		<app_nav ms='/Management' ims='/Log' />
		<div class="rigth">
			<app_top />
			<div class="main">
				<div class="table">
					<div class="t_top clear">
						<div class="t_left">
							<el-date-picker class="time-select" v-model="data_account" placeholder="选择时间"></el-date-picker>
							<select v-model="status_account" style="color:#777">
								<option value="">全部</option>
								<option value="1">已处理</option>
								<option value="0">未处理</option>
							</select>
							<input type="text" class="index_B" placeholder="请输入关键词" v-model="keyword_account">
							<button class="btn1" @click="GetClass(1)">查询</button>
						</div>
					</div>
					<div class="t_main">
						<el-table border :header-cell-style="{'background-color': '#28313F','color': '#fff','height':'0.5rem'}" :stripe="true" :data="tableData" style="width: 100%;max-height:100%" :row-style="{'height':'0.6rem'}">
							<el-table-column prop="nickname" label="用户昵称" sortable header-align='center' align='center'></el-table-column>
							<el-table-column prop="mobile" label="手机号" header-align='center' align='center'></el-table-column>
							<el-table-column prop="content" label="反馈内容" header-align='center' align='center'></el-table-column>
							<el-table-column prop="create_time" label="反馈时间" header-align='center' align='center'></el-table-column>
							<el-table-column label="操作" header-align='center' align='center'>
								<template slot-scope="scope">
									<span v-if="scope.row.reply_time">--</span>
									<el-button v-else size="mini" @click="set(scope.$index)" type="primary">处理</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<el-pagination style="text-align: center;position: absolute;bottom: 0.1rem;right: 0px;left: 0px;margin: 0;padding: 0;height: 0.45rem;line-height: 0;" v-if="tableData.length>0"
					 @current-change="CurrentChange" :current-page="Page" :page-size="PageSize" layout="total, prev, pager, next, jumper"
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
				isPopup:false,
				keyword_account:'',
				phone_account: "",
				name_account: "",
				status_account: "",
				data_account: "",
				Page: 1,
				PageSize: 7,
				total: 0,
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
			set(a) {
				this.$prompt('请输入回复内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
					a.reply_content = value;
          that.$axios
					.post(
						"suggest/save?admin_token="+sessionStorage.getItem("admin_token"),
						that.$qs.stringify(a)
					)
					.then(res => {
						console.log(res)
						if (res.data.code == 10000) {
							that.$message({
								type:'success',
								message:'回复成功!'
							})
						}else{
							that.$message.error(res.data.msg)
						}
					});
        }).catch(() => {
           
        });
			},
			
			CurrentChange(val) {
				//console.log(val)
				this.Page = val;
				this.GetTreat()
			},
			GetClass(a) {
				var that = this;
				if(a==1){
					that.Page=1;
				}
				that.$axios
					.post(
						"suggest/index?admin_token="+sessionStorage.getItem("admin_token"),
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
							console.log(res.data.data.list, "课程列表");
							that.tableData = res.data.data.list;
							that.total = res.data.data.total_num
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
					background: white;
					padding: 0.3rem 0.4rem;
					position: relative;
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
						border: 1px #111111 solid;
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
			}
		}
	}

</style>
