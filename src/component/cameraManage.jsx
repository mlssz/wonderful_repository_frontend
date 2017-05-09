import React from 'react'
import {
	Toolbar,
	ToolbarGroup,
	ToolbarSeparator,
	ToolbarTitle
} from 'material-ui/Toolbar'
import {
	Table,
	TableHeader,
	TableHeaderColumn,
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
import Dialog from 'material-ui/Dialog'
import SelectField from 'material-ui/SelectField'

import {
	parseParams,
	parsetime,
	parsePlace,
	changeHash,
	downloadBarCode,
	paperStyle,
	status
} from '../libs/common.js'
import {
	getPersonNum,
	getPerson,
	move,
	addPerson,
	updatePerson
} from '../libs/callToBack.js'

import * as sortGood from '../libs/sortGood.js'
import Selecter from './in/Selecter.jsx'
import SelectPage from './in/SelectPage.jsx'

export default class Manage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isMove: false,
			showAdd: false,
			params: {},
			good: [],
			oriGood: [],
			sort: 1,
			action: false,
			selected: [],
			numberOfGood: 0,
			pageNumber: 1,
			page: 1,
			limit: 10,
			popOpen: false,
			position: {},
			error: {},
		}
		this.handleChange = this.handleChange.bind(this);
		this.setNumberOfGood = this.setNumberOfGood.bind(this);
		this.initGood = this.initGood.bind(this);
		this.renderRowColumn = this.renderRowColumn.bind(this);
		this.updatePerson = this.updatePerson.bind(this);
	}

	changePage(page) {
		let params = {
			page: page,
			limit: this.state.limit,
		};
		// getPerson(this.initGood, params);
		let camera = getCamera((page - 1) * this.state.limit, 10);
		this.initGood(camera);
		this.setState({
			page
		});
	}

	componentWillMount() {
		// getPersonNum(this.setNumberOfGood);
		this.setNumberOfGood(176);
	}

	updateGood(others) {
		let params = {
			page: this.state.page,
			limit: this.state.limit,
			others: others
		};
		// getPerson(this.initGood, params);
		let camera = getCamera((this.state.page - 1) * this.state.limit, 10);
		this.initGood(camera);
	}

	initGood(testGoods) {
		let good = testGoods;
		let oriGood = [];
		for (let i in good)
			oriGood.push(good[i])
		this.setState({
			good,
			oriGood
		});
	}

	setNumberOfGood(numberOfGood) {
		let pageNumber = Math.ceil(numberOfGood / this.state.limit) || 1;
		let params = {
			page: this.state.page,
			limit: this.state.limit,
		};
		// getPerson(this.initGood, params);
		let camera = getCamera((this.state.page - 1) * this.state.limit, 10);
		this.initGood(camera);
		this.setState({
			numberOfGood,
			pageNumber
		})
	}

	handleChange(event, index, value) {
		let good = this.state.good;
		this.setState({
			sort: value,
		})
	}

	renderRow() {
		let goods = this.state.good;
		return (
			goods.map((good, i) => this.renderRowColumn(good, i))
		)
	}

	updatePerson(person) {
		person.isUpdate = true;
		this.setState({
			showAdd: true,
			params: person
		})
	}

	renderRowColumn(good, i) {
		return (
			<TableRow key={good.id}>
				<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{good.id}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{good.arer}</TableRowColumn>
				<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{parsetime(good.time)}</TableRowColumn>
		       	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>
					<RaisedButton label="修改" onTouchTap={()=>this.updatePerson(good)}/>
		       	</TableRowColumn>
			</TableRow>
		)
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
				<Toolbar>
					<ToolbarGroup firstChild={true}>
						<DropDownMenu value={this.state.sort} onChange={this.handleChange} iconStyle={{fill:'black'}}>
							<MenuItem value={1} primaryText="终端号" />
							<MenuItem value={2} primaryText="安装时间" />
							<MenuItem value={3} primaryText="监控区域" />
						</DropDownMenu>
						<TextField
					    	hintText="在结果中筛选"
					    	hintStyle={{color:'gray'}}
					    	onChange={this.pick.bind(this)}
					  	/>
			        </ToolbarGroup>
			        <ToolbarGroup>
			        	<RaisedButton
			        		label='新增摄像头'
			        		primary={true}
			        		onTouchTap={()=>this.setState({showAdd:true})}
			        	/>
			        </ToolbarGroup>
				</Toolbar>
				<Table
					selectable={true}
					className="tablePrint"
					multiSelectable={true}
					onRowSelection={(selected)=>this.setState({selected})}>
						<TableHeader
							adjustForCheckbox={this.state.isMove}
							displaySelectAll={this.state.isMove}>
							<TableRow>
					        	<TableHeaderColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17,color:'black'}}>终端号</TableHeaderColumn>
					        	<TableHeaderColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17,color:'black'}}>监控区域</TableHeaderColumn>
					        	<TableHeaderColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17,color:'black'}}>安装时间</TableHeaderColumn>
					        	<TableHeaderColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17,color:'black'}}>操作</TableHeaderColumn>
							</TableRow>
			    		</TableHeader>
				    <TableBody
				    	deselectOnClickaway={false}
				    	displayRowCheckbox={this.state.isMove}>
						{this.renderRow.call(this)}
				    </TableBody>
				</Table>
				<div style={{textAlign:'center'}}>
					<SelectPage changePage={this.changePage.bind(this)} page={this.state.page} numberOfPage={this.state.pageNumber}/>
				</div>
			</div>
			<AddPerson params={this.state.params} close={()=>this.setState({showAdd:false,params:{}})} open={this.state.showAdd}/>
			</Paper>
		)
	}
}

