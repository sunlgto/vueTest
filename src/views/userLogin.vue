<template>
	<div class="login">
		<section class="form_container">
			<div class="manage_tip">
				<span class="title">测试</span>
			</div>
			
			<Card style="width:320px">
				<div style="text-align:center">
					<img src="https://iview.github.io/dist/76ecb6e76d2c438065f90cd7f8fa7371.png">
					<Form ref="loginUser" :model="loginUser" :rules="rules" inline>
						<Form-item prop="user">
							<Input type="text" v-model="loginUser.userName" placeholder="Username">
								<Icon type="ios-person-outline" slot="prepend"/>
							</Input>
						</Form-item>
						
						<Form-item prop="password" >
							<Input type="password" v-model="loginUser.password" placeholder="Password">
								<Icon type="ios-locked-outline" slot="prepend"/>
							</Input>
						</Form-item>
						
						<Button type="primary" @click="submitForm('loginUser')">登录</Button>
					</Form>
				</div>
			
			</Card>
		
		</section>
	</div>
</template>

<script>

import {setToken} from "@/assets/auth";

export default {
	name: "userLogin",
	data() {
		return {
			fullscreenLoading: false,
			loginUser: {
				userName: "",
				password: ""
			},
			rules: {
				userName: [
					{required: true, message: "用户名不能为空", trigger: "blur"}
				],
				password: [
					{required: true, message: "密码不能为空", trigger: "blur"},
					{min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur"}
				]
			}
		};
	},
	methods: {
		openFullScreen1() {
		
		},
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.$api.userModule.userLogin(this.loginUser).then(res => {
						console.log(res)
						if (res.data.status===1) {
							this.$Message.error(res.data.msg);
							return false;
						}
						// 登录成功
						const token= res.data;
						localStorage.setItem("Admin-Token", token);
						setToken(token);
						// 解析token
						//const decode = jwt_decode(token);
						
						// 存储数据
						//this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
						//this.$store.dispatch("setUserName", this.loginUser.userName);
						// 页面跳转
						this.fullscreenLoading = true;
						//this.$Loading.start();
						setTimeout(() => {
							
							this.fullscreenLoading = false;
							this.$router.push("/homePage");
						}, 2000)
						
					});
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		isEmpty(value) {
			return (
					value === undefined ||
					value === null ||
					(typeof value === "object" && Object.keys(value).length === 0) ||
					(typeof value === "string" && value.trim().length === 0)
			);
		}
	}
};
</script>

<style scoped>
.login {
	position: relative;
	width: 100%;
	height: 100%;
	/*background: url(../assets/bg.jpg) no-repeat center center;*/
	background-size: 100% 100%;
}

.form_container {
	width: 370px;
	height: 210px;
	position: absolute;
	top: 20%;
	left: 34%;
	padding: 25px;
	border-radius: 5px;
	text-align: center;
}

.form_container .manage_tip .title {
	font-family: "Microsoft YaHei";
	font-weight: bold;
	font-size: 26px;
	color: #fff;
}

.loginForm {
	margin-top: 20px;
	background-color: #fff;
	padding: 20px 40px 20px 20px;
	border-radius: 5px;
	box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
	width: 100%;
}

.tiparea {
	text-align: right;
	font-size: 12px;
	color: #333;
}

.tiparea p a {
	color: #409eff;
}
</style>