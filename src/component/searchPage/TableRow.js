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
			<TableRow>
				<TableRowColumn>{this.props.index}</TableRowColumn>
				<TableRowColumn>{action[good.action]||"异常"}</TableRowColumn>
				<TableRowColumn>{material.id}</TableRowColumn>
				<TableRowColumn>{material.type}</TableRowColumn>
				<TableRowColumn>{place.from}</TableRowColumn>
				<TableRowColumn>{place.to}</TableRowColumn>
				<TableRowColumn>{status[good.status]}</TableRowColumn>
				<TableRowColumn>{place.startTime}</TableRowColumn>
				<TableRowColumn>{place.endTime}</TableRowColumn>
				<TableRowColumn>{good.staff.name}</TableRowColumn>
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