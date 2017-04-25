import React from "react"
import ShowTable from "./searchPage/showTable.js"
import Picker from "./searchPage/Picker.js"
import SelectPageNum from "./searchPage/SelectPageNum.js"


export default class SearchPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			goods: this.props.goods,
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
		return (
			<div>
				<Picker setPageType={this.setPageType}/>
				<ShowTable goods={this.state.showGoods} changePage={this.props.changePage}/>
				<SelectPageNum setPageNum={this.setPageNum}/>
			</div>
		)
	}
}

function sortGood(goods) {
	return goods.sort((a, b) => a.action > b.action);
}