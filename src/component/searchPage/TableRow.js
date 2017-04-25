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
		let material = good.material;
		let place = parseGood(good);
		let action = {
			"500": '入库',
			"501": "移动",
			"502": "出库",
			"6XX": "异常",
		};
		let status = ['未开始', '进行中', '已完成', '已取消']
		return (
			<TableRow
				hoverable={true}>
				<TableRowColumn style={{overflow:"visible"}}>{this.props.index}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{action[good.action]||"异常"}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{material.id}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{material.type}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{place.from}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{place.to}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{status[good.status]}</TableRowColumn>
				<TableRowColumn title={place.startTime}>{place.startTime}</TableRowColumn>
				<TableRowColumn title={place.endTime}>{place.endTime}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{good.staff.name}</TableRowColumn>
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