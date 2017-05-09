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
} from '../../libs/common.js'
import {
	getPersonNum,
	getPerson,
	move,
	addPerson,
	updatePerson
} from '../../libs/callToBack.js'

import * as sortGood from '../../libs/sortGood.js'
import Selecter from '../in/Selecter.jsx'
import SelectPage from '../in/SelectPage.jsx'

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
		}
		getPerson(this.initGood, params);
		this.setState({
			page
		});
	}

	componentWillMount() {
		getPersonNum(this.setNumberOfGood);
	}

	updateGood(others) {
		let params = {
			page: this.state.page,
			limit: this.state.limit,
			others: others
		}
		getPerson(this.initGood, params);
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
		}
		getPerson(this.initGood, params);
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
		console.log(person)
		person.isUpdate = true;
		this.setState({
			showAdd: true,
			params: person
		})
	}

	renderRowColumn(good, i) {
		return (
			<TableRow key={good.id}>
		       	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{good.account}</TableRowColumn>
		       	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{good.name}</TableRowColumn>
		       	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{good.passwd}</TableRowColumn>
		       	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{['女','男'][good.sex]}</TableRowColumn>
		       	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{good.age}</TableRowColumn>
		       	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{['管理员','员工'][good.permission]}</TableRowColumn>
		       	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{parsetime(good.signup_time)}</TableRowColumn>
		       	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{parsetime(good.last_login_time)}</TableRowColumn>
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
							<MenuItem value={1} primaryText="职员账户" />
							<MenuItem value={2} primaryText="职员姓名" />
							<MenuItem value={3} primaryText="职员密码" />
							<MenuItem value={4} primaryText="职员性别" />
							<MenuItem value={5} primaryText="职员年龄" />
							<MenuItem value={6} primaryText="职员权限" />
						</DropDownMenu>
						<TextField
					    	hintText="在结果中筛选"
					    	hintStyle={{color:'gray'}}
					    	onChange={this.pick.bind(this)}
					  	/>
			        </ToolbarGroup>
			        <ToolbarGroup>
			        	<RaisedButton
			        		label='新增员工'
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
					        	<TableHeaderColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17,color:'black'}}>职员账户</TableHeaderColumn>
					        	<TableHeaderColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17,color:'black'}}>职员姓名</TableHeaderColumn>
					        	<TableHeaderColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17,color:'black'}}>职员密码</TableHeaderColumn>
					        	<TableHeaderColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17,color:'black'}}>职员性别</TableHeaderColumn>
					        	<TableHeaderColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17,color:'black'}}>职员年龄</TableHeaderColumn>
					        	<TableHeaderColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17,color:'black',overflow:'visible'}}>职员权限</TableHeaderColumn>
					        	<TableHeaderColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17,color:'black'}}>注册时间</TableHeaderColumn>
					        	<TableHeaderColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17,color:'black'}}>最近登录时间</TableHeaderColumn>
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
			name: this.props.params.name || '',
			account: this.props.params.account || '',
			passwd: this.props.params.passwd || '',
			sex: this.props.params.sex || '',
			age: this.props.params.age || '',
			permission: this.props.params.permission || '',
			isUpdate: this.props.params.isUpdate || false,
		}
	}

	shouldComponentUpdate(props) {
		this.setState({
			id: props.params._id,
			name: props.params.name,
			account: props.params.account,
			passwd: props.params.passwd,
			sex: props.params.sex,
			age: props.params.age,
			permission: props.params.permission,
			isUpdate: props.params.isUpdate
		})
		return true;
	}

	add() {
		let isTrue = true;
		let params = this.state;
		let length_1 = this.state.account.length;
		let length_2 = this.state.passwd.length;
		let length_3 = this.state.name.length;
		if (length_1 < 6) {
			this.setState({
				errorPsw: '密码长度至少为6位'
			})
			isTrue = false;
		}
		if (length_2 < 6) {
			this.setState({
				errorAccount: '账户长度至少为6位'
			})
			isTrue = false;
		}
		if (length_3 < 2) {
			this.setState({
				errorName: '姓名长度至少为2位'
			})
			isTrue = false;
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
				title={!this.state.isUpdate?"新增员工":"修改信息"}
				actions={actions}
				modal={false}
				open={this.props.open}
				autoDetectWindowHeight={false}
				onRequestClose={this.props.close}>
				<div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
					<div style={{display:'flex',justifyContent:'space-around',alingItems:'center'}}>
						<TextField
							floatingLabelText="姓名"
							floatingLabelStyle={{color:'gray'}}
							value={this.state.name}
							errorText={this.state.errorName}
							onChange={(e,name)=>this.setState({name})}
						/>
						<TextField
							floatingLabelText="账号"
							floatingLabelStyle={{color:'gray'}}
							value={this.state.account}
							errorText={this.state.errorAccount}
							onChange={(e,account)=>this.setState({account})}
						/>
					</div>
					<div style={{display:'flex',justifyContent:'space-around',alingItems:'center'}}>
						<TextField
							floatingLabelText="密码"
							floatingLabelStyle={{color:'gray'}}
							value={this.state.passwd}
							errorText={this.state.errorPsw}
							onChange={(e,passwd)=>this.setState({passwd})}
						/>
						<SelectField
				          floatingLabelText="性别"
				          floatingLabelStyle={{color:'gray'}}
				          value={this.state.sex}
				          onChange={(e,i,sex)=>this.setState({sex})}
				        >
				          <MenuItem value={1} primaryText="男" />
				          <MenuItem value={0} primaryText="女" />
				        </SelectField>
			        </div>
			       	<div style={{display:'flex',justifyContent:'space-around',alingItems:'center'}}>
						<TextField
							floatingLabelText="年龄"
							floatingLabelStyle={{color:'gray'}}
							value={this.state.age}
							onChange={(e,age)=>this.setState({age})}
						/>
						<SelectField
				          floatingLabelText="权限"
				          floatingLabelStyle={{color:'gray'}}
				          value={this.state.permission}
				          onChange={(e,i,permission)=>this.setState({permission})}
				        >
				          <MenuItem value={1} primaryText="职员" />
				          <MenuItem value={0} primaryText="管理员" />
				        </SelectField>
			        </div>
				</div>
			</Dialog>
		)
	}
}