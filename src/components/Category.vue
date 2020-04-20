<template>
	<div class="Ordinary clear">
		<app_nav ms='/Category'  />
		<div class="rigth">
			<app_top />
			<div class="main">
				<div class="table">
					<div class="t_top clear">
						<div class="t_left">
							<button class="btn1" @click="Getparent(1)">刷新</button>
						</div>
						<div class="t_rigth">
							<button class="btn1" @click="change(0,'新增')">新增</button>
						</div>
					</div>
					<div class="t_main">
						<el-table border :header-cell-style="{'background-color': '#28313F','color': '#fff','height':'0.5rem'}" :stripe="true" :data="tableData1" style="width: 100%;max-height:100%" :row-style="{'height':'0.4rem'}" @cell-click="handle">
							<el-table-column prop="category_name" label="类别" sortable header-align='center' align='center'></el-table-column>
							<el-table-column prop="create_time" label="创建时间" header-align='center' align='center'></el-table-column>
							<el-table-column label="操作" header-align='center' align='center'>
								<template slot-scope="scope">
									<el-button size="mini" @click="change(scope.row,'修改')" type="primary">修改</el-button>
									<el-button size="mini" @click="Remove(scope.row)" type="danger">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<el-pagination style="text-align: center;height: 0.45rem;" v-if="tableData1.length>0"
					 @current-change="CurrentChange1" @size-change="handleSizeChange1" :current-page="Page1" :page-size="PageSize1"  :page-sizes="[10, 20, 30]" layout="total,sizes, prev, pager, next, jumper"
					 :total="total1"></el-pagination>
				</div>
				<div class="table">
					<div class="t_top clear">
						<div class="t_left">
							<button class="btn1" @click="Getchild(1)">刷新</button>
						</div>
						<div class="t_rigth">
							<button class="btn1" @click="change(parent_id,'新增')">新增</button>
						</div>
					</div>
					<div class="t_main">
						<el-table border :header-cell-style="{'background-color': '#28313F','color': '#fff','height':'0.5rem'}" :stripe="true" :data="tableData2" style="width: 100%;max-height:100%" :row-style="{'height':'0.4rem'}">
							<el-table-column prop="class_name" label="类别" sortable header-align='center' align='center'>
								<template>
									<span>{{category_name}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="category_name" label="专业" sortable header-align='center' align='center'></el-table-column>
							<el-table-column prop="create_time" label="创建时间" header-align='center' align='center'></el-table-column>
							<el-table-column label="操作" header-align='center' align='center'>
								<template slot-scope="scope">
									<el-button size="mini" @click="change(scope.row,'修改')" type="primary">修改</el-button>
									<el-button size="mini" @click="Remove(scope.row)" type="danger">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<el-pagination style="text-align: center;height: 0.45rem;" v-if="tableData2.length>0"
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
				tableData1: [],
				tableData2: [],
				Page1: 1,
				PageSize1: 10,
				total1: 0,
				Page2: 1,
				PageSize2: 10,
				total2: 0,
				parent_id:0,
				category_name:'',
				data:{
					category_name:'',
					parent_id:''
				}
			}
		},
		created() {
			this.Getparent();
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
			handle(row,column,event,cell){
				this.parent_id = row.category_id;
				this.category_name = row.category_name;
				this.Getchild(1)
			},
			CurrentChange1(val) {
				//console.log(val)
				this.Page1 = val;
				this.Getparent()
			},
			handleSizeChange1(val){
				this.PageSize1= val;
				this.Getparent()
			},
			CurrentChange2(val) {
				//console.log(val)
				this.Page2 = val;
				this.Getchild()
			},
			handleSizeChange2(val){
				this.PageSize2 = val;
				this.Getchild()
			},
			change(a,b) {
				let url = "category/save?admin_token=";
				if(b == '新增'){
					a = {
						category_name:'',
						parent_id:a
					};
					url = "category/add?admin_token=";
				}
				var that = this;
				this.$prompt('请输入内容', '提示', {
          confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputValue:a.category_name,
        }).then(({ value }) => {
					a.category_name = value;
          that.$axios
						.post(
							url+sessionStorage.getItem("admin_token"),
							that.$qs.stringify(a)
						)
						.then(res => {
							console.log(res)
							if (res.data.code == 10000) {
								that.$message({
									type:'success',
									message:res.data.msg
								})
								if(a.parent_id>0){
									that.Getchild(1);
								}else{
									that.Getparent(1)
								}

							}else if(res.data.code == 10002) {
								this.$message.error("登录信息失效，请重新登录!")
								this.$router.push("/Login")
							}else{
								this.$message.error(res.data.msg)
							}
						});
        }).catch(() => {
                
        });
			},
			Remove(a){
				var that = this;
				this.$confirm('确认新增课程吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$axios
						.post(
							"category/del?admin_token="+sessionStorage.getItem("admin_token"),
							that.$qs.stringify(a)
						)
						.then(res => {
							console.log(res)
							if (res.data.code == 10000) {
								that.$message({
									type:'success',
									message:res.data.msg
								})
								
								if(a.parent_id>0){
									that.Getchild(1);
								}else{
									that.Getparent(1)
								}
							}else if(res.data.code == 10002) {
								this.$message.error("登录信息失效，请重新登录!")
								this.$router.push("/Login")
							}else{
								this.$message.error(res.data.msg)
							}
						});
				})
			},
			Getparent(a) {
				var that = this;
				if(a==1){
					that.Page=1;
				}
				that.$axios
					.post(
						"category/index?admin_token="+sessionStorage.getItem("admin_token"),
						that.$qs.stringify({
							parent_id:0,
							page:that.Page1,
							pagesize: that.PageSize1
						})
					)
					.then(res => {
						console.log(res)
						if (res.data.code == 10000) {
							console.log(res.data.data.list, "课程列表");
							that.tableData1 = res.data.data.list;
							that.total1 = res.data.data.total_num;
							that.parent_id = that.tableData1[0].category_id;
							that.category_name = that.tableData1[0].category_name;
							that.Getchild();
						}else if(res.data.code == 10002) {
							this.$message.error("登录信息失效，请重新登录!")
							this.$router.push("/Login")
						}else{
							this.$message.error(res.data.msg)
						}
					});
			},
			Getchild(a) {
				var that = this;
				if(a==1){
					that.Page=1;
				}
				that.$axios
					.post(
						"category/index?admin_token="+sessionStorage.getItem("admin_token"),
						that.$qs.stringify({
							parent_id:that.parent_id,
							page:that.Page2,
							pagesize: that.PageSize2
						})
					)
					.then(res => {
						console.log(res)
						if (res.data.code == 10000) {
							console.log(res.data.data.list, "课程列表");
							that.tableData2 = res.data.data.list;
							that.total2 = res.data.data.total_num
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
					overflow: auto;
					height: calc(100vh - 1.25rem);
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
