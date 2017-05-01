export const sortById = function(taska, taskb) {
	return taska.material.id > taskb.material.id;
}

export const sortByType = function(taska, taskb) {
	return taska.material.type.charCodeAt(0) < taskb.material.type.charCodeAt(0);
}

export const sortByNum = function(taska, taskb) {
	return taska.number > taskb.number;
}

export const sortByImportTime = function(taska, taskb) {
	return (+new Date(taska.material.import_time)) > (+new Date(taskb.material.import_time));
}

export const sortByFromPlace = function(taska, taskb) {
	let materiala = taska.material;
	let materialb = taskb.material;
	if (materiala.from_repository > materialb.from_repository)
		return true;
	else if (materiala.from_repository === materialb.from_repository) {
		if (materiala.from_location > materialb.from_location)
			return true;
		else if (materiala.from_location === materialb.from_location) {
			if (materiala.from_layer > materialb.from_layer)
				return true
		}
	}
	return false;
}

export const sortByToPlace = function(taska, taskb) {
	let materiala = taska.material;
	let materialb = taskb.material;
	if (materiala.to_repository > materialb.to_repository) {
		return true;
	} else if (materiala.to_repository === materialb.to_repository) {
		if (materiala.to_location > materialb.to_location)
			return true;
		else if (materiala.to_location === materialb.to_location) {
			if (materiala.to_layer > materialb.to_layer)
				return true
		}
	}
	return false;
}