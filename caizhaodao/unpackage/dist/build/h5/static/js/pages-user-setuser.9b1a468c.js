(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-setuser"],{"18be":function(t,e,i){"use strict";var a=i("6bf8"),n=i.n(a);n.a},"6bf8":function(t,e,i){var a=i("f4d8");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("3ffa27dd",a,!0,{sourceMap:!1,shadowMode:!1})},8862:function(t,e,i){"use strict";var a,n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{},[i("v-uni-view",{staticClass:"header"},[i("v-uni-image",{attrs:{src:t.form.headerimg,mode:"aspectFill"}}),i("v-uni-view",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.upimg.apply(void 0,arguments)}}},[t._v("编辑头像")])],1),i("v-uni-view",{staticStyle:{padding:"30rpx","margin-bottom":"150rpx"}},[i("v-uni-view",{staticClass:"tab"},[i("v-uni-view",{staticClass:"left"},[t._v("昵称")]),i("v-uni-view",{staticClass:"right"},[i("v-uni-input",{attrs:{placeholder:"请输入",value:t.form.nickname||"","data-name":"nickname"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.inputchange.apply(void 0,arguments)}}})],1)],1),i("v-uni-view",{staticClass:"tab"},[i("v-uni-view",{staticClass:"left"},[t._v("性别")]),i("v-uni-view",{staticClass:"right"},[i("v-uni-radio-group",{staticClass:"radio-group",attrs:{"data-name":"sex"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.inputchange.apply(void 0,arguments)}}},t._l(t.items,function(e,a){return i("v-uni-radio",{key:a,staticClass:"radio",attrs:{value:e.name,checked:e.checked}},[i("v-uni-text",[t._v(t._s(e.value))])],1)}),1)],1)],1),i("v-uni-view",{staticClass:"tab"},[i("v-uni-view",{staticClass:"left"},[t._v("出生年月")]),i("v-uni-view",{staticClass:"right"},[i("v-uni-picker",{attrs:{mode:"date",value:t.form.birthdate,start:"1900-01-01",end:"2020-01-01","data-name":"birthdate"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.inputchange.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"picker"},[t._v(t._s(t.form.birthdate))])],1)],1)],1),i("v-uni-view",{staticClass:"tab"},[i("v-uni-view",{staticClass:"left"},[t._v("真实姓名")]),i("v-uni-view",{staticClass:"right"},[i("v-uni-input",{attrs:{"data-name":"realname",placeholder:"请输入",value:t.form.realname||""},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.inputchange.apply(void 0,arguments)}}})],1)],1),i("v-uni-view",{staticClass:"tab"},[i("v-uni-view",{staticClass:"left"},[t._v("手机号")]),i("v-uni-view",{staticClass:"right"},[i("v-uni-input",{attrs:{"data-name":"mobile",placeholder:"请输入",value:t.form.mobile||""},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.inputchange.apply(void 0,arguments)}}})],1)],1),i("v-uni-view",{staticClass:"tab"},[i("v-uni-view",{staticClass:"left"},[t._v("地址")]),i("v-uni-view",{staticClass:"right"},[i("v-uni-input",{attrs:{"data-name":"address",placeholder:"请输入",value:t.form.address||""},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.inputchange.apply(void 0,arguments)}}})],1)],1),i("v-uni-view",{staticClass:"tab",staticStyle:{"padding-bottom":"250rpx"}},[i("v-uni-view",{staticClass:"left"},[t._v("职业等级")]),i("v-uni-view",{staticClass:"right"},[i("v-uni-input",{attrs:{"data-name":"occupation",placeholder:"请输入",value:t.form.occupation||""},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.inputchange.apply(void 0,arguments)}}})],1)],1)],1),i("v-uni-view",{staticClass:"towhite",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.setuser.apply(void 0,arguments)}}},[t._v("修改信息")])],1)},s=[];i.d(e,"b",function(){return n}),i.d(e,"c",function(){return s}),i.d(e,"a",function(){return a})},bd2e:function(t,e,i){"use strict";i.r(e);var a=i("8862"),n=i("ed98");for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);i("18be");var o,r=i("f0c5"),u=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"e9842654",null,!1,a["a"],o);e["default"]=u.exports},ce4e:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{user_token:"",items:[{name:"1",value:"男",checked:!0},{name:"2",value:"女",checked:!1}],form:{headerimg:"http://39.98.47.251:91/upload/xcximg/touxiang.png",nickname:"",realname:"",sex:"",mobile:"",birthdate:"2016-09-01",address:"",occupation:""}}},created:function(){},onLoad:function(){var t=this;uni.getStorage({key:"user_token",success:function(e){console.log(e),t.user_token=e.data}}),this.getuser()},methods:{inputchange:function(t){var e=t.currentTarget.dataset.name,i=t.detail.value;console.log(t),"nickname"==e?this.form.nickname=i:"sex"==e?(this.form.sex=i,console.log("修改生日",i)):"birthdate"==e?this.form.birthdate=i:"realname"==e?this.form.realname=i:"mobile"==e?this.form.mobile=i:"address"==e?this.form.address=i:"occupation"==e&&(this.form.occupation=i),console.log(this.form)},getuser:function(){var t=this;uni.request({url:this.$url+"api/user/info"+this.user_token,method:"post",data:{},success:function(e){console.log(e,"用户信息"),1e4==e.data.code?(t.form=e.data.data,2==t.form.sex&&(console.log(1),t.items[0].checked=!1,t.items[1].checked=!0)):t.$msg(e.data.msg)}})},setuser:function(){var t=this;""!=this.form.headerimg&&""!=this.form.nickname&&""!=this.form.sex&&""!=this.form.birthdate&&""!=this.form.mobile&&""!=this.form.address&&""!=this.form.realname&&""!=this.form.occupation?uni.request({url:this.$url+"api/user/save"+this.user_token+"&headerimg="+this.form.headerimg+"&nickname="+this.form.nickname+"&sex="+this.form.sex+"&birthdate="+this.form.birthdate+"&mobile="+this.form.mobile+"&address="+this.form.address+"&realname="+this.form.realname+"&occupation="+this.form.occupation,method:"post",data:this.form,success:function(e){console.log(e,"用户信息"),1e4==e.data.code&&(t.$msg(e.data.msg),uni.navigateBack({delta:1})),t.$msg(e.data.msg)}}):this.$msg("所有信息都是必须的!")},upimg:function(){var t=this;uni.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(e){var i=e.tempFilePaths,a=uni.uploadFile({url:t.$url+"api/upload/index"+t.user_token+"&upload_type=image",filePath:i[0],name:"file",formData:{user:"test"},success:function(e){console.log(e,"图片");var i=JSON.parse(e.data);t.form.headerimg=i.data}});a.onProgressUpdate(function(t){console.log("上传进度"+t.progress),console.log("已经上传的数据长度"+t.totalBytesSent),console.log("预期需要上传的数据总长度"+t.totalBytesExpectedToSend)})},error:function(t){console.log(t)}})}}};e.default=a},ed98:function(t,e,i){"use strict";i.r(e);var a=i("ce4e"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);e["default"]=n.a},f4d8:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.header[data-v-e9842654]{padding:%?30?%}.header>uni-image[data-v-e9842654]{float:left;width:%?150?%;height:%?150?%;border-radius:50%}.header>uni-view[data-v-e9842654]{margin-left:%?180?%;line-height:%?150?%}.tab[data-v-e9842654]{width:100%;height:%?100?%;font-size:%?30?%;margin-bottom:%?5?%;background:#fff;position:relative;overflow:hidden;border-bottom:1px solid #eee}.left[data-v-e9842654]{line-height:%?100?%;color:#8b8b8b}.right[data-v-e9842654]{position:absolute;text-align:right;line-height:%?100?%;right:0;width:100%;height:%?100?%;top:0}uni-input[data-v-e9842654]{text-align:right;line-height:%?100?%;height:%?100?%}.tab .right .radio[data-v-e9842654]:first-of-type{margin-right:%?30?%}.towhite[data-v-e9842654]{position:fixed;bottom:%?30?%;width:%?690?%;left:50%;-webkit-transform:translate(-50%);transform:translate(-50%);background:#106efa;text-align:center;font-size:%?35?%;height:%?100?%;color:#fff;border-radius:%?50?%;line-height:%?100?%}',""])}}]);