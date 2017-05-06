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

import SelectPage from './SelectPage.jsx';
import {
	testTask,
	parseParams,
	parsetime,
	parseTaskPlace,
	changeHash,
	downloadBarCode,
	paperStyle,
} from '../../libs/common.js'
import {
	getTaskNumber,
	getTask
} from '../../libs/callToBack.js'

import * as sortTask from '../../libs/sortTask.js'
import Selecter from './Selecter.jsx'

export default class Manage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
		this.initTask = this.initTask.bind(this);
		this.setNumberOfGood = this.setNumberOfGood.bind(this);
	}

	changePage(page) {
		let params = {
			page: page,
			limit: this.state.limit,
			others: [{
				"key": "action",
				"value": 500,
			}],
		}
		getTask((task) => this.setState({
			task
		}), params);
		this.setState({
			page
		});
	}

	componentWillMount() {
		let params = {
			others: [{
				"key": "action",
				"value": 500,
			}]
		}
		getTaskNumber(this.setNumberOfGood, params);
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
				"value": 500,
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
		let status = ['未开始', '进行中', '已完成', '已取消'][task.status];
		return (
			<TableRow key={material.id}>
	        	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{material.id}</TableRowColumn>
	        	<TableRowColumn style={{textAlign:'center'}}>{material.type}</TableRowColumn>
	        	<TableRowColumn style={{textAlign:'center'}}>{material.description}</TableRowColumn>
	        	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{import_time}</TableRowColumn>
	        	<TableRowColumn style={{textAlign:'center'}}>{fromPlace}</TableRowColumn>
	        	<TableRowColumn style={{textAlign:'center'}}>{toPlace}</TableRowColumn>
	        	<TableRowColumn style={{textAlign:'center'}}>{status}</TableRowColumn>
	        	<TableRowColumn style={{textAlign:'center'}}><RaisedButton label="详情" onTouchTap={() => changeHash(`/task/task_${task._id}`)}/></TableRowColumn>
			</TableRow>
		)
	}

	addPutaway() {
		changeHash('putaway');
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
				<Selecter/>
				<Toolbar>
					<ToolbarGroup firstChild={true}>
						<DropDownMenu value={this.state.sort} onChange={this.handleChange} iconStyle={{fill:'black'}}>
							<MenuItem value={1} primaryText="物资编号" />
							<MenuItem value={2} primaryText="物资类型" />
							<MenuItem value={3} primaryText="物资名称" />
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
			          <RaisedButton label="打印入库单" primary={true} onTouchTap={this.printTable.bind(this)}/>
			          <RaisedButton label={this.state.choose?"打印条形码":"选择打印条形码"} primary={true} onTouchTap={this.printBar.bind(this)}/>
			        </ToolbarGroup>
				</Toolbar>
				<Table
					multiSelectable={this.state.choose}
					selectable={this.state.choose}
					onRowSelection={(selectes)=>this.setState({selectes})}
					className="tablePrint">
				    <TableBody
				    	displayRowCheckbox={this.state.choose}
				    	deselectOnClickaway={false}>
						<TableRow selectable={false}>
				        	<TableRowColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17}}>物资编号</TableRowColumn>
				        	<TableRowColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17}}>物资类型</TableRowColumn>
				        	<TableRowColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17}}>物资数量</TableRowColumn>
				        	<TableRowColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17}}>入库时间</TableRowColumn>
				        	<TableRowColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17}}>原始位置</TableRowColumn>
				        	<TableRowColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17}}>入库地址</TableRowColumn>
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
