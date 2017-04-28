import React from "react"
import {
	TableRow,
	TableRowColumn
} from "material-ui/Table"

import {
	humanise_task_var
} from "../../libs/humanise_map.js"

export default class SelfTableRow extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let good = this.props.good;
		let material = good.material || {};
		let staff = good.staff || {};
		let place = parseGood(good);
		return (
			<TableRow
          hoverable={true}
          onTouchTap={this.props.onTouchTap}
      >
				<TableRowColumn style={{overflow:"visible"}}>{this.props.index}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{humanise_task_var(good.action)}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{material.id||"1491451593158"}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{material.type||"tester"}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{place.from||"----"}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{place.to||"----"}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{humanise_task_var(good.status)}</TableRowColumn>
				<TableRowColumn title={place.startTime}>{place.startTime}</TableRowColumn>
				<TableRowColumn title={place.endTime}>{place.endTime}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{staff.name||"----"}</TableRowColumn>
			</TableRow>
		)
	}

}

function parseGood(good) {
	if (good.material == undefined)
		return {};
	let to = good.material.to_repository + '仓' + good.material.to_location + '架' + good.material.to_layer + '层';
	let from = good.material.from_repository + '仓' + good.material.from_location + '架' + good.material.from_layer + '层';
	let st = new Date(good.start_time);
	let startTime = st.getFullYear() + '-' + (st.getMonth() + 1) + '-' + st.getDate() + ' ' + st.getHours() + ':' + st.getMinutes() + ':' + st.getSeconds();
	let et = new Date(good.end_time);
	let endTime = et.getFullYear() + '-' + (et.getMonth() + 1) + '-' + et.getDate() + ' ' + et.getHours() + ':' + et.getMinutes() + ':' + et.getSeconds();
	if (good.material.from_repository == 0)
		from = "----";
	if (good.material.to_repository == -1)
		to = "----";
	return ({
		to: to,
		from: from,
		startTime: startTime,
		endTime: endTime
	})
}