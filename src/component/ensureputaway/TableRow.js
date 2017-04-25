import React from "react"
import {
	TableRow,
	TableRowColumn
} from "material-ui/Table"

export default class SelfTableRow extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let good = this.props.good;
		return (
			<TableRow
				hoverable={true}>
				<TableRowColumn style={{overflow:"visible"}}>{this.props.index}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>12345678911</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{good.num}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{good.type}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{good.estimated_export_time}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>系统分配</TableRowColumn>
			</TableRow>
		)
	}

}

function parseGood(good) {
	let to = good.material.to_repository + '仓' + good.material.to_location + '架' + good.material.to_layer + '层';
	let from = good.material.from_repository + '仓' + good.material.from_location + '架' + good.material.from_layer + '层';
	let st = new Date(good.start_time);
	let startTime = st.getFullYear() + '-' + (st.getMonth() + 1) + '-' + st.getDate() + ' ' + st.getHours() + ':' + st.getMinutes() + ':' + st.getSeconds();
	let et = new Date(good.end_time);
	let endTime = et.getFullYear() + '-' + (et.getMonth() + 1) + '-' + et.getDate() + ' ' + et.getHours() + ':' + et.getMinutes() + ':' + et.getSeconds();
	return ({
		to: to,
		from: from,
		startTime: startTime,
		endTime: endTime
	})
}