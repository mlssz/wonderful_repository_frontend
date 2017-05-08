import React from 'react'
import Searcher from "../Searcher.jsx"
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

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
			label: "物资id",
			type: Number
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
