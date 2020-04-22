<template>
  <div class="Ordinary clear">
    <app_nav ms="/Class" />
    <div class="rigth">
      <app_top />
      <div class="main">
        <div class="table">
          <div class="t_top clear">
            <div class="t_left">
              <span>选择课程类别</span>
              <select v-model="opstion_account" @change="opstionChange" style="color:#777">
                <option value>全部</option>
                <option
                  v-for="(item,index) in categoryOption"
                  :key="index"
                  :value="item.value"
                >{{item.label}}</option>
              </select>
              <span>选择课程专业</span>
              <select style="color:#777" v-model="item_account" placeholder="请选择">
                <option value>全部</option>
                <option
                  v-for="(item,index) in itemOption"
                  :key="index"
                  :value="item.value"
                >{{item.label}}</option>
              </select>
              <input type="text" class="index_B" placeholder="请输入编号或名称" v-model="keyword_account" />
              <select v-model="status_account" style="color:#777">
                <option value>全部</option>
                <option value="1">已上架</option>
                <option value="2">已下架</option>
              </select>
              <button class="btn1" @click="GetClass(1)">查询</button>
            </div>
            <div class="t_rigth">
              <button class="btn2" @click="pop_addClass">添加</button>
            </div>
          </div>
          <div class="t_main">
            <el-table
              border
              :header-cell-style="{'background-color': '#28313F','color': '#fff','height':'0.5rem'}"
              :stripe="true"
              :data="tableData"
              style="width: 100%;max-height:100%"
              :row-style="{'height':'0.4rem'}"
            >
              <el-table-column
                prop="class_id"
                label="课程编号"
                sortable
                header-align="center"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="class_name"
                label="课程名称"
                sortable
                header-align="center"
                align="center"
              ></el-table-column>
              <el-table-column prop="top_category_name" label="类别" header-align="center" align="center"></el-table-column>
              <el-table-column prop="category_name" label="专业" header-align="center" align="center"></el-table-column>
              <el-table-column label="评论列表" header-align="center" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" @click="getDOM(scope),pop_pinglun(1,scope.$index)">查看</el-button>
                </template>
              </el-table-column>
              <el-table-column width="80px" prop="watchnums" label="观看人数" header-align="center" align="center"></el-table-column>
              <el-table-column width="80px" prop="sharennms" label="分享次数" header-align="center" align="center"></el-table-column>
              <el-table-column  prop="create_time" label="创建时间" header-align="center" align="center"></el-table-column>
              <el-table-column label="操作" header-align="center" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" @click="pop_addClass('修改',scope.$index)" type="primary">修改</el-button>
                  <el-button
                    size="mini"
                    @click="RemoveClass(scope.row)"
                    :type="scope.row.status==1?'danger':'success'"
                  >{{scope.row.status==1?'下架':'上架'}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-pagination
            style="text-align: center;height: 0.45rem;"
            v-if="tableData.length>0"
            @current-change="CurrentChange1"
            @size-change="handleSizeChange1"
            :current-page="Page1"
            :page-size="PageSize1"
            :page-sizes="[10, 20, 30]"
            layout="total,sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
      <div class="Popup" v-show="ispinglun">
        <div class="none" @click="pop_pinglun"></div>
        <div v-if="ispinglun" class="p_forms">
          <div class="p-title">评论列表</div>
          <!-- <div class="p-top">总共有{{this.pingLunLength}}条评论</div> -->
          <div>
            <div class="t_tab">
              <el-table
                :header-cell-style="{'display': 'none'}"
                :data="this.AllpinLun"
                style="width: 100%;max-height:100%"
                :row-style="{'height':'0.3rem'}"
              >
                <el-table-column prop="create_time" label="创建时间" header-align="center" align="center">
                  <!-- <template slot-scope="scope">
                    <span>{{scope.row.CreateTime|getDateT}}</span>
                  </template> -->
                </el-table-column>
                <el-table-column prop="nickname" label="姓名" header-align="center" align="center"></el-table-column>
                <el-table-column prop="comment" label="评论内容" header-align="center" align="center"></el-table-column>
              </el-table>
            </div>
            <el-pagination
              style="text-align: center;height: 0.45rem;"
              v-if="tableData.length>0"
              @current-change="CurrentChange2"
              :current-page="Page2"
              :page-size="PageSize2"
              layout="total, prev, pager, next, jumper"
              :total="pingLunLength||0"
            ></el-pagination>
          </div>
        </div>
      </div>
      <div class="Popup" v-show="isaddClass">
        <div class="none"></div>
        <div v-if="isaddClass" class="a_forms">
          <div style="background:#F56C6C" v-if="changeType=='新增'" @click="pop_addClass" class="btn a-btn">取消</div>
          <div v-if="changeType=='新增'" @click="AddClass" class="a-btn btn">确认</div>
          <div
            v-if="changeType=='修改'"
            style="background:#FD296F;"
            class="a-btn btn"
            @click="pop_addClass"
          >放弃修改</div>
          <div v-if="changeType=='修改'" @click="AddClass" class="a-btn btn">确认修改</div>
          <div class="p-title" v-if="changeType=='新增'">新增课程</div>
          <div class="p-title" v-if="changeType=='修改'">修改课程</div>
          <div class="a-info">
            <div class="a-left">
              <div class="a-flex" style="justify-content: space-between;">
                <div class>课程封面</div>
                <div class="btn btnmini" @click="submitImgs('封面')">上传</div>
              </div>
              <div class="a-cover">
                <img v-if="classForm.class_cover==''" src="../assets/Index/noimg.png" alt="封面图片" />
                <img style="width:100%;height:100%;" v-else :src="classForm.class_cover" alt="封面图片" />
              </div>
              <div class="a-flex">
                <div class="a-name">课程名称</div>
                <input
                  type="text"
                  class="flex1"
                  placeholder="请输入课程题目"
                  v-model="classForm.class_name"
                />
              </div>
              <!-- <div class="a-flex">
								<div class="a-name">课程类别 </div>
								<select class="flex1" style="color:#777" v-model="classForm.category_id">
									<option v-for="(item,index) in optionsitem"  :value="item" :key="index">AI开发</option>
								</select>
              </div>-->
              <div class="a-flex">
                <div class="a-name">课程类别</div>
                <el-cascader
                  v-model="cascadervalue"
                  :options="categoryOption"
                  @change="handleChange"
                ></el-cascader>
              </div>
              <div class="a-flex">
                <div class="a-name">课程简介</div>
                <textarea
                  class="flex1"
                  name
                  id
                  cols="30"
                  rows="10"
                  placeholder="请输入课程简介"
                  v-model="classForm.describe"
                ></textarea>
              </div>
              <div class="a-flex">
                <div class="a-name">课程学分</div>
                <input
                  type="number"
                  class="flex1"
                  placeholder="请输入课程学分"
                  v-model="classForm.video_scores"
                />
              </div>
              <div class="a-flex">
                <div class="a-name">课程地址</div>
                <button
                  class="btn btnmini"
                  v-if="videoFlag == false"
                  @click="submitImgs('视频')"
                >{{classForm.video_url==""?'上传':'修改'}}</button>
                <span v-if="videoFlag == true">正在上传...</span>
              </div>
              <div
                v-if="classForm.video_url !='' && videoFlag == false"
                style=" word-break:break-all;word-wrap:break-word;"
              >{{classForm.video_url}}</div>
              <div class="a-flex">
                <div class="a-name">是否会员观看</div>
                <select class="flex1" style="color:#777" v-model="classForm.is_charge">
                  <option value="1">是</option>
                  <option value="2">否</option>
                </select>
              </div>
            </div>
            <div class="a-center">
              <div class="biaoti">课程详情</div>
              <el-upload
                ref="uploads"
                style="height:0;"
                id="upload1"
                class="avatar-uploader"
                :http-request="upload"
                :auto-upload="false"
                action="upload2"
                :on-success="handleSuccess"
                :on-change="submitUpload"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
              ></el-upload>
              <quill-editor
                ref="myQuillEditor"
                class="editor"
                v-model="classForm.details"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @change="onEditorChange($event)"
              ></quill-editor>
            </div>
            <div class="a-right">
              <div class="r-biaoti">
                <div>课程试题</div>
                <div class="btn btnmini" style="margin-left:0.2rem;" @click="pop_addQuestion">新增</div>
              </div>
              <div v-for="(item,index)  in questionList" :key="index" class="query">
                <div style="width:100%;padding:0.1rem 0;text-align:right;">
                  <button
                    style="margin:0 0.2rem;"
                    class="btn btnmini"
                    @click="pop_addQuestion('修改',index)"
                  >修改</button>
                  <button @click="DelQuest(item)" style="background:#FD296F" class="btn btnmini">删除</button>
                </div>
                <div class="query-item" style="justify-content:space-between;">
                  <p>{{index+1}}.{{item.title}}</p>
                  <span style="color:#4484EF;">{{item.set_score}}分</span>
                </div>
                <div class="query-item" v-for="(items,indexs)  in item.options" :key="indexs">
                  <div class="query-select" :class="{'query-true':item.answer==items.power}"></div>
                  <a>{{items.quest}}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="Popup" v-show="isaddQuestion">
        <div class="none" @click="pop_addQuestion"></div>
        <div v-if="isaddQuestion" class="b_forms">
          <div v-if="questType=='修改'" class="b-title">修改试题</div>
          <div v-if="questType=='新增'" class="b-title">新增试题</div>
          <div class="b-info">
            <div>
              <div class="q-name">试题学分</div>
              <el-input
                class="input"
                type="number"
                placeholder="请输入试题学分"
                v-model="setquest.set_score"
              ></el-input>
            </div>
            <div>
              <div class="q-name">试题题目</div>
              <el-input class="input" type="text" v-model="setquest.title"></el-input>
              <div style="width:0.4rem;"></div>
              <button class="btn btnmini" @click="addQuestitem">新增</button>
            </div>
            <div v-for="(item,index) in setquest.options" :key="index">
              <div class="q-name">试题答案{{index+1}}</div>
              <el-input class="input" type="text" v-model="item.quest"></el-input>
              <div
                class="q-sel"
                @click="setdaan(index)"
                :class="{'q-click':setquest.answer==item.power}"
              ></div>
              <button style="background:#FD296F" class="btn btnmini" @click="delQuestitem(index)">删除</button>
            </div>
            <div>
              <div class="q-name"></div>
              <p>勾选蓝色代表正确答案</p>
            </div>
          </div>
          <div style="width:100%;text-align:center;">
            <el-button type="primary" class="b-btn" @click="addQuest">确认</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
  [{ script: "sub" }, { script: "super" }], // 上标/下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
  ["link", "image", "video"] // 链接、图片、视频
];
import app_nav from "../card/Inquirenav.vue";
import app_top from "../card/Inquirehead.vue";
export default {
  name: "Class",
  data() {
    return {
      tableData: [],
      user: {},
      isPopup: false,
      ispinglun: false,
      isaddClass: false, //添加课程
      isaddQuestion: false, //添加题
      category_account: "",
      keyword_account: "",
      name_account: "",
      status_account: "",
      opstion_account: "",
      item_account: "",
      status: "",
      Page1: 1,
      PageSize1: 10,
      Page2: 1,
      PageSize2: 10,
      total: '',
      pinglunTotal: '',
      imgType: "", //上传后方的位置说明
      Video: "", //上传的视频url
      videoFlag: false,
      cascadervalue: [],
      changeType: "", //详情弹窗操作 添加 修改
      questType: "", //试题操作 添加/修改
      setQuestid: "", //添加课程时修改试题的下标
      AllitemOption:[],
      AllpinLun:[],
      pingLunLength:'',
      class_name:'',
      categoryOption: [
        {
          value: "zhinan",
          label: "指南",
          category_id: "1",
          category_name: "数字技能",
          children: [
            {
              value: "zhinan",
              label: "指南"
            }
          ]
        }
	  ], // 页面父选项
	  bodyDeleta: '',
      itemOption: [], // 页面子选项
      classForm: {
        class_name: "",
        category_id: "",
        video_scores: "",
        video_url: "",
        video_length: "",
        class_cover: "",
        describe: "",
        details: "",
        is_charge: 1,
        category_id: "", //课程类别
        status: 1, //上下架
        uploader: "",
        is_recommend: 0 //推荐
        
      },
      questionList: [
        // {
        // 	class_id:'',
        // 	title:'',
        // 	answer:'',
        // 	set_score:'',
        // 	option:[
        // 		{ id: 1, quest:'有障碍的一方先行',power:1,},
        // 		{ id: 1, quest:'无障碍的一方先行',power:2},
        // 		{ id: 1, quest:'大车让小车先行',power:4},
        // 		{ id: 1, quest:'小车让大车先行',power:8},
        // 	]
        // },
        // {
        // 	title:'',
        // 	answer:'',
        // 	set_score:'',
        // 	option:[
        // 		{ id: 1, quest:'有障碍的一方先行',power:1,},
        // 		{ id: 1, quest:'无障碍的一方先行',power:2},
        // 		{ id: 1, quest:'大车让小车先行',power:4},
        // 		{ id: 1, quest:'小车让大车先行',power:8},
        // 	]
        // }
      ],
      setquest: {
        title: "",
        answer: "",
        set_score: "",
        options: [
          { id: 1, quest: "", power: 1 },
          { id: 1, quest: "", power: 2 },
          { id: 1, quest: "", power: 4 },
          { id: 1, quest: "", power: 8 }
        ]
      },
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function(value) {
                if (value) {
                  this.imgType = "图片";
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click(); //自定义元素的点击事件
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      },
      uploadUrl: "",
	  value: ""
      //https://blog.csdn.net/lyj2018gyq/article/details/82585194
      //https://blog.csdn.net/qq_41662119/article/details/86183502
    };
  },
  created() {
    this.GetCategory();
    this.GetClass(1);

  },
 
  //深度监听 tableData变化
  // watch: {
	//   tableData: {
	// 	  deep: true,
	// 	  handler(v) {
	// 		  console.log('监听', v)
	// 	  }
	//   }
  // },
  
  mounted() {},
  components: {
    app_nav,
    app_top
  },
  methods: {
      GetPingLun(cn){
      var that=this
      // if(PageSize2>10){
        
      // }
      var pages=null
      that.$axios
        .post(
          "comment/index?admin_token=" + sessionStorage.getItem("admin_token"),
          that.$qs.stringify({
            
            keyword:this.class_name,
          })
        )
        .then(res => {
          if (res.data.code == 10000) {
            that.AllpinLun=res.data.data.list
            this.pingLunLength=that.AllpinLun.length
             this.AllpinLun=this.AllpinLun.slice(this.PageSize2*(this.Page2-1),this.PageSize2*(this.Page2))
            // if(this.pingLunLength>10){
            //   this.pinglunTotal=this.pingLunLength
            // }
          } else if (res.data.code == 10002) {
            this.$message.error("登录信息失效，请重新登录!");
            this.$router.push("/Login");
          }
        })
    },
    getDOM(scope){

      if(scope!=undefined){
        this.class_name=scope.row.class_name
          console.log('scope.row',scope.row)    
      }
       this.GetPingLun(this.class_name)
          
      }
    ,
    //开关弹窗
    Popups() {
      this.isPopup = !this.isPopup;
    },
    pop_pinglun(a, b) {
      if (a) {
        this.user = this.tableData[b];
      } else {
        this.user = null;
      }
      this.ispinglun = !this.ispinglun;
    },
    pop_addClass(a, b) {
      var that = this;
      if (a == "修改") {
    this.classForm = this.tableData[b];
    this.bodyDeleta=this.classForm.details
        this.changeType = a;
        that.categoryOption.forEach(el => {
          if (el.children) {
            el.children.forEach(arr => {
              if (arr.category_id == that.classForm.category_id) {
                that.cascadervalue = [el.category_id, arr.category_id];
              }
            });
          }
        });
        that.GetClassQuest();
      } else {
        this.changeType = "新增";
        this.classForm = {
          class_name: "",
          category_id: "",
          video_scores: "",
          video_url: "",
          video_length: "",
          class_cover: "",
          describe: "",
          is_charge: 1,
          category_id: "", //课程类别
          status: 1, //上下架
          uploader: "",
          details: "",
          is_recommend: 2 //推荐
		};
  
    this.bodyDeleta=this.classForm.details
      this.$set(this.classForm, 'details', this.bodyDeleta)
        this.questionList = [];
      }
      this.isaddClass = !this.isaddClass;
    },
    pop_addQuestion(a, b) {
      if (a == "修改") {
        this.questType = "a";
        this.setquest = this.questionList[b];
        this.setQuestid = b;
      } else {
        this.questType = "新增";
        this.setquest = {
          class_id: "",
          title: "",
          answer: "",
          set_score: "",
          options: []
        };
      }
      this.isaddQuestion = !this.isaddQuestion;
    },
    DelQuest(a, index) {
      var that = this;
      if (that.changeType == "修改") {
        this.$confirm("确认删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            that.$axios
              .post(
                "exam/del?admin_token=" + sessionStorage.getItem("admin_token"),
                that.$qs.stringify({
                  id: a.id
                })
              )
              .then(res => {
                if (res.data.code == 10000) {
                  that.$message({
                    message: "删除成功",
                    type: "success"
                  });
                  that.GetClassQuest();
                } else {
                  that.$message.error(res.data.msg);
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        that.questionList.splice(index, 1);
      }
    },
    CurrentChange1(val) {
      this.Page1 = val;

      this.GetClass();
    },
    handleSizeChange1(val) {
      this.PageSize1 = val;
      this.GetClass();
    },
    CurrentChange2(num) {
      this.Page2=num;
      this.GetPingLun(this.class_name)
      
    },
    handleSizeChange2(num) {
      this.PageSize2 = num;
      this.GetPingLun(this.class_name)
      
    },
    GetClassQuest() {
      var that = this;
      that.$axios
        .post(
          "exam/index?admin_token=" + sessionStorage.getItem("admin_token"),
          that.$qs.stringify({
            class_id: that.classForm.class_id
          })
        )
        .then(res => {
          if (res.data.code == 10000) {
            res.data.data.list.forEach(el => {
              el.options = JSON.parse(el.options);
            });
            that.questionList = res.data.data.list;
          } else {
            that.$message.error(res.data.msg);
          }
        });
    },
    GetCategory() {
      var that = this;
      that.$axios
        .post(
          "category/info?admin_token=" + sessionStorage.getItem("admin_token"),
          that.$qs.stringify({
            class_id: ""
          })
        )
        .then(res => {

          if (res.data.code == 10000) {
            that.categoryOption = res.data.data.top_menu;
              for(var i=0;i<that.categoryOption.length;i++){
                if(typeof that.categoryOption[i].children=='object'){
                  for(var j=0;j<that.categoryOption[i].children.length;j++){
                    let obj = {
                      value: that.categoryOption[i].children[j].value,
                      label: that.categoryOption[i].children[j].label
                    }
                    this.AllitemOption.push(obj)
                    that.itemOption = this.AllitemOption
                  }
                }
              }
          }
        });
    },
    opstionChange() {
      let that = this;
      let e = that.opstion_account;
      if (e == "") {
        that.itemOption =this.AllitemOption;
        that.item_account = "";
        return false;
      }
      that.categoryOption.forEach(el => {
        if (e == el.value) {
          console.log('el.value:',el.value)
          
          if (el.children) {
            
            that.itemOption = el.children;
          } else {
            that.itemOption = [];
            that.item_account = "";
          }
          return;
        }
      });
    },
    handleChange(e) {
      console.log(e);
    },
  
    GetClass(ev,a) {
      let role_name=sessionStorage.getItem("role_id");
      console.log(role_name)
      var that = this;
      console.log('that.keyword_account',that.keyword_account)
      if (a == 1) {
        that.Page1 = 1;
      }
      let category_id = [];
      if (that.item_account > 0) {
        category_id = that.item_account;
      } else if (that.opstion_account > 0 && that.itemOption.length < 1) {
        that.tableData = AllitemOption;
        that.total = 0;
        return;
      } else if (that.opstion_account > 0 && that.itemOption.length > 0) {
        that.itemOption.forEach(el => {
          category_id.push(el.category_id);
        });
        category_id = category_id.join(",");
      }
      that.$axios
        .post(
          "classes/index?admin_token=" + sessionStorage.getItem("admin_token"),
          that.$qs.stringify({
            category_id: category_id,
            page: that.Page1,
            num: that.PageSize1,
            keyword: that.keyword_account,
            status: that.status_account
          })
        )
        .then(res => {
          if (res.data.code == 10000) {
      that.tableData = res.data.data.list;
         console.log('查询结果',that.tableData)
            that.total = res.data.data.total_num;
          } else if (res.data.code == 10002) {
            this.$message.error("登录信息失效，请重新登录!");
            this.$router.push("/Login");
          }
        });
        
    },
    // 富文本框
    onEditorBlur(e) {
      console.log(e);
    },
    onEditorFocus(e) {
      //获得焦点事件
      console.log(e);
    },
    onEditorChange(e) {
      //内容改变事件
	  console.log(e);
	  this.classForm.details = this.bodyDeleta
    },
    handleSuccess(response, file, fileList) {
      //console.log(response);
      //console.log(file, fileList);
    },
    submitUpload() {
      this.$refs.uploads.submit();
    },
    beforeAvatarUpload(file) {
      console.log(file, "上传前");
      const isJPG =
        file.type === "image/jpeg" ||
        "image/gif" ||
        "image/png" ||
        "video/mp4" ||
        "video/ogg" ||
        "video/flv" ||
        "video/avi" ||
        "video/wmv" ||
        "video/rmvb";
      const isLt2M = file.size / 1024 / 1024 < 20000;

      // if (!isJPG) {
      // 	this.$message.error("上传图片只能是图片格式!");
      // }
      // if (!isLt2M) {
      // 	this.$message.error("上传图片大小不能超过 2MB!");
      // }
      return isJPG && isLt2M;
    },
    submitImgs(a) {
      this.imgType = a;
      document.querySelector(".avatar-uploader input").click();
    },
    upload(file) {
      console.log("上传中...");
      console.log(file);
      let that = this;
      this.videoFlag = true;
      var formData = new FormData();
      formData.append("file", file.file);
      formData.append("upload_type", file.file.type.split("/")[0]);
      if (that.imgType == "视频") {
        var videos = URL.createObjectURL(file.file);
        var audioElement = new Audio(videos);
        var duration;
        audioElement.addEventListener("loadedmetadata", function(_event) {
          duration = audioElement.duration;
          console.log(duration);

          that.classForm.video_length = that.formatSeconds(duration);
        });
        if (file.file.type.split("/")[0] != "video") {
          that.$message.error("请上传视频");
        }
      } else {
        if (file.file.type.split("/")[0] != "image") {
          that.$message.error("请上传图片");
        }
      }
      that.$axios
        .post(
          "upload/index?admin_token=" + sessionStorage.getItem("admin_token"),
          formData,
          {
            headers: {
              "Content-type": "multipart/form-data"
            }
          }
        )
        .then(res => {
          if (res.data.code == 10000) {
            if (that.imgType == "视频") {
              that.classForm.video_url = res.data.data;
            } else if (that.imgType == "封面") {
              that.classForm.class_cover = res.data.data;
            } else {
              let quill = this.$refs.myQuillEditor.quill;
              let length = quill.getSelection().index;
			  // 插入图片  res.url为服务器返回的图片地址
			this.bodyDeleta = this.classForm.details
			  quill.insertEmbed(length, "image", res.data.data);
            }
          } else {
            that.$message.error(res.data.msg);
          }
          that.videoFlag = false;
          that.$refs.uploads.clearFiles();
        });
    },
    setdaan(y) {
      //修改正确答案
      this.setquest.answer = Math.pow(2, y); //2的y次幂
    },
    addQuestitem() {
      //添加修改的选项
      var that = this;
      var num = that.setquest.options.length;
      that.setquest.options.push({ id: 1, quest: "", power: Math.pow(2, num) });
      console.log(that.setquest.options);
    },
    delQuestitem(index) {
      //删除修改的选项
      var that = this;
      if (that.setquest.set_score == Math.pow(2, index)) {
        that.setquest.set_score = "";
      }
      that.setquest.options.splice(index, 1);
      for (let i = 0; i < that.setquest.options.length; i++) {
        that.setquest.options[i].power = Math.pow(2, i);
      }
      console.log(that.setquest.options);
    },
    addQuest() {
      //添加题
      var that = this;
      //非空验证
      console.log(that.setquest);
      if (
        that.setquest.answer == "" ||
        that.setquest.title == "" ||
        that.setquest.set_score == "" ||
        that.setquest.options.length < 3
      ) {
        that.$message.error("请输入完整信息");
        return false;
      }
      that.setquest.options.forEach(el => {
        if (el.quest == "") {
          that.$message.error("请输入完整信息");
          return false;
        }
      });
      if (that.changeType == "修改") {
        let obj = that.copy(that.setquest);
        obj.options = JSON.stringify(obj.options);
        if (that.questType == "修改") {
          that.$axios
            .post(
              "exam/save?admin_token=" + sessionStorage.getItem("admin_token"),
              that.$qs.stringify(obj)
            )
            .then(res => {
              if (res.data.code == 10000) {
                that.$message({
                  message: "修改成功",
                  type: "success"
                });
                that.pop_addQuestion();
              } else if (res.data.code == 10002) {
                this.$message.error("登录信息失效，请重新登录!");
                this.$router.push("/Login");
              }
            });
        } else {
          obj.class_id = that.classForm.class_id;
          that.$axios
            .post(
              "exam/add?admin_token=" + sessionStorage.getItem("admin_token"),
              that.$qs.stringify(obj)
            )
            .then(res => {
              if (res.data.code == 10000) {
                that.$message({
                  message: "修改成功",
                  type: "success"
                });
                that.pop_addQuestion();
              } else if (res.data.code == 10002) {
                this.$message.error("登录信息失效，请重新登录!");
                this.$router.push("/Login");
              } else {
                that.$message.error(res.data.msg);
              }
            });
        }
        that.$axios
          .post(
            "exam/index?admin_token=" + sessionStorage.getItem("admin_token"),
            that.$qs.stringify({
              class_id: that.classForm.class_id
            })
          )
          .then(res => {
            console.log(res);
            if (res.data.code == 10000) {
              res.data.data.list.forEach(el => {
                el.options = JSON.parse(el.options);
              });
              that.questionList = res.data.data.list;
            } else if (res.data.code == 10002) {
              this.$message.error("登录信息失效，请重新登录!");
              this.$router.push("/Login");
            } else {
              that.$message.error(res.data.msg);
            }
          });
      } else {
        if (that.questType == "修改") {
          that.questionList[setQuestid] = that.setquest;
          that.pop_addQuestion();
        } else {
          that.questionList.push(that.setquest);
          that.pop_addQuestion();
        }
      }
    },
    AddClass() {
      var that = this;
      if (that.cascadervalue[1]) {
        that.classForm.category_id = that.cascadervalue[1];
        console.log(that.category_id);
      } else {
        that.$message.error("请选择专业");
      }
      console.log(that.classForm);
      if (
        that.classForm.class_name == "" ||
        that.classForm.category_id == "" ||
        that.classForm.video_scores == "" ||
        that.classForm.video_url == "" ||
        that.classForm.video_length == "" ||
        that.classForm.class_cover == "" ||
        that.classForm.is_charge == "" ||
        that.classForm.details == ""
      ) {
        that.$message.error("请填写完整数据");
      }
      let arr = "确认新增课程吗";
      let url = "classes/add?admin_token=";
      if (that.changeType == "修改") {
        arr = "确认修改课程吗";
        url = "classes/save?admin_token=";
      }
      var form = that.classForm;
      this.$confirm(arr, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that.$axios
            .post(
              url + sessionStorage.getItem("admin_token"),
              that.$qs.stringify(form)
            )
            .then(res => {
              console.log(res);
              if (res.data.code == 10000) {
                if (that.changeType == "修改") {
                  that.$message({
                    message: res.data.msg,
                    type: "success"
                  });
                  that.GetClass();
                  that.pop_addClass();
                  return;
                }
                if (that.questionList.length > 0) {
                  let num = 0;
                  that.questionList.forEach(element => {
                    element.options = JSON.stringify(element.options);
                    element.class_id = res.data.data.class_id;
                    that.$axios
                      .post(
                        "exam/add?admin_token=" +
                          sessionStorage.getItem("admin_token"),
                        that.$qs.stringify(element)
                      )
                      .then(res => {
                        if (res.data.code == 10000) {
                          num++;
                        } else if (res.data.code == 10002) {
                          this.$message.error("登录信息失效，请重新登录!");
                          this.$router.push("/Login");
                        } else {
                          that.$message.error(res.data.msg);
                        }
                      });
                    if (num == that.questionList.length) {
                      that.$message({
                        message: "添加成功",
                        type: "success"
                      });
                      that.GetClass();
                      that.pop_addClass();
                    }
                  });
                } else {
                  that.$message({
                    message: "添加成功",
                    type: "success"
                  });
                }
              } else if (res.data.code == 10002) {
                this.$message.error("登录信息失效，请重新登录!");
                this.$router.push("/Login");
              } else {
                that.$message.error(res.data.msg);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    RemoveClass(e) {
      var that = this;
      this.$confirm("确认修改吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var obj = that.copy(e);
          obj.status = e.status == 0 ? 1 : 0;
          that.$axios
            .post(
              "classes/save?admin_token=" +
                sessionStorage.getItem("admin_token"),
              that.$qs.stringify(obj)
            )
            .then(res => {
              console.log(res);
              if (res.data.code == 10000) {
                that.$message({
                  message: "修改成功",
                  type: "success"
                });
                that.GetClass();
              } else if (res.data.code == 10002) {
                this.$message.error("登录信息失效，请重新登录!");
                this.$router.push("/Login");
              } else {
                that.$message.error(res.data.msg);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    copy(obj) {
      return Object.assign({}, obj);
    }
  }
};
</script>

<style lang="scss" scoped>
.clear:after {
  /*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.bg {
  background: #4a93f6 !important;
}
.color {
  color: #fff !important;
}
.t_top >>> .el-input__inner {
  border: none;
  outline: none;
  padding: 0;
  height: 0.29rem;
  font-size: 0.14rem;
  color: #000000;
}
.t_top >>> .el-cascader {
  line-height: 0.29rem;
  padding: 0 !important;
  border: none !important;
}
.el-cascader >>> .el-input__suffix {
  display: none;
}
.el-cascader >>> .el-input {
  border: 1px solid #aeaeae;
}
.a-flex >>> .el-input {
  height: 0.29rem;
  border: none;
}
.a-flex >>> .el-cascader {
  line-height: 100%;
  border: 1px solid #aeaeae;
}
.a-flex >>> .el-input__inner {
  outline: none;
  padding: 0;
  height: 0.29rem;
  font-size: 0.14rem;
  color: #000000;
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

    > .main {
      margin-top: 0.85rem;
      width: 100%;
      padding: 0.2rem;

      .table {
        width: 100%;
        height: calc(100vh - 1.25rem);
        background: white;
        overflow: auto;
        padding: 0.3rem 0.4rem;
        display: flex;
        flex-direction: column;
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

          > .t_left {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            > div,
            > input,
            > select {
              height: 0.3rem;
              width: 1.5rem;
              border: 1px solid #aeaeae;
              padding: 0.05rem;
              text-align: center;
              font-size: 0.14rem;
              margin-right: 0.4rem;
            }

            > .input {
              width: 1.5rem;
              display: inline-block;
              background: #fff;
              vertical-align: top;
              height: 0.3rem;
              border: none;
              top: 47%;
              padding: 0;

              .el-input {
                width: 1.5rem;
                height: 0.3rem;
              }

              .el-select {
                width: 100%;

                .el-input__inner {
                  border: none;
                  outline: none;
                  padding: 0;
                  height: 0.3rem;
                }
              }
            }

            .index_B {
              left: 2rem;
              width: 1.8rem !important;
            }

            .input {
              left: 7.3rem;
            }

            > span {
              font-size: 0.16rem;
            }

            > select {
              left: 5.3rem;
              padding: 0;
              line-height: 0.35rem;
            }
          }
          .t_rigth {
            text-align: right;
            position: absolute;
            right: 0;
            height: 100%;
            top: 0;
          }
        }

        .t_main {
          font-size: 0.16rem;
          border: 1px #aeaeae solid;
          flex: 1;
          .i_table {
            text-align: center;
          }
        }
      }
    }
    > .Popup {
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
.p_forms {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 7.82rem;
  height: 6.5rem;
  background: white;
  > .p-title {
    font-size: 0.2rem;
    text-align: center;
    margin: 0.12rem 0;
  }
  > .p-top {
    font-size: 0.16rem;
    margin-left: 0.12rem;
    margin-bottom: 0.12rem;
  }
}
.a_forms {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 15rem;
  height: 8rem;
  background: white;
  font-size: 0.16rem;
  > .a-btn {
    float: right;
    margin-right: 0.2rem;
    margin-top: 0.2rem;
  > .c-btn{
    float: right;
    margin-right: 0.2rem;
    margin-top: 0.2rem;
    background: red !important;
  }
  }
  > .p-title {
    font-size: 0.16rem;
    margin: 0.12rem;
    padding-left: 0.1rem;
    border-left: 5px #4484ef solid;
  }
  .a-flex {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    .flex1 {
      flex: 1;
    }
  }
  > .a-info {
    width: 100%;
    display: flex;
    justify-content: space-around;
    > div {
      width: 30%;
      height: calc(100%-0.5rem);
      .a-flex {
        margin: 0.1rem 0;
      }
      .a-cover {
        width: 100%;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background: #e6e5e5;
        border-radius: 0.24rem;
        > img {
          width: 2rem;
          height: 1.8rem;
        }
      }
      .a-name {
        padding-right: 0.2rem;
      }
      input,
      select {
        height: 0.3rem;
      }
      input,
      textarea {
        padding-left: 0.05rem;
      }
    }
    .biaoti {
      height: 0.5rem;
      line-height: 0.5rem;
    }
  }
  .a-right {
    height: 5rem;
    overflow: auto;
    .r-biaoti {
      display: flex;
      align-items: center;
    }
    .query-item {
      color: rgba(124, 124, 124, 1);
      font-size: 0.14rem;
      height: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .query-select {
        background: #ccc;
        height: 0.1rem;
        width: 0.1rem;
        border-radius: 50%;
        margin: 0 0.1rem;
      }
      .query-true {
        background: #106efa;
      }
    }
  }
}
.b_forms {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 5.34rem;
  max-height: 6rem;
  overflow: auto;
  background: white;
  font-size: 0.16rem;
  .b-title {
    font-weight: bold;
    text-align: center;
    margin: 0.19rem 0;
  }
  .b-info {
    padding: 0.23rem;
    > div {
      height: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      > .q-name {
        width: 1rem;
      }
      .input {
        width: 2.5rem;
      }

      .q-sel {
        background: #ccc;
        height: 0.2rem;
        width: 0.2rem;
        border-radius: 50%;
        margin: 0 0.1rem;
      }
      .q-click {
        background: #4484ef;
      }
    }
  }
  .b-btn {
    width: 3rem;
    margin-bottom: 0.2rem;
  }
}
.editor {
  width: 100%;
  height: 5rem;
}
</style>
