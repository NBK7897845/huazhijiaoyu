<template>
	<div class="login">
    <img src="../assets/Login/back.png" alt="">
    <div class="main">
      <div class="login_box">
				<div class="login_main">
					<img class="loginimg" src="../assets/Login/4.png" alt="">
					<img class="logintext" src="../assets/Login/text.png">
					<div class="input">
						<div class="clear">
							<img src="../assets/Login/user.png">
							<input type="text" v-model="username" placeholder="请输入账号">
						</div>
					</div>
					<div class="input">
						<div class="clear">
							<img src="../assets/Login/password.png">
							<input type="password" v-model="password" placeholder="请输入密码">
						</div>
					</div>
					<label class="clear"><input type="checkbox" v-model="checked"><span>记住密码</span></label>
					<div class="btn" @click="login">
						登录
					</div>
				</div>
			</div>
    </div>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {
				username: '',
				password: '',
				checked: false,
			}
		},
		created() {
			sessionStorage.removeItem("UserName")
			sessionStorage.removeItem("PassWord")
			sessionStorage.removeItem("admin_token")
			sessionStorage.removeItem("role_id")
			if (this.getCookie("UserName")) {
				this.checked = true
				this.username = this.getCookie("UserName")
				console.log(this.getCookie("UserName"))
				this.password = this.getCookie("PassWord")
				this.role_id = this.getCookie("role_id")
			}
		},
		methods: {
			getCookie(name) {
				var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
				if (arr = document.cookie.match(reg)){
					return (arr[2]);
				}
				else
					return null;
			},
			setCookie(c_name, value, expiredays) {
				var exdate = new Date();
				exdate.setDate(exdate.getDate() + expiredays);
				document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
			},
			login() {
				let that = this;
				if (!that.username) {
					this.$message.error("请输入账号名")
					return false
				}
				if (!that.password) {
					this.$message.error("请输入密码")
					return false
				}
				// that.password = that.password.toString()
				that.$axios.post("login/index", 
				  that.$qs.stringify({
						admin_name: that.username,
						password: that.password
					}))
					.then(res => {
						if (res.data.code == 10000) {
							that.$message({
										type: "success",
										message: "登录成功",
										showClose: true,
									})
							sessionStorage.setItem("role_id",res.data.data.role_id)
							sessionStorage.setItem("UserName", that.username)
							sessionStorage.setItem("admin_token", res.data.data.admin_token)
							sessionStorage.setItem("PassWord", that.password)
							sessionStorage.setItem("Pages",JSON.stringify(res.data.data.menu))
							if (that.checked) {
								that.setCookie("UserName", that.username, 7)
								that.setCookie("PassWord", that.password, 7)
								that.setCookie("admin_token", res.data.admin_token, 7)	
							};
							that.$router.push(res.data.data.menu[0].menu_url);
						} else {
							that.$message.error(res.data.msg)
							return false
						}
					})
					.catch(function(error) {
						that.$message.error("登录错误")
					})
			},
		}
  }
  //background: url('../assets/Login/6.png') no-repeat center center;
</script>

<style lang="scss" scoped>
$denglu:#3682c3;
  .login{
    height: 100vh;
		overflow: hidden;
		// background: aquamarine 
    //           url(../assets/Login/back.png) 
    //           no-repeat 
    //           scroll 
    //           center center / 50% 
    //           content-box content-box;

    .main{
      position: absolute;
      top:0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 5.5rem;
      margin: auto;
      margin-top:2rem;
      .login_box {
				position: relative;
        background: #fff;
        height: 5.5rem;
        border-radius: 0.2rem;
        box-shadow:0px 0px  10px 5px rgba(10, 10, 10, 0.2);
				>.login_main {
					position: absolute;
					top: 0;
					width: 100%;
					height: 100%;
					padding: 0.4rem 0.6rem;
					>.logintext{
						width: 100%;
						height: 0.3rem;
						display: block;
					}
					>.loginimg{
						width: 1rem;
						height: 0.6rem;
						margin: 0rem auto 0.2rem;
						display: block;
					}
          >p{
            text-align: center;
            font-size: 0.3rem;
            line-height: 0.8rem;
            font-weight: 100;
          }
					.logo {
						width: 1.9rem;
						display: block;
						margin: 0 auto
					}

					.title {
						width: 4rem;
						display: block;
						margin: 0 auto;
						margin-top: 0.3rem;
						margin-bottom: 0.7rem;
					}

					.input {
						height: 0.7rem;
						margin-top: 0.35rem;
						width: 100%;
						border-radius: 0.35rem;
						border: 1px solid #cecece;
						padding: 0.1rem 0.2rem;
						position: relative;

						>div {
							width: 100%;
							height: 0.5rem;
							line-height: 0.5rem;
							position: relative;

							>img {
								width: 0.32rem;
								height: 0.30rem;
								margin: 0.08rem;
								position: absolute;
							}

							>input {
								float: left;
								width: 100%;
								height: 100%;
								text-align: center;
								border: 0;
								outline: 0;
								font-size: 0.18rem;
							}
						}
					}

					>label {
						margin-left: 0.34rem;
						margin-top: 0.3rem;
						font-size: 0.15rem;
						height: 0.2rem;
						line-height: 0.2rem;
						display: block;
						color: #b7b7b7;
						cursor: pointer;
						>input {
							height: 0.20rem;
							width: 0.20rem;
							float: left;
						}

						>span {
							float: left;
							margin-left: 0.05rem;
						}
					}

					.btn {
						height: 0.6rem;
						margin-top: 0.3rem;
						width: 100%;
						cursor: pointer;
						border-radius: 0.3rem;
						line-height: 0.6rem;
						color: white;
						background: #4876E7;
						font-size: 0.25rem;
						text-align: center;
					}
				}
			}
    }
  }
</style>
