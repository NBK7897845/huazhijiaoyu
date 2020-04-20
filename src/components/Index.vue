<template>
	<div class="Ordinary clear">
		<app_nav ms='/Index'  />
		<div class="rigth">
			<app_top />
			<div class="main">
				<div class="table">
					<div class="top">
						<div class="t-left">
							<div class="t-l-top">用户数据</div>
							<div class="t-l-bottom">
								<div>
									<img src="../assets/Index/18.png" alt="">
									<div>
										<img src="../assets/Index/31.png" alt="">
										<div>
											<span>本月新增用户</span>
											<p>{{list1.data1}}</p>
										</div>
									</div>
								</div>
								<div>
									<img src="../assets/Index/19.png" alt="">
									<div>
										<img src="../assets/Index/31.png" alt="">
										<div>
											<span>累计用户</span>
											<p>{{list1.data2}}</p>
										</div>
									</div>
								</div>
								<div>
									<img src="../assets/Index/20.png" alt="">
									<div>
										<img src="../assets/Index/31.png" alt="">
										<div>
											<span>会员</span>
											<p>{{list1.data3}}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="t-right">
							<div class="t-r-top">近日访问量</div>
							<div class="t-r-bottom">
								<div>
									<div>{{list2[0].dates}}</div>
									<div class="progress">
										<el-progress :percentage="list2[0].bl" :show-text="false"></el-progress>
									</div>									
									<div>{{list2[0].nums}}</div>
								</div>
								<div>
									<div>{{list2[1].dates}}</div>
									<div class="progress">
										<el-progress :percentage="list2[1].bl" :show-text="false" status="exception"></el-progress>
									</div>									
									<div>{{list2[1].nums}}</div>
								</div>
								<div>
									<div>{{list2[2].dates}}</div>
									<div class="progress">
										<el-progress :percentage="list2[2].bl" :show-text="false" status="warning"></el-progress>
									</div>									
									<div>{{list2[2].nums}}</div>
								</div>
								<div>
									<div>{{list2[3].dates}}</div>
									<div class="progress">
										<el-progress :percentage="list2[3].bl" :show-text="false" status="success"></el-progress>
									</div>									
									<div>{{list2[3].nums}}</div>
								</div>
							</div>
						</div>
					</div>
					<div class="bottom">
						<div class="b-left">
							<div class="b-title">
								<span>财务统计财务统计</span> 
								<span style="float:right">本年充值3金额趋势</span> 
							</div>
							<div class="b-bottom">
								<div id="MyChearts1" style="height: calc(100% - 0.2rem);width:60%;margin-top: 0.1rem;float:right;"></div>
								<div class="b-b-left">
									<div>
										<img src="../assets/Index/101.png" alt="">
										<div>
											<div>今日充值金额</div>
											<span>{{list31.data1}}</span>
										</div>
									</div>
									<div>
										<img src="../assets/Index/100.png" alt="">
										<div>
											<div>本月充值金额</div>
											<span style="color: #3D5AF0;">{{list31.data2}}</span>
										</div>
									</div>
									<div>
										<img src="../assets/Index/102.png" alt="">
										<div>
											<div>累计充值金额</div>
											<span style="color: #FD7A58;">{{list31.data3}}</span>
										</div>
									</div>
								</div>
								
							</div>
						</div>
						<div class="b-right">
							<div class="b-r-title">累计视频播放排行榜</div>
							<div class="b-r-bottom">
								<div class="bottom-title" v-for="(item,index) in list4" :key="index">
									<div class="bottom-box">
										<div class="title-img">
											<img :src="item.class_cover" alt="">
										</div>
										<div class="title-info">
											<div>{{item.class_name}}</div>
											<span>{{item.create_time|getDateT2}}上传</span>
											<p></p>
										</div>
										<div class="title-num">
											<button>{{item.watchnums}}次</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	let echarts = require("echarts/lib/echarts");
	require("echarts/lib/chart/line");
	require("echarts/lib/chart/bar");
	require("echarts/lib/component/tooltip");
	require("echarts/lib/component/title");
	import app_nav from '../card/Inquirenav.vue'
	import app_top from '../card/Inquirehead.vue'
	export default {
		name: 'Inquire',
		data() {
			return {
				list1:{data1:0,data2:0,data3:0},
				list2:[{data1:0},{data2:0},{data3:0},{data4:0}],
				list31:[{data1:0},{data2:0},{data3:0}],
				list32:[{data1:0},{data2:0},{data3:0}],
				list4:[{data1:0},{data2:0},{data3:0}],
			}
		},
		created() {
			this.Get1();
			this.Get2();
			this.Get3();
			this.Get4();
		},
		mounted() {
			this.drawbar();
		},
		components: {
			app_nav,
			app_top,
		},
		methods: {
			//开关弹窗
			Popups() {
				this.isPopup = !this.isPopup
			},
			pop_huanzhe(a,b) {
				if (a) {
					this.user = this.tableData[b];
				}else{
					this.user = null;
				}
				this.ishuanzhe = !this.ishuanzhe
			},
			drawbar(arr,month) {
				var that = this;
				let myChart = echarts.init(document.getElementById("MyChearts1"));
				let option = {
					legend: {
							data: ['充值金额']
					},
					xAxis: {
						type: 'category',
						boundaryGap: true,
						data: month///that.Month
					},
					grid: [{
						x: '10%',
						y: '10%',
						width: '85%',
						height: '85%'
					}],
					yAxis: {
						name : '金额(元/月)',
						type: 'value'
					},
					series: [{
						name: '充值金额',
						data: arr,//that.Physician,
						type: 'line',
						smooth:true,
						itemStyle : { normal: {label : {show: true} }}
					}]
				};
				myChart.setOption(option);
				//window.onresize = myChart.resize();
			},
			Get1() {
				var that = this;
				that.$axios
					.post(
						"firstpage/part1?admin_token="+sessionStorage.getItem("admin_token"),
						that.$qs.stringify({
							category_id:""
						})
					)
					.then(res => {
						//console.log(res)
						if (res.data.code == 10000) {
							console.log(res.data.data, "课程列表1");
							that.list1 = res.data.data
						}else if(res.data.code == 10002) {
							this.$message.error("登录信息失效，请重新登录!")
							this.$router.push("/Login")
						}else{
							that.$message.error(res.data.msg);
						}
					});
			},
			Get2() {
				var that = this;
				that.$axios
					.post(
						"firstpage/part2?admin_token="+sessionStorage.getItem("admin_token"),
						that.$qs.stringify({
							category_id:""
						})
					)
					.then(res => {
						console.log(res)
						if (res.data.code == 10000) {
							console.log(res.data.data.data4, "课程列表2");
							that.list31 = res.data.data;
							var arr = [];
							var month = [];
							console.log([1,2].constructor )
							console.log({q:1}.constructor )
							console.log(that.list31.data4.constructor )
							that.list31.data4.forEach((el)=>{
								arr.push(el.amount);
								month.push(el.month);
							})
							that.drawbar(arr,month)
						}else if(res.data.code == 10002) {
							this.$message.error("登录信息失效，请重新登录!")
							this.$router.push("/Login")
						}
					});
			},
			Get3() {
				var that = this;
				that.$axios
					.post(
						"firstpage/part3?admin_token="+sessionStorage.getItem("admin_token"),
						that.$qs.stringify({
							category_id:""
						})
					)
					.then(res => {
						console.log(res)
						if (res.data.code == 10000) {
							console.log(res.data.data, "课程列表3");
							res.data.data.forEach((el)=>{
								el.dates = el.dates.slice(5)
							})
							that.list2 = res.data.data
							
						}else if(res.data.code == 10002) {
							this.$message.error("登录信息失效，请重新登录!")
							this.$router.push("/Login")
						}
					});
			},
			Get4() {
				var that = this;
				that.$axios
					.post(
						"firstpage/part4?admin_token="+sessionStorage.getItem("admin_token"),
						that.$qs.stringify({
							category_id:""
						})
					)
					.then(res => {
						console.log(res)
						if (res.data.code == 10000) {
							console.log(res.data.data, "课程列表4");
							that.list4 = res.data.data;
						}else if(res.data.code == 10002) {
							this.$message.error("登录信息失效，请重新登录!")
							this.$router.push("/Login")
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
			background: #f5f5f5;
			position: relative;

			>.main {
				margin-top: 0.85rem;
				width: 100%;
				padding: 0.2rem;
				.table {
					width: 100%;
					min-height: calc(100vh - 1.25rem);
					.top{
						margin-bottom: 0.3rem;
						display: flex;
						height: 2.5rem;
						.t-left{
							width: 67%;
							background: #fff;
							padding: 0.2rem 0.28rem 0.34rem 0.28rem;
							box-shadow:0px 0.05rem 0.06rem 0px rgba(0, 0, 0, 0.11);
							margin-right: 0.3rem;
							.t-l-top{
								font-size:0.18rem;
								font-weight:bold;
								color:rgba(22,22,22,1);
								margin-bottom: 0.2rem;
							}
							.t-l-bottom{
								display: flex;
								justify-content: space-between;
								>div{
									position: relative;
									img{
										width: 3.39rem;
										height: 1.57rem;
									}
									>div{
										position: absolute;
										top:50%;
										left:5%;
										transform: translate(0,-50%);
										display: flex;
										img{
											width:0.65rem;
											height:0.65rem;
											margin-right: 0.2rem;
										}
										span,p{
											font-size: 0.18rem;
											color: #ffffff;
										}
										p{
											font-size: 0.3rem;
											margin-top:0.1rem;
										}
									}
								}
							}
						}
						.t-right{
							flex: 1;
							background: #fff;
							box-shadow:0px 0.05rem 0.06rem 0px rgba(0, 0, 0, 0.11);
							display: flex;
							flex-direction:column;
							.t-r-top{
								font-size:0.18rem;
								padding: 0.25rem;
								font-weight:bold;
								color:rgba(22,22,22,1);
							}
							.t-r-bottom{
								flex:1;
								display: flex;
								flex-direction:column;
								>div{
									height:25%;
									position: relative;
									padding-top: 0.1rem;
									>div{
										width:15%;
										display: inline-block;
										text-align:center;
									}
									.progress{
										width: 65%;
									}
								}
								>div+div{
									border-top:1px #AEAEAE solid;
									
								}
							}
						}

					}
					.bottom{
						height: calc(100vh - 4.1rem);
						display: flex;
						.b-left{
							width: 67%;
							height: 100%;
							background: #fff;
							box-shadow:0px 0.05rem 0.06rem 0px rgba(0, 0, 0, 0.11);
							margin-right: 0.3rem;
							padding: 0.2rem 0.3rem;
							.b-title{
								span{
									font-size: 0.18rem;
									font-weight:bold;
								}
							}
							.b-bottom{
								height: calc(100% - 0.2rem);
								
								.b-b-left{
									width: 2.78rem;
									height: 100%;
									display: flex;
									flex-direction:column;
									justify-content: space-around;
									>div{
										position: relative;
										height: 1.37rem;
										>img{
											position: absolute;
											width: 100%;
											height: 100%;
										}
										>div{
											position: absolute;
											left:10%;
											top: 50%;
											transform: translate(0,-50%);
											>div{
												font-size: 0.18rem;
												color: #161616;
												margin-bottom: 0.2rem;
											}
											>span{
												font-size: 0.3rem;
												font-weight: bold; 
												color: #EC9C48;
											}
										}
									}
								}
							}
						}
						.b-right{
							flex: 1;
							height: 100%;
							background: #fff;
							box-shadow:0px 0.05rem 0.06rem 0px rgba(0, 0, 0, 0.11);
							
							.b-r-title{
								font-size:0.18rem;
								margin: 0.2rem;
								font-weight:bold;
								color:rgba(22,22,22,1);
							}
							.b-r-bottom{
								height: calc(100% - 0.7rem);
								.bottom-title+.bottom-title{
									border-top: 1px #cccccc solid;
								}
								.bottom-title{
									height: 25%;
									position: relative;
									.bottom-box{
										height: 1rem;
										width: 90%;
										display: flex;
										position: relative;
										top: 50%;
										transform: translate(0,-50%);
										margin-left:5%;
										.title-img{
											width: 1rem;
											height: 1rem;
											margin-right: 0.2rem;
											img{
												width:100%;
												height:100%;
											}
										}
										.title-info{
											flex: 1;
											display: flex;
											justify-content: space-between;
											flex-direction:column;
										}
										.title-num{
											position: relative;
											width: 1rem;
											button{
												width: 0.9rem;
												height: 0.3rem;
												position: absolute;
												bottom: 0;
												right:0;
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
