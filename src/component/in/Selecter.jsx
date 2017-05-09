import React from 'react'
import Searcher from "../Searcher.jsx"
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import {
	Card,
	CardActions,
	CardHeader,
	CardText
} from 'material-ui/Card'

export default class ReactClassName extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			paperDisplay: false
		}
	}

	onSearchTouchTap(v) {
		this.props.onChange(v)
	}

	onShowAllTouchTap() {
		this.props.onChange([])
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
			label: "物资编号",
			type: Number
		}, {
			key: "repository_id",
			label: "仓库编号",
			type: Number
		}, {
			key: "location_id",
			label: "货架编号",
			type: Number
		}, {
			key: "repository_id",
			label: "定位终端号",
			type: Number
		}, {
			key: "type",
			label: "物资类型",
			type: String
		}];
		return (
			<Card>
				<CardHeader
            title="按照条件筛选"
            actAsExpander={true}
            showExpandableButton={true}
        />
				<CardText expandable={true}>
					<Searcher
            searchKeys={searchKeys}
            onSearchTouchTap={this.onSearchTouchTap.bind(this)}
            onShowAllTouchTap={this.onShowAllTouchTap.bind(this)}/>
				</CardText>
			</Card>
		)
	}
}