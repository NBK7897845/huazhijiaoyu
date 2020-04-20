exports.install = function (Vue, options) {
  Vue.prototype.newTime = function (){//全局函数1
    //创建当前系统时间的Date对象
    var dateObj = new Date();
    //获取完整年份值
    var year = dateObj.getFullYear();
    //获取月份
    var month = dateObj.getMonth() + 1;
    //获取月份中的日
    var date = dateObj.getDate();
    //获取星期值
    var day = dateObj.getDay();
    var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    //根据星期值，从数组中获取对应的星期字符串
    var week = weeks[day];
    //获取小时
    var hour = dateObj.getHours();
    //获取分钟
    var minute = dateObj.getMinutes();
    //获取秒钟
    var second = dateObj.getSeconds();
    //如果月、日、时、分、秒的值小于10，在前面补0
    if (month < 10) {
        month = "0" + month;
    }
    if (date < 10) {
        date = "0" + date;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (second < 10) {
        second = "0" + second;
    }
    global_user_date = year + "-" + month + "-" + date;
    return year + "年" + month + "月" + date + "日 " + week + " " + hour + ":" + minute + ":" + second;
   };
   Vue.prototype.newData = function (){//全局函数1
    //创建当前系统时间的Date对象
    var dateObj = new Date();
    //获取完整年份值
    var year = dateObj.getFullYear();
    //获取月份
    var month = dateObj.getMonth() + 1;
    //获取月份中的日
    var date = dateObj.getDate();
    //获取星期值
    var day = dateObj.getDay();
    var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    //根据星期值，从数组中获取对应的星期字符串
    var week = weeks[day];
    //获取小时
    var hour = dateObj.getHours();
    //获取分钟
    var minute = dateObj.getMinutes();
    //获取秒钟
    var second = dateObj.getSeconds();
    //如果月、日、时、分、秒的值小于10，在前面补0
    if (month < 10) {
        month = "0" + month;
    }
    if (date < 10) {
        date = "0" + date;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (second < 10) {
        second = "0" + second;
    }
    global_user_date = year + "-" + month + "-" + date+ " " + hour + ":" + minute + ":" + second;
    return global_user_date;
   };
   Vue.prototype.getSelectTime = function (e){//全局函数1
        //创建当前系统时间的Date对象
        var dateObj = new Date(e);
        //获取完整年份值
        var year = dateObj.getFullYear();
        //获取月份
        var month = dateObj.getMonth() + 1;
        //获取月份中的日
        var date = dateObj.getDate();
        //获取星期值
        if (month < 10) {
            month = "0" + month;
        }
        if (date < 10) {
            date = "0" + date;
        }
        global_user_date = year + "-" + month + "-" + date;
        return global_user_date;
   };
    Vue.prototype.text2 = function (){//全局函数2
        alert('执行成功2');
    };
    Vue.prototype.tests = function (a,b){//全局函数2
        if(a=='手机'){
            var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(b)) {
                return false;
            } else {
                return true;
            }
        }
    };
    Vue.prototype.formatSeconds = function (value) {
        let result = parseInt(value)
        let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
        let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
        let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
        if(h>0){
            result = `${h}:${m}:${s}`
        }else{
            result = `${m}:${s}`
        }
        
        return result
    }
    Vue.prototype.yymmdd = function (value) {
        let result = '';
        if(value){
            var dateObj = new Date(value);
            //获取完整年份值
            var year = dateObj.getFullYear();
            //获取月份
            var month = dateObj.getMonth() + 1;
            //获取月份中的日
            var date = dateObj.getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (date < 10) {
                date = "0" + date;
            }
            result = year+"-"+month+"-"+date
        }

        return result
    }
};

