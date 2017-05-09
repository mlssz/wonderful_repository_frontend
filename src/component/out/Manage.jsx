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
import DropDownMenu from 'material-ui/DropDownMenu'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'

import {
	parseParams,
	parsetime,
	parseTaskPlace,
	changeHash,
	paperStyle,
	downloadBarCode
} from '../../libs/common.js'
import {
	getTaskNumber,
	deleteTask,
	getTask
} from '../../libs/callToBack.js'

import * as sortTask from '../../libs/sortTask.js'
import Selecter from '../in/Selecter.jsx'
import SelectPage from '../in/SelectPage.jsx'

export default class Manage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false,
			task: [],
			oriTask: [],
			sort: 1,
			choose: false,
			selectes: [],
			page: 1,
			limit: 10,
			numberOfPage: 1,
			numberOfGood: 0,
		}
		this.handleChange = this.handleChange.bind(this);
		this.setNumberOfGood = this.setNumberOfGood.bind(this);
		this.initTask = this.initTask.bind(this);
	}

	changePage(page) {
		let params = {
			page: page,
			limit: this.state.limit,
			others: [{
				"key": "action",
				"value": 502,
			}],
		}
		getTask(this.initTask, params);
		this.setState({
			page
		});
	}

	componentWillMount() {
		let params = {
			others: [{
				"key": "action",
				"value": 502,
			}]
		}
		getTaskNumber(this.setNumberOfGood, params);
	}

	updateTask(others) {
		others.push({
			"key": "action",
			"value": 502,
		});
		console.log('others:', others)
		let params = {
			page: this.state.page,
			limit: this.state.limit,
			others: others
		}
		getTask(this.initTask, params);
	}

	initTask(testMove) {
		let task = testMove;
		let oriTask = [];
		for (let i in task)
			oriTask.push(task[i])
		this.setState({
			task,
			oriTask
		});
	}

	setNumberOfGood(numberOfGood) {
		let numberOfPage = Math.ceil(numberOfGood / this.state.limit) || 1;
		let params = {
			page: this.state.page,
			limit: this.state.limit,
			others: [{
				"key": "action",
				"value": 502,
			}],
		}
		getTask(this.initTask, params);
		this.setState({
			numberOfGood,
			numberOfPage
		})
	}

	handleChange(event, index, value) {
		this.setState({
			sort: value,
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
		let [fromPlace, toPlace] = parseTaskPlace(task.migration);
		let status = ['未分配', '进行中', '已完成', '已取消'][task.status];
		return (
			<TableRow key={material.id}>
	        	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{material.id}</TableRowColumn>
	        	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{material.type}</TableRowColumn>
	        	<TableRowColumn style={{textAlign:'center'}}>{material.description}</TableRowColumn>
	        	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{import_time}</TableRowColumn>
	        	<TableRowColumn style={{textAlign:'center'}}>{fromPlace}</TableRowColumn>
	        	<TableRowColumn style={{textAlign:'center'}}>{toPlace}</TableRowColumn>
	        	<TableRowColumn style={{textAlign:'center'}}>{status}</TableRowColumn>
	        	<TableRowColumn style={{textAlign:'center'}}><RaisedButton label="详情" onTouchTap={() => changeHash(`/task/task_${task._id}`)} /></TableRowColumn>
			</TableRow>
		)
	}

	addPutaway() {
		changeHash('move');
	}

	printTable() {
		let table2excel = new Table2Excel();
		let name = '入库单' + parsetime(new Date(), 2);
		table2excel.export(document.getElementsByClassName('tablePrint')[1], name);
	}

	printBar() {
		if (this.state.choose) {
			let task = this.state.task;
			let selectes = this.state.selectes;
			selectes.map(i => downloadBarCode(task[i - 1].material.id))
			this.setState({
				choose: false
			});
		} else {
			this.setState({
				choose: true
			})
		}
	}

	doDelete() {
		let task = this.state.task;
		let selectes = this.state.selectes;
		let deleteObj = [];
		for (let i of selectes) {
			let id = task[i]._id;
			let mid = task[i].migration._id;
			deleteObj.push([id, mid]);
		}
		deleteTask(() => window.location.reload, {
			deleteObj: deleteObj
		});
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
			<Paper style={paperStyle} zDepth={1}>
			<div>
				<Selecter onChange={this.updateTask.bind(this)}/>
				<Toolbar>
					<ToolbarGroup firstChild={true}>
						<DropDownMenu value={this.state.sort} onChange={this.handleChange} iconStyle={{fill:'black'}}>
							<MenuItem value={1} primaryText="物资编码" />
							<MenuItem value={2} primaryText="物资类型" />
							<MenuItem value={3} primaryText="物资名称" />
							<MenuItem value={4} primaryText="下单时间" />
							<MenuItem value={5} primaryText="原始位置" />
							<MenuItem value={6} primaryText="目的地址" />
						</DropDownMenu>
			        	<TextField
					    	hintText="在结果中筛选"
					    	hintStyle={{color:'gray'}}
					    	onChange={this.pick.bind(this)}
					  	/>
			        </ToolbarGroup>
			        <ToolbarGroup>
			          <ToolbarSeparator />
			          <RaisedButton 
			          	label="删除"
			          	primary={true}
			          	style={{display:this.state.isDelete?'inline-block':'none'}}
			          	onTouchTap={this.doDelete.bind(this)}/>
			          <RaisedButton
			          	label={this.state.isDelete?"取消删除":"选择删除"}
			          	primary={true}
			          	onTouchTap={()=>{
			          		let isDelete = !this.state.isDelete;
			          		this.setState({isDelete})
			          	}}/>
			          <RaisedButton label="打印出库单" primary={true} onTouchTap={this.printTable.bind(this)}/>
			          <RaisedButton label={this.state.choose?"打印条形码":"选择打印条形码"} primary={true} onTouchTap={this.printBar.bind(this)}/>
			        </ToolbarGroup>
				</Toolbar>
				<Table
					multiSelectable={this.state.choose||this.state.isDelete}
					selectable={this.state.choose||this.state.isDelete}
					onRowSelection={(selectes)=>this.setState({selectes})}
					className="tablePrint">
				    <TableBody
				    	displayRowCheckbox={this.state.choose||this.state.isDelete}
				    	deselectOnClickaway={false}>
						<TableRow selectable={false}>
				        	<TableRowColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17}}>物资编号</TableRowColumn>
				        	<TableRowColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17}}>物资类型</TableRowColumn>
				        	<TableRowColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17}}>物资数量</TableRowColumn>
				        	<TableRowColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17}}>下单时间</TableRowColumn>
				        	<TableRowColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17}}>原始位置</TableRowColumn>
				        	<TableRowColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17}}>目的地址</TableRowColumn>
				        	<TableRowColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17}}>状态</TableRowColumn>
				        	<TableRowColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17}}>详情</TableRowColumn>
			    		</TableRow>
				    	{this.renderRow.call(this)}
				    </TableBody>
				</Table>
				<div style={{textAlign:'center'}}>
					<SelectPage changePage={this.changePage.bind(this)} page={this.state.page} numberOfPage={this.state.numberOfPage}/>
				</div>
			</div>
			</Paper>
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