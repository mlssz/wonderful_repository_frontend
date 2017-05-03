import React from 'react'
import SelectField from 'material-ui/SelectField';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'

import {
	styles,
	types,
	parsetime,
	objIsEmpty,
	changeHash
} from '../../libs/common.js'
import {
	getLoc
} from '../../libs/callToBack.js'
let taskType = 'intask';

export default class TaskForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			secondType: [],
			task: {},
			error: {},
			locationVisible: false,
			auto: true,
		};
		this.handleChange = this.handleChange.bind(this);
		this.cancel = this.cancel.bind(this);
		this.putaway = this.putaway.bind(this);
		this.setType = this.setType.bind(this);
	}

	componentWillMount() {
		let task = JSON.parse(sessionStorage.getItem(taskType));
		if (!task)
			task = {
				type: [],
				num: '',
				description: '',
				// repository_id: '',
				// location_id: '',
				// layer: '',
				estimated_export_time: null,
			}
		this.setState({
			task
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
		//delete when add backend
		sessionStorage.setItem(taskType, JSON.stringify(task));
		changeHash('putawayEnsure');
	}

	render() {
		return (
			<MuiThemeProvider>
				<div style={styles.container}>
					<div>
						<Checkbox
					      label="自动分配地址"
					      checked={this.state.auto}
					      onCheck={(e,auto)=>this.setState({auto})}
					      style={{display:'inline'}}
					    />
					    <Checkbox
					      label="手动填写地址"
					      checked={!this.state.auto}
					      onCheck={(e,auto)=>this.setState({auto:!auto})}
					      style={{display:'inline'}}
					    />
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
							style={styles.formItem}
							onChange={(e,v)=>this.handleChange(v,'num')}
						/>

					</div>

					<div>
					    <SelectField
							floatingLabelText="仓"
							floatingLabelStyle={{color:'gray'}}
							value={this.state.task.repository_id}
							errorText={this.state.error.repository_id}
							style={{width:100}}
							onChange={(e,i,v)=>this.handleChange(v,'repository_id')}
			        	>
		        			{this.renderMenuItem([1,2,3])}
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
				    	<p style={{width:300,color:'gray',margin:0,fontSize:12}}>
							入库地址(空则为系统分配)
				    	</p>
			    	</div>

			    	<DatePicker 
				    	floatingLabelText="估计出库时间"
				    	floatingLabelStyle={{color:'gray'}}
				    	value={this.state.task.estimated_export_time===null?this.state.task.estimated_export_time:new Date(this.state.task.estimated_export_time)}
				    	errorText={this.state.error.estimated_export_time}
				    	style={styles.formItem}
						onChange={(e,v)=>this.handleChange(+v,'estimated_export_time')}/>
					<TextField
						floatingLabelText="物资描述"
						floatingLabelStyle={{color:'gray'}}
						value={this.state.task.description}
						errorText={this.state.error.description}
						multiLine={true}
						style={styles.formItem}
						onChange={(e,v)=>this.handleChange(v,'description')}
			    	/>
					
					<br/>

					<div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',width:'80%',margin:'20 auto'}}>
						<RaisedButton label="重新填写" primary={true} onTouchTap={this.cancel}/>
						<RaisedButton label="确认" primary={true} onTouchTap={this.putaway}/>
					</div>
				</div>
			</MuiThemeProvider>
		)
	}
}