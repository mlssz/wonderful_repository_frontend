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

let sessionName = 'outtask';

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
		let task = JSON.parse(sessionStorage.getItem(sessionName));
		if (task.from === undefined) {
			task.from = randomNum(1, 3) + ' 仓 ' + randomNum(1, 10) + ' 架 ' + randomNum(1, 3) + ' 层 ';
		}
		task.id = makeId();
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
		changeHash('out');
	}

	putaway() {
		sessionStorage.removeItem(sessionName);
		this.setState({
			mes: '移动成功，3秒后返回移动页面',
			open: true,
		})
		setTimeout(() => changeHash('out'), 3000);
	}

	closeBar(tab = 0) {
		this.setState({
			open: false,
		})
		if (tab === 1)
			changeHash('out');
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