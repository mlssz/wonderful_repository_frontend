import React from 'react'
import Searcher from "../Searcher.jsx"

export default class ReactClassName extends React.Component {
	constructor(props) {
		super(props);
	}

	onSearchTouchTap(v) {
		this.props.updateTask(v)
	}

	render() {
		let searchKeys = [{
			key: "description",
			label: "物资名称",
			type: String
		}, {
			key: "date",
			label: "入库时间",
			type: Date
		}, {
			key: "id",
			label: "物资id",
			type: Number
		}];
		return (
			<div>
				<Searcher
					searchKeys={searchKeys}
					onSearchTouchTap={this.onSearchTouchTap}
					onShowAllTouchTap={this.onShowAllTouchTap}/>
			</div>
		)
	}
}