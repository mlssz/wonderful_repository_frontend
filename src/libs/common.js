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
	"#putaway": "入库",
}

export const changeHash = function(hash) {
	window.location.hash = hash;
}

export const parsetime = function(time, type = 0) {
	if (time === 0)
		return '';
	let t = new Date(time);
	if (type)
		return t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDay + ' ' + t.getHours + '-' + t.getMinutes + '-' + t.getSeconds;
	else
		return t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDay;
}

export const objIsEmpty = function(obj) {
	let emptyKey = [];
	for (let i in obj) {
		if (!obj[i])
			emptyKey.push(i);
	}
	return [!!emptyKey.length, emptyKey];
}