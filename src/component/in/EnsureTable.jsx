import React from 'react'
import {
	Table,
	TableBody,
	TableRow,
	TableRowColumn
} from 'material-ui/Table'
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton'

import {
	formName,
	randomNum,
	makeId,
	parsePlace,
	parsetime,
	changeHash
} from '../../libs/common.js'

export default class ReactClassName extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			task: {},
			open: false,
			mes: '',
		}
		this.renderRow = this.renderRow.bind(this);
		this.closeBar = this.closeBar.bind(this);
		this.putaway = this.putaway.bind(this);
	}

	componentWillMount() {
		let task = JSON.parse(sessionStorage.getItem('intask'));
		if (task.repository_id === undefined) {
			task.repository_id = randomNum(1, 3);
			task.location_id = randomNum(1, 10);
			task.layer = randomNum(1, 3);
		}
		console.log(task)
		task.id = makeId();
		let to = parsePlace(task);
		task.to = to;
		task.type = task.type.join('-');
		this.setState({
			task
		})
	}

	renderRow() {
		let task = this.state.task;
		let tableBody = [];
		for (let i in task) {
			if (!!formName[i]) {
				let tag = !(i === 'estimated_export_time');
				let row =
					<TableRow key={i}>
				        <TableRowColumn style={{fontSize:16}}>{formName[i]}</TableRowColumn>
				        <TableRowColumn style={{fontSize:16}}>{tag?task[i]:parsetime(task[i],0)}</TableRowColumn>
			    	</TableRow>
				tableBody.push(row);
			}
		}
		return tableBody;
	}

	cancel() {
		changeHash('putaway');
	}

	putaway() {
		sessionStorage.removeItem('intask');
		this.setState({
			mes: '入库成功，3秒后返回入库页面',
			open: true,
		})
		setTimeout(() => changeHash('putaway'), 3000);
	}

	closeBar(tab = 0) {
		this.setState({
			open: false,
		})
		if (tab === 1)
			changeHash('putaway');
	}

	render() {
		return (
			<div>
				<Table
					selectable={false}
					style={{width:"80%",margin:"0 auto"}}>
				    <TableBody
				    	displayRowCheckbox={false}
				    	deselectOnClickaway={false}>
				      {this.renderRow()}
				    </TableBody>
				</Table>
				<div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',width:'80%',margin:'20 auto'}}>
					<RaisedButton label="重新填写" primary={true} onTouchTap={this.cancel}/>
					<RaisedButton label="确认" primary={true} onTouchTap={this.putaway}/>
				</div>
				<Snackbar
					open={this.state.open}
					message={this.state.mes}
					autoHideDuration={3000}
					onRequestClose={this.closeBar}
					action="立即跳转"
					onActionTouchTap={()=>this.closeBar(1)}
		        />
			</div>
		)
	}
}