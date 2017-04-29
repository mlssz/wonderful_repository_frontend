export const types = ["生活电器", "电脑办公", "衣物服饰", "酒水饮料", "食品生鲜"]

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
}

export const formName = {
	"type": "物资类型",
	"description": "物资描述",
	"import_time": "入库时间",
	"estimated_export_time": "估计出库时间",
	"num": "物资数量",
	"id": "物资编号",
	"to": "摆放位置",
}

export const changeHash = function(hash) {
	window.location.hash = hash;
}

export const parsetime = function(time, type = 1) {
	if (time === 0)
		return '';
	let t = new Date(time);
	if (type)
		return t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDat() + ' ' + t.getHours() + '-' + t.getMinutes() + '-' + t.getSeconds();
	else
		return t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate();
}

export const parseToPlace = function(task) {
	return task.repository_id + ' 仓 ' + task.location_id + ' 区 ' + task.layer + ' 层 ';
}

export const objIsEmpty = function(obj) {
	let emptyKey = [];
	for (let i in obj) {
		if (obj[i] === 0 || obj[i] === '0')
			continue;
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