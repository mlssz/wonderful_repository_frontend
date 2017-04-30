import React from 'react'
import SelectField from 'material-ui/SelectField';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import AutoComplete from 'material-ui/AutoComplete'

import {
	styles,
	types,
	parsetime,
	objIsEmpty,
	changeHash,
	randomNum
} from '../../libs/common.js'

let placeFrom = [];

export default class TaskForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			secondType: [],
			task: {},
			error: {},
			locationVisible: false,
			dataSource: ['1491451593158', '1491451593200'],
		};
		this.handleChange = this.handleChange.bind(this);
		this.cancel = this.cancel.bind(this);
		this.move = this.move.bind(this);
		this.setType = this.setType.bind(this);
		this.setId = this.setId.bind(this);
	}

	componentWillMount() {
		let task = JSON.parse(sessionStorage.getItem('task'));
		if (!task)
			task = {
				type: [],
				num: '',
				// id:'',
				// placeFrom:'',
				// repository_id: '',
				// location_id: '',
				// layer: '',
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
		placeFrom = [];
		for (let i = 0; i < 10; i++) {
			let repository_id = randomNum(1, 3);
			let location_id = randomNum(1, 10);
			let layer = randomNum(1, 3);
			placeFrom.push(repository_id + ' 仓 ' + location_id + ' 架 ' + layer + ' 层 ');
		}
	}

	setId(v) {
		let task = this.state.task;
		let error = this.state.error;
		task.id = v;
		error.id = '';
		if (v.length === 13) {
			task.type[0] = '生活电器';
			task.type[1] = '生活电器';
			for (let i = 0; i < 10; i++) {
				placeFrom.push(randomNum(1, 3) + ' 仓 ' + randomNum(1, 10) + ' 架 ' + randomNum(1, 3) + ' 层 ');
			}
		}
		this.setState({
			task
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
		sessionStorage.removeItem('movetask');
		let task = this.state.task;
		for (let i in task) {
			task[i] = null;
			if (i === 'num' || i === 'id')
				task[i] = '';
			if (i === 'type')
				task[i] = [];
		}
		this.setState({
			task
		})
	}

	move() {
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
		sessionStorage.setItem('movetask', JSON.stringify(task));
		changeHash('moveEnsure');
	}

	render() {
		return (
			<MuiThemeProvider>
				<div style={styles.container}>
					<AutoComplete
						floatingLabelText="物品编号(可不填)"
						floatingLabelStyle={{color:'gray'}}
						value={this.state.task.id||''}
						errorText={this.state.error.id}
						style={styles.formItem}
						dataSource={this.state.dataSource}
						onUpdateInput={this.setId}
					/>
					<br/>
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
	       			<br/>
			       	<SelectField
			          	floatingLabelText="详细"
						floatingLabelStyle={{color:'gray'}}
						value={this.state.task.type[1]}
						errorText={this.state.error.detail}
						style={styles.formItem}
						onChange={(e,i,v)=>this.setSecondType(v)}>
			        	{this.renderMenuItem(types[this.state.task.type[0]]||[])}
			        </SelectField>
	        		<br/>
			        <TextField
						floatingLabelText="数量"
						floatingLabelStyle={{color:'gray'}}
						value={this.state.task.num}
						errorText={this.state.error.num}
						style={styles.formItem}
						onChange={(e,v)=>this.handleChange(v,'num')}
					/>
					<br/>
					<SelectField
						floatingLabelText="现处地址(空则随机)"
						floatingLabelStyle={{color:'gray'}}
						value={this.state.task.from}
						errorText={this.state.error.from}
						style={styles.formItem}
						onChange={(e,i,v)=>this.handleChange(v,'from')}
			        >
			        	{this.renderMenuItem(placeFrom)}
			        </SelectField>
			        <br/>
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
							目的地址(空则为系统分配)
				    	</p>
				    </div>
		        	<br/>
					<div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',width:'80%',margin:'20 auto'}}>
						<RaisedButton label="重新填写" primary={true} onTouchTap={this.cancel}/>
						<RaisedButton label="确认" primary={true} onTouchTap={this.move}/>
					</div>
				</div>
			</MuiThemeProvider>
		)
	}
}