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
	"id": 1491451593158,
	"type": "tester",
	"description": "wonderful repository",
	"import_time": "2017-04-06T04:57:36.801Z",
	"estimated_export_time": "2017-04-06T04:57:36.801Z",
	"height": 1,
	"width": 1,
	"length": 2,
	"repository_id": 3,
	"location_id": 2,
	"layer": 1,
	"status": 300,
	"last_migrations": "1234",
	"location_update_time": "2017-04-06T04:57:36.801Z"
}, {
	"id": 1491451593158,
	"type": "tester",
	"description": "wonderful repository",
	"import_time": "2017-04-06T04:57:36.801Z",
	"estimated_export_time": "2017-04-06T04:57:36.801Z",
	"height": 1,
	"width": 1,
	"length": 2,
	"repository_id": 3,
	"location_id": 2,
	"layer": 1,
	"status": 300,
	"last_migrations": "1234",
	"location_update_time": "2017-04-06T04:57:36.801Z"
}, {
	"id": 1491451593158,
	"type": "tester",
	"description": "wonderful repository",
	"import_time": "2017-04-06T04:57:36.801Z",
	"estimated_export_time": "2017-04-06T04:57:36.801Z",
	"height": 1,
	"width": 1,
	"length": 2,
	"repository_id": 3,
	"location_id": 2,
	"layer": 1,
	"status": 300,
	"last_migrations": "1234",
	"location_update_time": "2017-04-06T04:57:36.801Z"
}, {
	"id": 1491451593158,
	"type": "tester",
	"description": "wonderful repository",
	"import_time": "2017-04-06T04:57:36.801Z",
	"estimated_export_time": "2017-04-06T04:57:36.801Z",
	"height": 1,
	"width": 1,
	"length": 2,
	"repository_id": 3,
	"location_id": 2,
	"layer": 1,
	"status": 300,
	"last_migrations": "1234",
	"location_update_time": "2017-04-06T04:57:36.801Z"
}, {
	"id": 1491451593158,
	"type": "tester",
	"description": "wonderful repository",
	"import_time": "2017-04-06T04:57:36.801Z",
	"estimated_export_time": "2017-04-06T04:57:36.801Z",
	"height": 1,
	"width": 1,
	"length": 2,
	"repository_id": 3,
	"location_id": 2,
	"layer": 1,
	"status": 300,
	"last_migrations": "1234",
	"location_update_time": "2017-04-06T04:57:36.801Z"
}, {
	"id": 1491451593158,
	"type": "tester",
	"description": "wonderful repository",
	"import_time": "2017-04-06T04:57:36.801Z",
	"estimated_export_time": "2017-04-06T04:57:36.801Z",
	"height": 1,
	"width": 1,
	"length": 2,
	"repository_id": 3,
	"location_id": 2,
	"layer": 1,
	"status": 300,
	"last_migrations": "1234",
	"location_update_time": "2017-04-06T04:57:36.801Z"
}];