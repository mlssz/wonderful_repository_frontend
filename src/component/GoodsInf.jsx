import React from "react"
import ShowTable from "./GoodsInf/showTable.js"
import Picker from "./GoodsInf/Picker.js"
import SelectPageNum from "./GoodsInf/SelectPageNum.js"


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
	"location_update_time": "2017-04-06T04:57:36.801Z",
	"number": Math.floor(Math.random() * 100),
}, {
	"id": 1491490593158,
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
	"location_update_time": "2017-04-06T04:57:36.801Z",
	"number": Math.floor(Math.random() * 100),
}, {
	"id": 1491479305158,
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
	"location_update_time": "2017-04-06T04:57:36.801Z",
	"number": Math.floor(Math.random() * 100),
}, {
	"id": 1752031593158,
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
	"location_update_time": "2017-04-06T04:57:36.801Z",
	"number": Math.floor(Math.random() * 100),
}, {
	"id": 1984201593158,
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
	"location_update_time": "2017-04-06T04:57:36.801Z",
	"number": Math.floor(Math.random() * 100),
}, {
	"id": 1491451597108,
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
	"location_update_time": "2017-04-06T04:57:36.801Z",
	"number": Math.floor(Math.random() * 100),
}]

export default class GoodsInf extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			goods: goods,
			showGoods: [],
			pageNum: this.props.params.pageNum || 1,
			pageType: "all",
		}
		this.setPageNum = this.setPageNum.bind(this)
		this.setPageType = this.setPageType.bind(this)
	}

	componentWillMount() {
		let sortedGoods = sortGood(this.state.goods);
		this.setState({
			showGoods: sortedGoods,
		})
	}


	setPageNum(pageNum) {
		this.setState({
			pageNum
		})
	}

	setPageType(pageType) {
		let showGoods = pageType != "all" ?
			this.state.goods.filter((good) => good.action == pageType) : this.state.goods;
		this.setState({
			pageType,
			showGoods
		})

	}

	render() {
		// <Picker setPageType={this.setPageType}/>
		return (
			<div>
				<ShowTable goods={this.state.showGoods} changePage={this.props.changePage}/>
				<SelectPageNum setPageNum={this.setPageNum}/>
			</div>
		)
	}
}

function sortGood(goods) {
	return goods.sort((a, b) => a.action > b.action);
}