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
				<ShowTable/>
				<SelectPageNum setPageNum={this.setPageNum}/>
			</div>
		)
	}
}
