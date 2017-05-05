import React from 'react'
import {
	Toolbar,
	ToolbarGroup,
	ToolbarSeparator,
	ToolbarTitle
} from 'material-ui/Toolbar'
import {
	Table,
	TableBody,
	TableRow,
	TableRowColumn
} from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import DropDownMenu from 'material-ui/DropDownMenu'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'

import {
	testGoods,
	parseParams,
	parsetime,
	parsePlace,
	changeHash,
	downloadBarCode,
	paperStyle
} from '../../libs/common.js'

import * as sortGood from '../../libs/sortGood.js'
import Selecter from '../in/Selecter.jsx'

export default class Manage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			good: [],
			oriGood: [],
			sort: 1,
			action: false,
			selected: 0,
		}
		this.handleChange = this.handleChange.bind(this);
		this.meunClick = this.meunClick.bind(this);
		this.doAction = this.doAction.bind(this);
	}

	componentWillMount() {
		let good = testGoods;
		for (let i in good)
			good[i].number = Math.floor(Math.random() * (9999 - 1) + 1);
		let oriGood = [];
		for (let i in good)
			oriGood.push(good[i])
		this.setState({
			good,
			oriGood
		});
	}

	handleChange(event, index, value) {
		let good = this.state.good;
		// switch (value) {
		// 	case 1:
		// 		good = good.sort(sortGood.sortById);
		// 		break;
		// 	case 2:
		// 		good = good.sort(sortGood.sortByType);
		// 		break;
		// 	case 3:
		// 		good = good.sort(sortGood.sortByNum);
		// 		break;
		// 	case 4:
		// 		good = good.sort(sortGood.sortByImportTime);
		// 		break;
		// 	case 5:
		// 		good = good.sort(sortGood.sortByOutTime);
		// 		break;
		// 	case 6:
		// 		good = good.sort(sortGood.sortByMoveTime);
		// 		break;
		// 	case 7:
		// 		good = good.sort(sortGood.sortByPlace);
		// 		break;
		// }
		this.setState({
			sort: value,
			// good,
		})
	}

	renderRow() {
		let goods = this.state.good;
		return (
			goods.map(this.renderRowColumn)
		)
	}

	renderRowColumn(good) {
		let import_time = parsetime(good.import_time);
		let estimated_export_time = parsetime(good.estimated_export_time, 0);
		let location_update_time = parsetime(good.location_update_time);
		let place = parsePlace(good);
		return (
			<TableRow key={good.id}>
		       	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{good.id}</TableRowColumn>
		       	<TableRowColumn style={{textAlign:'center'}}>{good.type}</TableRowColumn>
		       	<TableRowColumn style={{textAlign:'center'}}>{good.number}</TableRowColumn>
		       	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{import_time}</TableRowColumn>
		       	<TableRowColumn style={{textAlign:'center'}}>{estimated_export_time}</TableRowColumn>
		       	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{location_update_time}</TableRowColumn>
		       	<TableRowColumn style={{textAlign:'center'}}>{place}</TableRowColumn>
		       	<TableRowColumn style={{textAlign:'center'}}><RaisedButton label="出库" primary={true} onTouchTap={()=>this.doAction(good)}/></TableRowColumn>
			</TableRow>
		)
	}

	doAction(good) {

	}

	meunClick(event, child) {
		if (child.key === 'printTable') {
			let table2excel = new Table2Excel();
			let name = '入库单' + parsetime(new Date(), 2);
			table2excel.export(document.getElementsByClassName('tablePrint')[1], name);
		}
		if (child.key === 'printBar') {
			let good = this.state.good;
			let codes = [];
			for (let i in good) {
				downloadBarCode(good[i].material.id);
			}
		}
	}

	pick(e, v) {
		let good = this.state.good;
		let oriGood = this.state.oriGood;
		if (!v)
			good = oriGood;
		else {
			good = oriGood.filter((e) => pickGood(e, v, this.state.sort));
		}
		this.setState({
			good
		})
	}

	render() {
		return (
			<Paper style={paperStyle} zDepth={1}>
			<div>
				<Selecter/>
				<Toolbar>
					<ToolbarGroup firstChild={true}>
						<DropDownMenu value={this.state.sort} onChange={this.handleChange} iconStyle={{fill:'black'}}>
							<MenuItem value={1} primaryText="物资编号" />
							<MenuItem value={2} primaryText="物资类型" />
							<MenuItem value={3} primaryText="物资数量" />
							<MenuItem value={4} primaryText="入库时间" />
							<MenuItem value={5} primaryText="估计出库时间" />
							<MenuItem value={6} primaryText="最近搬运时间" />
							<MenuItem value={7} primaryText="所处地址" />
						</DropDownMenu>
						<TextField
					    	hintText="在结果中筛选"
					    	hintStyle={{color:'gray'}}
					    	onChange={this.pick.bind(this)}
					  	/>
			        </ToolbarGroup>
				</Toolbar>
				<Table
					selectable={true}
					className="tablePrint"
					onRowSelection={(e)=>this.setState({selected:e[0]})}>
				    <TableBody
				    	displayRowCheckbox={false}
				    	deselectOnClickaway={false}>
						<TableRow selectable={false}>
				        	<TableRowColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17}}>物资编号</TableRowColumn>
				        	<TableRowColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17}}>物资类型</TableRowColumn>
				        	<TableRowColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17}}>物资数量</TableRowColumn>
				        	<TableRowColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17}}>入库时间</TableRowColumn>
				        	<TableRowColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17,overflow:'visible'}}>估计出库时间</TableRowColumn>
				        	<TableRowColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17}}>最近搬运时间</TableRowColumn>
				        	<TableRowColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17}}>所处地址</TableRowColumn>
				        	<TableRowColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17}}>出库</TableRowColumn>
			    		</TableRow>
						{this.renderRow.call(this)}
				    </TableBody>
				</Table>
			</div>
			</Paper>
		)
	}
}

function pickGood(good, v, sort) {
	let id = good.id;
	let type = good.type;
	let number = good.number;
	let import_time = parsetime(good.import_time);
	let estimated_export_time = parsetime(good.estimated_export_time);
	let location_update_time = parsetime(good.location_update_time);
	let toPlace = parsePlace(good);
	let selecter = [id, type, number, import_time, estimated_export_time, location_update_time, toPlace];
	if (selecter[sort - 1].toString().replace(/\s/g, "").indexOf(v) >= 0) {
		return true;
	}
	return false;
}