<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style  lang="scss">
.clear:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
		content: "";
		display: block;
		height: 0;
		clear:both;
		visibility: hidden;
}
$denglu:#3682c3;
i,em,a{
  font-style:normal;
  text-decoration: none;
}
.el-table td{
  padding:0;
}
button{
  cursor: pointer;
  border: none;
  background: #409EFF;
  color: #fff;
  border-radius: 0.05rem;
}
.btn{
	width: 1rem;
  cursor: pointer;
	height: 0.4rem;
	line-height: 0.4rem;
	font-size: 0.17rem;
	text-align: center;
	background: #409EFF;
	border-radius: 0.1rem;
	color: #fff;
}
.btnmini{
	width: 0.7rem;
  height: 0.3rem;
  line-height: 0.3rem;
  border-radius: 0.02rem;

}
.el-pagination__jump{
  cursor:pointer;
}
.el-date-editor .el-icon-date{
  display: none;
}
.el-date-editor .el-input__inner{
  height:0.3rem !important;
  width:1.5rem !important;
  border: 1px solid #AEAEAE !important;
  color: #000000 !important;
}
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  font-size: 0.16rem;
}
#app {
  height: 100%;
  min-width: 1100px;
	min-height: 630px;
  background: #132035;
}
</style>