function pickGood(good, v, sort) {
	let account = good.account;
	let name = good.name;
	let passwd = good.passwd;
	let sex = ['女', '男'][good.sex];
	let age = good.age;
	let permission = ['管理员', '员工'][good.permission]
	let selecter = [account, name, passwd, sex, age, permission];
	if (selecter[sort - 1].toString().replace(/\s/g, "").indexOf(v) >= 0) {
		return true;
	}
	return false;
}

function renderMenuItem(items, type = 1) {
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

class AddPerson extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			id: '',
			repository_id: '',
			location_id: '',
			error: {
				repository_id: '',
				layer: '',
				location_id: ''
			},
		}
	}

	// shouldComponentUpdate(props) {
	// 	this.setState({
	// 		id: props.id,
	// 		repository_id: props.repository_id,
	// 		location_id: props.location_id,
	// 		layer: props.layer,
	// 	})
	// 	return true;
	// }

	renderMenuItem(items) {
		let MenuItems = [];
		return items.map((i, index) => <MenuItem value={i} key={index} primaryText={i} />)

	}

	add() {
		let isTrue = true;
		let params = this.state;
		let error = {};
		for (let i in params)
			if (!params[i]) {
				isTrue = false;
				error[i] = '请填写完整';
				this.setState({
					error: error
				})
			}
		if (isTrue) {
			if (!params.isUpdate)
				addPerson(() => window.location.reload(), params)
			else
				updatePerson(() => window.location.reload(), params)
			this.props.close();
		}
	}

	render() {
		const actions = [
			<FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.props.close}
      />,
			<FlatButton
        label="确认"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.add.bind(this)}
      />,
		];
		return (
			<Dialog
				title={!this.state.isUpdate?"新增摄像头":"修改信息"}
				actions={actions}
				modal={false}
				open={this.props.open}
				autoDetectWindowHeight={false}
				onRequestClose={this.props.close}>
				<div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
					<div style={{display:'flex',justifyContent:'space-around',alingItems:'center'}}>
						<TextField
							floatingLabelText="终端号"
							floatingLabelStyle={{color:'gray'}}
							value={this.state.id}
							onChange={(e,id)=>this.setState({id})}
						/>
						<div>
						    <SelectField
								floatingLabelText="仓"
								floatingLabelStyle={{color:'gray'}}
								value={this.state.repository_id}
								errorText={this.state.error.repository_id||''}
								style={{width:100}}
								onChange={(e,i,repository_id)=>this.setState({repository_id})}
				        	>
			        			{this.renderMenuItem([1])}
			        		</SelectField>
					        <SelectField
								floatingLabelText="架"
								floatingLabelStyle={{color:'gray'}}
								value={this.state.location_id}
								errorText={this.state.error.location_id||''}
								style={{width:100}}
								onChange={(e,i,location_id)=>this.setState({location_id})}
					        >
					        	{this.renderMenuItem([1,2,3,4,5,6,7,8,9,10])}
					        </SelectField>
			    		</div>
					</div>
				</div>
			</Dialog>
		)
	}
}

function getCamera(from, times) {
	let camera = [];
	for (let i = 0; i < times; i++) {
		let id = 100000000001 + from + i;
		let arer = '1仓' + (Math.floor((from + i) / 4) + 1) + '架';
		let time = new Date();
		camera.push({
			id: id,
			arer: arer,
			time: time,
		})
	}
	return camera
}