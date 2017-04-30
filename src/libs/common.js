export const types = {
	"生活电器": ["生活电器"],
	"电脑办公": ["电脑办公"],
	"衣物服饰": ["衣物服饰"],
	"酒水饮料": ["酒水饮料"],
	"食品生鲜": ["食品生鲜"]
}

export const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: 20,
	},
	formItem: {
		width: 300,
	}
}

export const titleMap = {
	"": "入库",
	"#putaway": "入库管理",
	"#putawayEnsure": "入库管理",
	"#putawayEnsure": "入库管理",
	"#move": "移动管理",
	"#moveEnsure": "移动管理",
	"#moveManage": "移动管理",
	"#out": "出库管理",
	"#outEnsure": "出库管理",
	"#outManage": "出库管理",
}

export const formName = {
	"id": "物资编号",
	"type": "物资类型",
	"description": "物资描述",
	"import_time": "入库时间",
	"estimated_export_time": "估计出库时间",
	"num": "物资数量",
	"id": "物资编号",
	"to": "目的位置",
	"from": "原始位置",
}

export const changeHash = function(hash) {
	window.location.hash = hash;
}

export const parseParams = function() {
	console.log(window.location.hash.slice(1))
	return window.location.hash.slice(1);
}

export const parsetime = function(time, type = 1) {
	if (time === 0)
		return '';
	let t = new Date(time);
	if (type)
		return t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds();
	else
		return t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate();
}

export const parsePlace = function(task) {
	if (task.repository_id === -1 || task.repository === 0)
		return "----";
	return task.repository_id + ' 仓 ' + task.location_id + ' 架 ' + task.layer + ' 层 ';
}

export const parseTaskPlace = function(task) {
	let from = task.from_repository + ' 仓 ' + (task.from_location + 1) + ' 架 ' + (task.from_layer + 1) + ' 层 ';
	let to = task.to_repository + ' 仓 ' + (task.to_location + 1) + ' 架 ' + (task.to_layer + 1) + ' 层 ';
	if (task.to_repository === 0 || task.to_repository === -1)
		to = "----";
	if (task.from_repository === 0 || task.from_repository === -1)
		from = "----";
	return [from, to];
}

export const objIsEmpty = function(obj) {
	console.log(obj)
	let emptyKey = [];
	for (let i in obj) {
		if (obj[i] === 0 || obj[i] === '0')
			continue;
		if (i === 'type') {
			if (!obj[i][0])
				emptyKey.push('type')
			if (!obj[i][1])
				emptyKey.push('detail')
		}
		if (!obj[i])
			emptyKey.push(i);
	}
	return [!!emptyKey.length, emptyKey];
}

export const randomNum = function(from, to) {
	return Math.floor(Math.random() * (to - from) + from);
}

export const makeId = function() {
	let d = new Date();
	let year = d.getFullYear().toString().slice(2, 4);
	let month = (d.getMonth() + 1).toString();
	if (month.length === 1) {
		month = '0' + month;
	}
	let day = d.getDay().toString();
	if (day.length === 1) {
		day = '0' + day;
	}
	let second = d.getSeconds().toString();
	if (second.length === 1) {
		second = '0' + second;
	}
	return year + month + day + randomNum(1000, 9999) + second;
}

export const copyObj = function(obj) {
	let copy = {};
	for (let i in obj) {
		copy[i] = boj[i];
	}
	return copy;
}

export const tableToExcel = function(table) {
	var oXL = new ActiveXObject("Excel.Application");
	//创建AX对象excel
	var oWB = oXL.Workbooks.Add();
	//获取workbook对象
	var oSheet = oWB.ActiveSheet;
	//激活当前sheet
	var sel = document.body.createTextRange();
	sel.moveToElementText(table);
	//把表格中的内容移到TextRange中   
	sel.select();
	//全选TextRange中内容   
	sel.execCommand("Copy");
	//复制TextRange中内容    
	oSheet.Paste();
	//粘贴到活动的EXCEL中         
	oXL.Visible = true;
	//设置excel可见属性  
}

