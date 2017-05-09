import React from 'react'
import SelectField from 'material-ui/SelectField';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn
} from 'material-ui/Table'

import {
	styles,
	types,
	parsetime,
	objIsEmpty,
	changeHash,
	parsePlace,
	testTask,
	downloadBarCode,
	status,
} from '../../libs/common.js'
import {
	putaway,
	getGoodNumber,
	getGood,
	mergeGoods,
	deleteGood
} from '../../libs/callToBack.js'
import SelectPage from './SelectPage.jsx';
let taskType = 'intask';

export default class TaskForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			secondType: [],
			task: {},
			error: {},
			locationVisible: false,
			auto: false,
			alreadyTask: [],
			page: 1,
			limit: 10,
			numberOfPage: 1,
			numberOfGood: 0,
			selectes: [],
			isAction: false,
			isPrint: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.cancel = this.cancel.bind(this);
		this.putaway = this.putaway.bind(this);
		this.setType = this.setType.bind(this);
		this.addAlreadyTask = this.addAlreadyTask.bind(this);
		this.setNumberOfGood = this.setNumberOfGood.bind(this);
		this.renderRowColumn = this.renderRowColumn.bind(this);
		this.deleteGood = this.deleteGood.bind(this);
	}

	changePage(page) {
		let params = {
			page: page,
			limit: this.state.limit,
			others: [{
				"key": "status",
				"value": 300,
			}],
		}
		getGood((alreadyTask) => this.setState({
			alreadyTask: alreadyTask
		}), params);
		this.setState({
			page
		});
	}

	componentWillMount() {
		let task = {
			type: [],
			num: '',
			description: '',
			repository_id: '',
			location_id: '',
			layer: '',
			estimated_export_time: null,
		}
		let params = {
			others: [{
				"key": "status",
				"value": 300,
			}],
		}
		getGoodNumber(this.setNumberOfGood, params);
		this.setState({
			task
		})
	}

	setNumberOfGood(numberOfGood) {
		let numberOfPage = Math.ceil(numberOfGood / this.state.limit) || 1;
		let params = {
			page: this.state.page,
			limit: this.state.limit,
			others: [{
				"key": "status",
				"value": 300,
			}],
		}
		getGood(this.addAlreadyTask, params);
		this.setState({
			numberOfGood,
			numberOfPage
		})
	}

	handleChange(value, type) {
		let task = this.state.task;
		let error = this.state.error;
		task[type] = value;
		error[type] = '';
		this.setState({
			task
		});
	}

	setType(value) {
		let task = this.state.task;
		let error = this.state.error;
		task.type[0] = value;
		error.type = '';
		this.setState({
			task,
		});
	}

	setSecondType(value) {
		let task = this.state.task;
		let error = this.state.error;
		task.type[1] = value;
		error.type = '';
		this.setState({
			task,
		});
	}

	renderMenuItem(items, type = 1) {
		let MenuItems = [];
		if (type === 1) {
			return items.map((i, index) => <MenuItem value={i} key={index} primaryText={i} />)
		}
		if (type === 2) {
			for (let i in items) {
				let item = <MenuItem value={i} key={i} primaryText={i} />;
				MenuItems.push(item);
			}
			return MenuItems;
		}
	}

	cancel() {
		sessionStorage.removeItem(taskType);
		let task = this.state.task;
		for (let i in task) {
			task[i] = null;
			if (i === 'num' || i === 'description')
				task[i] = '';
			if (i === 'type')
				task[i] = {};
		}
		this.setState({
			task
		})
	}

	addAlreadyTask(_alreadyTask) {
		let alreadyTask = this.state.alreadyTask;
		Array.prototype.push.apply(alreadyTask, _alreadyTask);
		this.setState({
			alreadyTask
		})
	}

	deleteGood(id) {
		console.log(id)
		let params = {
			id: id
		};
		deleteGood(() => window.location.reload(), params);
	}

	putaway() {
		let task = this.state.task;
		let [isEmpty, emptyKeys] = objIsEmpty(task);
		if (isEmpty) {
			let error = {};
			emptyKeys.map((key) => error[key] = '请填写完整!');
			this.setState({
				error
			});
			return false;
		}
		putaway(() => window.location.reload(), {
			task: task
		})
	}

	renderRow() {
		let tasks = this.state.alreadyTask;
		return (
			tasks.map(this.renderRowColumn)
		)
	}

	renderRowColumn(task) {
		let import_time = parsetime(task.import_time);
		let estimated_export_time = parsetime(task.estimated_export_time);
		let toPlace = parsePlace(task);
		// <TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{material.id}</TableRowColumn>
		return (
			<TableRow key={task.id}>
				<TableRowColumn style={{overflow:'visible',textAlign:'center'}}>{task.id}</TableRowColumn>
	        	<TableRowColumn style={{overflow:'visible',textAlign:'center'}}>{task.type}</TableRowColumn>
	        	<TableRowColumn style={{overflow:'visible',textAlign:'center'}}>{task.description}</TableRowColumn>
	        	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{import_time}</TableRowColumn>
	        	<TableRowColumn style={{textAlign:'center'}}>{toPlace}</TableRowColumn>
	        	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{estimated_export_time}</TableRowColumn>
	        	<TableRowColumn style={{textAlign:'center'}}>{status[task.status]}</TableRowColumn>
	        	<TableRowColumn style={{textAlign:'center'}}><RaisedButton label="删除" onTouchTap={()=>this.deleteGood(task._id)} secondary={true} /></TableRowColumn>
			</TableRow>
		)
	}

	print() {
		if (this.state.isPrint) {
			let task = this.state.alreadyTask;
			let selectes = this.state.selectes;
			let _ids = [];
			if (selectes === "all") {
				for (let ids of task) {
						_ids.push(ids.id);
				}
			} else {
				for (let i of selectes) {
					let ids = task[i].id;
					_ids.push(ids);
				}
			}
			console.log(_ids)
			for (let id of _ids) {
				downloadBarCode(id)
			}
			this.setState({
				isPrint: false
			});
		} else {
			this.setState({
				isPrint: true
			})
		}
	}

	render() {
		return (
			<MuiThemeProvider>
				<div style={styles.container}>
					<div style={{display:'flex',flexDirection:'row',height:72}}>
						<Checkbox
					      label="自动分配地址"
					      checked={this.state.auto}
					      onCheck={(e,auto)=>{
					      	let task = this.state.task;
					      	delete task.repository_id;
					      	delete task.location_id;
					      	delete task.layer;
					      	if(!auto){
								task.repository_id='';
								task.location_id='';
								task.layer='';
							}
					      	this.setState({auto,task});
					      }}
					      style={{width:200,marginTop:30}}
					    />
					    <Checkbox
					      label="手动填写地址"
					      checked={!this.state.auto}
					      onCheck={(e,auto)=>{
							let task = this.state.task;
							if(!task.repository_id){
								task.repository_id='';
								task.location_id='';
								task.layer='';
							}
							if(!auto){
								delete task.repository_id;
					      		delete task.location_id;
					      		delete task.layer;
							}
					      	this.setState({auto:!auto,task});
					      }}
					      style={{width:200,marginTop:30}}
					    />
						{
							!this.state.auto?
							<div>
							    <SelectField
									floatingLabelText="仓"
									floatingLabelStyle={{color:'gray'}}
									value={this.state.task.repository_id}
									errorText={this.state.error.repository_id}
									style={{width:100}}
									onChange={(e,i,v)=>this.handleChange(v,'repository_id')}
					        	>
				        			{this.renderMenuItem([1])}
				        		</SelectField>
						        <SelectField
									floatingLabelText="架"
									floatingLabelStyle={{color:'gray'}}
									value={this.state.task.location_id}
									errorText={this.state.error.location_id}
									style={{width:100}}
									onChange={(e,i,v)=>this.handleChange(v,'location_id')}
						        >
						        	{this.renderMenuItem([1,2,3,4,5,6,7,8,9,10])}
						        </SelectField>
						        <SelectField
									floatingLabelText="层"
									floatingLabelStyle={{color:'gray'}}
									value={this.state.task.layer}
									errorText={this.state.error.layer}
									style={{width:100}}
									onChange={(e,i,v)=>this.handleChange(v,'layer')}
						        >
				        			{this.renderMenuItem([1,2,3])}
				        		</SelectField>
				    		</div>:false
						}

					</div>
					<div style={{display:'flex'}}>

						<SelectField
				          	floatingLabelText="类型"
							floatingLabelStyle={{color:'gray'}}
							value={this.state.task.type[0]}
							errorText={this.state.error.type}
							style={styles.formItem}
							onChange={(e,i,v)=>this.setType(v)}
			        	>
			        	{this.renderMenuItem(types,2)}
			        	</SelectField>

		       			<SelectField
				          	floatingLabelText="详细"
							floatingLabelStyle={{color:'gray'}}
							value={this.state.task.type[1]}
							errorText={this.state.error.type}
							style={styles.formItem}
							onChange={(e,i,v)=>this.setSecondType(v)}
		        		>
		        			{this.renderMenuItem(types[this.state.task.type[0]]||[])}
				        </SelectField>

				        <TextField
							floatingLabelText="数量"
							floatingLabelStyle={{color:'gray'}}
							value={this.state.task.num}
							errorText={this.state.error.num}
							style={Object.assign(styles.formItem,{width:50})}
							inputStyle={{width:50}}
							onChange={(e,v)=>this.handleChange(v,'num')}
						/>

				    	<DatePicker 
					    	floatingLabelText="估计出库时间"
					    	floatingLabelStyle={{color:'gray'}}
					    	value={this.state.task.estimated_export_time===null?this.state.task.estimated_export_time:new Date(this.state.task.estimated_export_time)}
					    	errorText={this.state.error.estimated_export_time}
					    	style={styles.formItem}
					    	autoOk={true}
					    	textFieldStyle={{width:150}}
							onChange={(e,v)=>this.handleChange(+v,'estimated_export_time')}
						/>

						<TextField
							floatingLabelText="物资名称"
							floatingLabelStyle={{color:'gray'}}
							value={this.state.task.description}
							errorText={this.state.error.description}
							multiLine={true}
							style={Object.assign(styles.formItem,{width:200})}
							onChange={(e,v)=>this.handleChange(v,'description')}
				    	/>

					</div>

					<div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',width:'80%',margin:'5 auto'}}>
						<RaisedButton label="重新填写" primary={true} onTouchTap={this.cancel}/>
						<RaisedButton label="确认入库" primary={true} onTouchTap={this.putaway}/>
						<RaisedButton label={!this.state.isPrint?"选择打印":"打印"} primary={true} onTouchTap={this.print.bind(this)}/>
					</div>

					<Table
						selectable={this.state.true}
						multiSelectable={true}
						onRowSelection={(selectes)=>this.setState({selectes})}
						className="tablePrint">
						<TableHeader
							adjustForCheckbox={this.state.isPrint}
							displaySelectAll={this.state.isPrint}>>
							<TableRow>
								<TableHeaderColumn style={{color:'black',textAlign:'center',fontWeight: 'bold',fontSize:17}}>物资编号</TableHeaderColumn>
					        	<TableHeaderColumn style={{color:'black',textAlign:'center',fontWeight: 'bold',fontSize:17}}>物资类型</TableHeaderColumn>
					        	<TableHeaderColumn style={{color:'black',textAlign:'center',fontWeight: 'bold',fontSize:17}}>物资名称</TableHeaderColumn>
					        	<TableHeaderColumn style={{color:'black',textAlign:'center',fontWeight: 'bold',fontSize:17}}>入库时间</TableHeaderColumn>
					        	<TableHeaderColumn style={{color:'black',textAlign:'center',fontWeight: 'bold',fontSize:17}}>入库地址</TableHeaderColumn>
					        	<TableHeaderColumn style={{color:'black',textAlign:'center',fontWeight: 'bold',fontSize:17,overflow:'visible'}}>估计出库时间</TableHeaderColumn>
					        	<TableHeaderColumn style={{color:'black',textAlign:'center',fontWeight: 'bold',fontSize:17}}>状态</TableHeaderColumn>
					        	<TableHeaderColumn style={{color:'black',textAlign:'center',fontWeight: 'bold',fontSize:17}}>操作</TableHeaderColumn>
				    		</TableRow>
						</TableHeader>
					    <TableBody
					    	displayRowCheckbox={this.state.isPrint}
					    	deselectOnClickaway={false}>
					    	{this.renderRow.call(this)}
					    </TableBody>
					</Table>
					<SelectPage changePage={this.changePage.bind(this)} page={this.state.page} numberOfPage={this.state.numberOfPage}/>
				</div>
			</MuiThemeProvider>
		)
	}
}
