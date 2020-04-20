const Filters = {
	// 小数点大于2位的四舍五入并保留2位小数点
	toFixed2: (val) => {
		var temp = String(val);
		if (temp.indexOf(".") != -1) {
			if (temp.split(".")[1].length > 2) {
				return val.toFixed(2);
			} else {
				return val;
			}
		} else {
			return val;
		}
	},
	//继续添加你需要的处理函数

}
let getDateT = date => {
	var str = "";
	if (date) {
		var arr = date.split("T");
		str = arr[0] + " " + arr[1].split(".")[0];
	}
	return str;
}
let getDateT2 = date => {
	var str = "";
	if (date) {
		var arr = date.split(" ");
		str = arr[0];
	}
	return str;
}
let fixed = date => {
	var str = date.toFixed(2)
	return str;
}
let Status = data => {
	if(data == 1)
	return "待处理"
	else if(data == 2||data == 3||data == 4||data == 5)
	return "上级已处理"
	else if(data == 6)
	return "医生待处理"
	else if(data == 7||data == 8||data == 9||data == 10)
	return "医生已处理"
}
let StatusDingdan = data => {
	if(data == 3||data==8)
	return "待审核发货"
	else if(data == 4||data==9)
	return "待确认"
	else if(data == 5||data==10)
	return "已完成"
}
let power = data=>{
	if(data > 4)
	return "管理员"
	else if(data == 2)
	return "药房系统"
	else if(data == 1)
	return '问诊系统'
}
export default {
	Filters,
	getDateT,
	Status,
	StatusDingdan,
	power,
	fixed,
	getDateT2
}
