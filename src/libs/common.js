import JsBarcode from 'jsbarcode'

export const types = {
	"生活电器": ["生活电器", "生活电器"],
	"电脑办公": ["电脑办公"],
	"衣物服饰": ["衣物服饰"],
	"酒水饮料": ["酒水饮料"],
	"食品生鲜": ["食品生鲜"]
}

export const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		padding: "0 20 20 20",
	},
	formItem: {
		width: 150,
		marginRight: 30,
	}
}

export const titleMap = {
	"": "统计",
	"#": "统计",
	"#stat": "统计",
	"#check": "盘点",
	"#putaway": "入库登记",
	"#putawayEnsure": "入库管理",
	"#putawayManage": "入库管理",
	"#move": "移动登记",
	"#moveEnsure": "移动管理",
	"#moveManage": "移动管理",
	"#out": "出库登记",
	"#outEnsure": "出库管理",
	"#outManage": "出库管理",
	"#goodsManage": "物品管理"
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

export const paperStyle = {
	width: "80%",
	minWidth: 840,
	margin: "20 auto",
};

export const changeHash = function(hash) {
	console.log(window.location.hash, hash)
	if (window.location.hash == '#' + hash) {
		window.location.reload();
	} else
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
	if (type === 1)
		return t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds();
	else if (type === 2)
		return t.getFullYear().toString().slice(2) + (t.getMonth() + 1) + t.getDate() + t.getHours() + t.getMinutes() + t.getSeconds();
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

export const downloadBarCode = function(code) {
	function base64Img2Blob(code) {
		var parts = code.split(';base64,');
		var contentType = parts[0].split(':')[1];
		var raw = window.atob(parts[1]);
		var rawLength = raw.length;

		var uInt8Array = new Uint8Array(rawLength);

		for (var i = 0; i < rawLength; ++i) {
			uInt8Array[i] = raw.charCodeAt(i);
		}
		return new Blob([uInt8Array], {
			type: contentType
		});
	}

	function downloadFile(fileName, content) {
		var aLink = document.createElement('a');
		var blob = base64Img2Blob(content); //new Blob([content]);
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("click", false, false); //initEvent 不加后两个参数在FF下会报错
		aLink.download = fileName;
		aLink.href = URL.createObjectURL(blob);
		aLink.dispatchEvent(evt);
		aLink.click();
	}
	let canvas = document.createElement('canvas');
	JsBarcode(canvas, code);
	downloadFile(code + ".png", canvas.toDataURL("image/png"));

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

export const testOut = [{
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
		"from_repository": 4,
		"from_location": 8,
		"from_layer": 1,
		"to_repository": 0,
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
		"import_time": "2017-01-10T04:57:36.801Z",
		"estimated_export_time": "2017-02-06T04:57:36.801Z",
		"height": 1,
		"width": 1,
		"length": 2,
		"status": 300,
		"from_repository": 1,
		"from_location": 8,
		"from_layer": 4,
		"to_repository": 0,
		"to_location": 1,
		"to_layer": 0,
		"last_migrations": "1234",
		"location_update_time": "2017-01-10T04:57:36.801Z"
	}
}]


export const testGoods = [{
	"_id": "dsafdsaf32141314",
	"number": 133412,
	"id": 1491420493158,
	"type": "酒水饮料",
	"description": "wonderful repository",
	"import_time": "2017-02-06T04:57:36.801Z",
	"estimated_export_time": "2017-08-06T04:57:36.801Z",
	"height": 1,
	"width": 1,
	"length": 2,
	"repository_id": 2,
	"location_id": 1,
	"layer": 2,
	"status": 300,
	"last_migrations": "1234",
	"location_update_time": "2017-04-29T04:57:36.801Z"
}, {
	"_id": "dsafdsaf32141314",
	"number": 133412,
	"id": 1491056593158,
	"type": "生活电器",
	"description": "wonderful repository",
	"import_time": "2017-04-06T04:57:36.801Z",
	"estimated_export_time": "2017-04-06T04:57:36.801Z",
	"height": 1,
	"width": 1,
	"length": 2,
	"repository_id": 1,
	"location_id": 9,
	"layer": 2,
	"status": 300,
	"last_migrations": "1234",
	"location_update_time": "2017-04-06T04:57:36.801Z"
}, {
	"_id": "dsafdsaf32141314",
	"number": 133412,
	"id": 1491439573158,
	"type": "生活电器",
	"description": "wonderful repository",
	"import_time": "2017-02-20T04:57:36.801Z",
	"estimated_export_time": "2017-02-25T04:57:36.801Z",
	"height": 1,
	"width": 1,
	"length": 2,
	"repository_id": 2,
	"location_id": 3,
	"layer": 1,
	"status": 300,
	"last_migrations": "1234",
	"location_update_time": "2017-02-20T04:57:36.801Z"
}, {
	"_id": "dsafdsaf32141314",
	"number": 133412,
	"id": 1491451593158,
	"type": "生活电器",
	"description": "wonderful repository",
	"import_time": "2017-04-06T04:57:36.801Z",
	"estimated_export_time": "2017-10-20T04:57:36.801Z",
	"height": 1,
	"width": 1,
	"length": 2,
	"repository_id": 1,
	"location_id": 8,
	"layer": 2,
	"status": 300,
	"last_migrations": "1234",
	"location_update_time": "2017-08-18T04:57:36.801Z"
}]

export const testMigrations = [{
	"_id": "dsafdsaf32141314",
	"material": "dsafdsaf32141314",
	"date": "2017-04-06T04:57:36.801Z",
	"from_repository": 1,
	"from_location": 12,
	"from_layer": 0,
	"to_repository": 1,
	"to_location": 3,
	"to_layer": 0,
}, {
	"_id": "dsafdsaf32141314",
	"material": "dsafdsaf32141314",
	"date": "2017-04-06T04:57:36.801Z",
	"from_repository": 1,
	"from_location": 4,
	"from_layer": 0,
	"to_repository": 1,
	"to_location": 12,

}, {
	"_id": "dsafdsaf32141314",
	"material": "dsafdsaf32141314",
	"date": "2017-04-06T04:57:36.801Z",
	"from_repository": 1,
	"from_location": 23,
	"from_layer": 0,
	"to_repository": 1,
	"to_location": 4,
	"to_layer": 0,
}, {
	"_id": "dsafdsaf32141314",
	"material": "dsafdsaf32141314",
	"date": "2017-04-06T04:57:36.801Z",
	"from_repository": 0,
	"from_location": 0,
	"from_layer": 0,
	"to_repository": 1,
	"to_location": 23,
	"to_layer": 0,
}]