export const testTask = [{
	"_id": "dsafdsadsaf32413141kl2",
	"action": 500,
	"status": 1,
	"publish_time": "2017-04-06T04:57:36.801Z",
	"start_time": "2017-04-06T04:57:36.801Z",
	"end_time": "2017-04-06T04:57:36.801Z",
	"remark": "",
	"staff": {
		"_id": "dsafdsadsaf32413141kl2",
		"name": "因幡帝",
		"account": "inaba_tewi",
		"passwd": "123456",
		"sex": 0,
		"age": 222,
		"permission": 1,
		"signup_time": 1491451593158,
		"last_login_time": 1491451593158
	},
	"material": {
		"_id": "dsafdsadsaf32413141kl2",
		"id": 1491451593158,
		"type": "生活电器-生活电器",
		"description": "wonderful repository",
		"import_time": "2017-04-06T04:57:36.801Z",
		"estimated_export_time": "2017-04-06T04:57:36.801Z",
		"height": 1,
		"width": 1,
		"length": 2,
		"status": 300,
		"from_repository": -1,
		"from_location": 0,
		"from_layer": 0,
		"to_repository": 5,
		"to_location": 7,
		"to_layer": 2,
		"last_migrations": "1234",
		"location_update_time": "2017-04-06T04:57:36.801Z"
	}
}, {
	"_id": "dsafdsadsaf32413141kl2",
	"action": 500,
	"status": 1,
	"publish_time": "2017-04-06T04:57:36.801Z",
	"start_time": "2017-04-06T04:57:36.801Z",
	"end_time": "2017-04-06T04:57:36.801Z",
	"remark": "",
	"staff": {
		"_id": "dsafdsadsaf32413141kl2",
		"name": "因幡帝",
		"account": "inaba_tewi",
		"passwd": "123456",
		"sex": 0,
		"age": 222,
		"permission": 1,
		"signup_time": 1491451593158,
		"last_login_time": 1491451593158
	},
	"material": {
		"_id": "dsafdsadsaf32413141kl2",
		"id": 1491451593200,
		"type": "酒水饮料-酒水饮料",
		"description": "wonderful repository",
		"import_time": "2017-04-05T04:57:36.801Z",
		"estimated_export_time": "2017-04-06T04:57:36.801Z",
		"height": 1,
		"width": 1,
		"length": 2,
		"status": 300,
		"from_repository": -1,
		"from_location": 1,
		"from_layer": 0,
		"to_repository": 1,
		"to_location": 1,
		"to_layer": 0,
		"last_migrations": "1234",
		"location_update_time": "2017-04-06T04:57:36.801Z"
	}
}]

export const testMove = [{
	"_id": "dsafdsadsaf32413141kl2",
	"action": 500,
	"status": 1,
	"publish_time": "2017-04-06T04:57:36.801Z",
	"start_time": "2017-04-06T04:57:36.801Z",
	"end_time": "2017-04-06T04:57:36.801Z",
	"remark": "",
	"staff": {
		"_id": "dsafdsadsaf32413141kl2",
		"name": "因幡帝",
		"account": "inaba_tewi",
		"passwd": "123456",
		"sex": 0,
		"age": 222,
		"permission": 1,
		"signup_time": 1491451593158,
		"last_login_time": 1491451593158
	},
	"material": {
		"_id": "dsafdsadsaf32413141kl2",
		"id": 1491451599188,
		"type": "生活电器-生活电器",
		"description": "wonderful repository",
		"import_time": "2017-04-06T04:57:36.801Z",
		"estimated_export_time": "2017-04-06T04:57:36.801Z",
		"height": 1,
		"width": 1,
		"length": 2,
		"status": 300,
		"from_repository": 2,
		"from_location": 7,
		"from_layer": 0,
		"to_repository": 1,
		"to_location": 1,
		"to_layer": 4,
		"last_migrations": "1234",
		"location_update_time": "2017-04-06T04:57:36.801Z"
	}
}, {
	"_id": "dsafdsadsaf32413141kl2",
	"action": 500,
	"status": 1,
	"publish_time": "2017-04-06T04:57:36.801Z",
	"start_time": "2017-04-06T04:57:36.801Z",
	"end_time": "2017-04-06T04:57:36.801Z",
	"remark": "",
	"staff": {
		"_id": "dsafdsadsaf32413141kl2",
		"name": "因幡帝",
		"account": "inaba_tewi",
		"passwd": "123456",
		"sex": 0,
		"age": 222,
		"permission": 1,
		"signup_time": 1491451593158,
		"last_login_time": 1491451593158
	},
	"material": {
		"_id": "dsafdsadsaf32413141kl2",
		"id": 1491410563200,
		"type": "酒水饮料-酒水饮料",
		"description": "wonderful repository",
		"import_time": "2017-04-05T04:57:36.801Z",
		"estimated_export_time": "2017-04-06T04:57:36.801Z",
		"height": 1,
		"width": 1,
		"length": 2,
		"status": 300,
		"from_repository": 1,
		"from_location": 1,
		"from_layer": 3,
		"to_repository": 2,
		"to_location": 1,
		"to_layer": 0,
		"last_migrations": "1234",
		"location_update_time": "2017-04-06T04:57:36.801Z"
	}
}]