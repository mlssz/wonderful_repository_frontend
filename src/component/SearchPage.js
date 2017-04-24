import React from "react"
import ShowTable from "./searchPage/showTable.js"
import Picker from "./searchPage/Picker.js"
import SelectPageNum from "./searchPage/SelectPageNum.js"

export default class SearchPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			pageNum: 1,
			pageType: "all",
		}
		this.setPageNum = this.setPageNum.bind(this)
		this.setPageType = this.setPageType.bind(this)
	}

	setPageNum(pageNum) {
		this.setState({
			pageNum
		})
	}

	setPageType(pageType) {
		this.setState({
			pageType
		})
	}

	render() {
		console.log(this.state)
		return (
			<div>
				<Picker setPageType={this.setPageType}/>
				<ShowTable goods={goods}/>
				<SelectPageNum setPageNum={this.setPageNum}/>
			</div>
		)
	}
}

let goods = [{
	"_id": "dsafdsadsaf32413141kl2",
	"action": 500,
	"status": 1,
	"publish_time": "2017-04-06T04:57:36.801Z",
	"start_time": "2017-04-06T04:57:36.801Z",
	"end_time": "2017-04-06T04:57:36.801Z",
	"remark": "",
	"staff": {
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
		"id": 1491451593158,
		"type": "tester",
		"description": "wonderful repository",
		"import_time": "2017-04-06T04:57:36.801Z",
		"estimated_export_time": "2017-04-06T04:57:36.801Z",
		"height": 1,
		"width": 1,
		"length": 2,
		"status": 300,
		"from_repository": 2,
		"from_location": 0,
		"from_layer": 0,
		"to_repository": 12,
		"to_location": 1,
		"to_layer": 0,
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
		"id": 1491451593158,
		"type": "tester",
		"description": "wonderful repository",
		"import_time": "2017-04-06T04:57:36.801Z",
		"estimated_export_time": "2017-04-06T04:57:36.801Z",
		"height": 1,
		"width": 1,
		"length": 2,
		"status": 300,
		"from_repository": 2,
		"from_location": 0,
		"from_layer": 0,
		"to_repository": 12,
		"to_location": 1,
		"to_layer": 0,
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
		"id": 1491451593158,
		"type": "tester",
		"description": "wonderful repository",
		"import_time": "2017-04-06T04:57:36.801Z",
		"estimated_export_time": "2017-04-06T04:57:36.801Z",
		"height": 1,
		"width": 1,
		"length": 2,
		"status": 300,
		"from_repository": 2,
		"from_location": 0,
		"from_layer": 0,
		"to_repository": 12,
		"to_location": 1,
		"to_layer": 0,
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
		"id": 1491451593158,
		"type": "tester",
		"description": "wonderful repository",
		"import_time": "2017-04-06T04:57:36.801Z",
		"estimated_export_time": "2017-04-06T04:57:36.801Z",
		"height": 1,
		"width": 1,
		"length": 2,
		"status": 300,
		"from_repository": 2,
		"from_location": 0,
		"from_layer": 0,
		"to_repository": 12,
		"to_location": 1,
		"to_layer": 0,
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
		"id": 1491451593158,
		"type": "tester",
		"description": "wonderful repository",
		"import_time": "2017-04-06T04:57:36.801Z",
		"estimated_export_time": "2017-04-06T04:57:36.801Z",
		"height": 1,
		"width": 1,
		"length": 2,
		"status": 300,
		"from_repository": 2,
		"from_location": 0,
		"from_layer": 0,
		"to_repository": 12,
		"to_location": 1,
		"to_layer": 0,
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
		"id": 1491451593158,
		"type": "tester",
		"description": "wonderful repository",
		"import_time": "2017-04-06T04:57:36.801Z",
		"estimated_export_time": "2017-04-06T04:57:36.801Z",
		"height": 1,
		"width": 1,
		"length": 2,
		"status": 300,
		"from_repository": 2,
		"from_location": 0,
		"from_layer": 0,
		"to_repository": 12,
		"to_location": 1,
		"to_layer": 0,
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
		"id": 1491451593158,
		"type": "tester",
		"description": "wonderful repository",
		"import_time": "2017-04-06T04:57:36.801Z",
		"estimated_export_time": "2017-04-06T04:57:36.801Z",
		"height": 1,
		"width": 1,
		"length": 2,
		"status": 300,
		"from_repository": 2,
		"from_location": 0,
		"from_layer": 0,
		"to_repository": 12,
		"to_location": 1,
		"to_layer": 0,
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
		"id": 1491451593158,
		"type": "tester",
		"description": "wonderful repository",
		"import_time": "2017-04-06T04:57:36.801Z",
		"estimated_export_time": "2017-04-06T04:57:36.801Z",
		"height": 1,
		"width": 1,
		"length": 2,
		"status": 300,
		"from_repository": 2,
		"from_location": 0,
		"from_layer": 0,
		"to_repository": 12,
		"to_location": 1,
		"to_layer": 0,
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
		"id": 1491451593158,
		"type": "tester",
		"description": "wonderful repository",
		"import_time": "2017-04-06T04:57:36.801Z",
		"estimated_export_time": "2017-04-06T04:57:36.801Z",
		"height": 1,
		"width": 1,
		"length": 2,
		"status": 300,
		"from_repository": 2,
		"from_location": 0,
		"from_layer": 0,
		"to_repository": 12,
		"to_location": 1,
		"to_layer": 0,
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
		"id": 1491451593158,
		"type": "tester",
		"description": "wonderful repository",
		"import_time": "2017-04-06T04:57:36.801Z",
		"estimated_export_time": "2017-04-06T04:57:36.801Z",
		"height": 1,
		"width": 1,
		"length": 2,
		"status": 300,
		"from_repository": 2,
		"from_location": 0,
		"from_layer": 0,
		"to_repository": 12,
		"to_location": 1,
		"to_layer": 0,
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
		"id": 1491451593158,
		"type": "tester",
		"description": "wonderful repository",
		"import_time": "2017-04-06T04:57:36.801Z",
		"estimated_export_time": "2017-04-06T04:57:36.801Z",
		"height": 1,
		"width": 1,
		"length": 2,
		"status": 300,
		"from_repository": 2,
		"from_location": 0,
		"from_layer": 0,
		"to_repository": 12,
		"to_location": 1,
		"to_layer": 0,
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
		"id": 1491451593158,
		"type": "tester",
		"description": "wonderful repository",
		"import_time": "2017-04-06T04:57:36.801Z",
		"estimated_export_time": "2017-04-06T04:57:36.801Z",
		"height": 1,
		"width": 1,
		"length": 2,
		"status": 300,
		"from_repository": 2,
		"from_location": 0,
		"from_layer": 0,
		"to_repository": 12,
		"to_location": 1,
		"to_layer": 0,
		"last_migrations": "1234",
		"location_update_time": "2017-04-06T04:57:36.801Z"
	}
}];