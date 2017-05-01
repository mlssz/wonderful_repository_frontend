export const sortById = function(a, b) {
	return a.id > b.id;
}

export const sortByType = function(a, b) {
	return a.type.charCodeAt(0) < b.type.charCodeAt(0);
}

export const sortByNum = function(a, b) {
	return a.number > b.number;
}

export const sortByImportTime = function(a, b) {
	return (+new Date(a.import_time)) > (+new Date(b.import_time));
}

export const sortByOutTime = function(a, b) {
	return (+new Date(a.estimated_export_time)) > (+new Date(b.estimated_export_time));
}

export const sortByMoveTime = function(a, b) {
	return (+new Date(a.location_update_time)) > (+new Date(b.location_update_time));
}

export const sortByPlace = function(a, b) {
	if (a.repository_id > b.repository_id)
		return true;
	else if (a.repository_id === b.repository_id) {
		if (a.location_id > b.location_id) {
			console.log(a.repository_id, b.repository_id)
			console.log(a.location_id, b.location_id)
			return true;
		} else if (a.location_id === b.location_id) {
			if (a.layer > b.layer)
				return true
		}
	}
	return false;
}