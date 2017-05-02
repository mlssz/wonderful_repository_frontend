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
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import DropDownMenu from 'material-ui/DropDownMenu'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField';

import {
	testTask,
	parseParams,
	parsetime,
	parseTaskPlace,
	changeHash,
	downloadBarCode
} from '../../libs/common.js'

import * as sortTask from '../../libs/sortTask.js'
import Selecter from './Selecter.jsx'

export default class Manage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			task: [],
			oriTask: [],
			sort: 1,
		}
		this.handleChange = this.handleChange.bind(this);
		this.meunClick = this.meunClick.bind(this);
	}

	componentWillMount() {
		let task = testTask;
		for (let i in task)
			task[i].number = Math.floor(Math.random() * (9999 - 1) + 1);
		let oriTask = [];
		for (let i in task)
			oriTask.push(task[i])
		this.setState({
			task,
			oriTask
		});
	}

	handleChange(event, index, value) {
		let task = this.state.task;
		// switch (value) {
		// 	case 1:
		// 		task = task.sort(sortTask.sortById);
		// 		break;
		// 	case 2:
		// 		task = task.sort(sortTask.sortByType);
		// 		break;
		// 	case 3:
		// 		task = task.sort(sortTask.sortByNum);
		// 		break;
		// 	case 4:
		// 		task = task.sort(sortTask.sortByImportTime);
		// 		break;
		// 	case 5:
		// 		task = task.sort(sortTask.sortByFromPlace);
		// 		break;
		// 	case 6:
		// 		task = task.sort(sortTask.sortByToPlace);
		// 		break;
		// }
		this.setState({
			sort: value,
			task,
		})
	}

	renderRow() {
		let tasks = this.state.task;
		return (
			tasks.map(this.renderRowColumn)
		)
	}

	renderRowColumn(task) {
		let material = task.material;
		let import_time = parsetime(material.location_update_time);
		let [fromPlace, toPlace] = parseTaskPlace(material);
		return (
			<TableRow key={material.id}>
	        	<TableRowColumn>{material.id}</TableRowColumn>
	        	<TableRowColumn>{material.type}</TableRowColumn>
	        	<TableRowColumn>{task.number}</TableRowColumn>
	        	<TableRowColumn style={{overflow:"visible"}}>{import_time}</TableRowColumn>
	        	<TableRowColumn>{fromPlace}</TableRowColumn>
	        	<TableRowColumn>{toPlace}</TableRowColumn>
	        	<TableRowColumn><RaisedButton label="详情" onTouchTap={() => changeHash(`/task/${task._id}`)}/></TableRowColumn>
			</TableRow>
		)
	}

	addPutaway() {
		changeHash('putaway');
	}

	meunClick(event, child) {
		// let table = document.getElementsByClassName('tablePrint')[1];
		// var newWin = window.open("");
		// newWin.document.write(tableToPrint.outerHTML);
		// newWin.document.close();
		// newWin.focus();
		// newWin.print();
		// newWin.close();
		if (child.key === 'printTable') {
			let table2excel = new Table2Excel();
			let name = '入库单' + parsetime(new Date(), 2);
			table2excel.export(document.getElementsByClassName('tablePrint')[1], name);
		}
		if (child.key === 'printBar') {
			let task = this.state.task;
			let codes = [];
			for (let i in task) {
				downloadBarCode(task[i].material.id);
			}
		}
	}

	pick(e, v) {
		let task = this.state.task;
		let oriTask = this.state.oriTask;
		if (!v)
			task = oriTask;
		else {
			task = oriTask.filter((e) => pickTask(e, v, this.state.sort));
		}
		this.setState({
			task
		})
	}

	render() {
		return (
			<div>
				<Selecter/>
				<Toolbar>
					<ToolbarGroup firstChild={true}>
						<DropDownMenu value={this.state.sort} onChange={this.handleChange} iconStyle={{fill:'black'}}>
							<MenuItem value={1} primaryText="物资编号" />
							<MenuItem value={2} primaryText="物资类型" />
							<MenuItem value={3} primaryText="物资数量" />
							<MenuItem value={4} primaryText="入库时间" />
							<MenuItem value={5} primaryText="原始位置" />
							<MenuItem value={6} primaryText="入库地址" />
						</DropDownMenu>
						<TextField
					    	hintText="在结果中筛选"
					    	hintStyle={{color:'gray'}}
					    	onChange={this.pick.bind(this)}
					  	/>
			        </ToolbarGroup>
			        <ToolbarGroup>
			          <ToolbarSeparator />
			          <RaisedButton label="新建入库单" primary={true} onTouchTap={this.addPutaway}/>
			          <IconMenu
			            iconButtonElement={
			              <IconButton touch={true}>
			                <NavigationExpandMoreIcon />
			              </IconButton>
			            }
			            onItemTouchTap={this.meunClick}
			          >
			            <MenuItem primaryText="打印入库单" key='printTable'/>
			            <MenuItem primaryText="打印条形码" key='printBar'/>
			          </IconMenu>
			        </ToolbarGroup>
				</Toolbar>
				<Table
					selectable={false}
					className="tablePrint">
				    <TableBody
				    	displayRowCheckbox={false}
				    	deselectOnClickaway={false}>
						<TableRow>
				        	<TableRowColumn>物资编号</TableRowColumn>
				        	<TableRowColumn>物资类型</TableRowColumn>
				        	<TableRowColumn>物资数量</TableRowColumn>
				        	<TableRowColumn>入库时间</TableRowColumn>
				        	<TableRowColumn>原始位置</TableRowColumn>
				        	<TableRowColumn>入库地址</TableRowColumn>
				        	<TableRowColumn>详情</TableRowColumn>
			    		</TableRow>
				    	{this.renderRow.call(this)}
				    </TableBody>
				</Table>
			</div>
		)
	}
}


function pickTask(task, v, sort) {
	let material = task.material;
	let id = material.id;
	let type = material.type;
	let number = task.number;
	let import_time = parsetime(material.location_update_time);
	let [fromPlace, toPlace] = parseTaskPlace(material);
	let selecter = [id, type, number, import_time, fromPlace, toPlace];
	// for (let i of selecter) {
	// 	if (i.toString().replace(/\s/g, "").indexOf(v) >= 0) {
	// 		return true;
	// 	}
	// }
	if (selecter[sort - 1].toString().replace(/\s/g, "").indexOf(v) >= 0) {
		return true;
	}
	return false;
}