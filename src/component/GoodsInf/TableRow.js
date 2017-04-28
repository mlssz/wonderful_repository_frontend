import React from "react"
import {
	TableRow,
	TableRowColumn
} from "material-ui/Table"

import {
	humanise_task_var
} from "../../libs/humanise_map.js"
import FlatButton from 'material-ui/FlatButton';
import Move from '../Move.js'

export default class SelfTableRow extends React.Component {
	constructor(props) {
		super(props)
	}

	doSomeThing(action, good) {
		let value = ["移动", "出库"][action]
		this.props.changePage(Move, value, {
			type: action,
			good: good
		})
	}

	render() {
		let good = this.props.good;
		let place = parseGood(good);
		return (
			<TableRow
				hoverable={true}
				onTouchTap={this.props.onTouchTap}>
				<TableRowColumn style={{overflow:"visible"}}>{this.props.index}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{good.id||"1491451593158"}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{good.type||"----"}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{good.number||"----"}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{place.place||"----"}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{place.startTime||"----"}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{place.endTime||"----"}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>{place.changeTime}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible"}}>
					<FlatButton label="移动" style={{minWidth:40,marginRight:5}} labelStyle={{paddingLeft:10,paddingRight:10,color:'#33D4E7'}} onClick={()=>this.doSomeThing(0,good)}/>
					<FlatButton label="出库" style={{minWidth:40}} labelStyle={{paddingLeft:10,paddingRight:10,color:'#F9B0D7'}} onClick={()=>this.doSomeThing(1,good)}/>
				</TableRowColumn>
			</TableRow>
		)
	}

}

function parseGood(good) {
	let place = good.repository_id + "仓" + good.location_id + "区" + good.layer + "层";
	let st = new Date(good.import_time);
	let startTime = st.getFullYear() + '-' + (st.getMonth() + 1) + '-' + st.getDate() + ' ' + st.getHours() + ':' + st.getMinutes() + ':' + st.getSeconds();
	let et = new Date(good.estimated_export_time);
	let endTime = et.getFullYear() + '-' + (et.getMonth() + 1) + '-' + et.getDate() + ' ' + et.getHours() + ':' + et.getMinutes() + ':' + et.getSeconds();
	let ct = new Date(good.location_update_time);
	let changeTime = ct.getFullYear() + '-' + (ct.getMonth() + 1) + '-' + ct.getDate() + ' ' + ct.getHours() + ':' + ct.getMinutes() + ':' + ct.getSeconds();
	return ({
		place: place,
		startTime: startTime,
		endTime: endTime,
		changeTime: changeTime
	})
}