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
	TableHeader,
	TableHeaderColumn,
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

import {
	testGoods,
	parseParams,
	parsetime,
	parsePlace,
	changeHash,
	downloadBarCode,
	paperStyle
} from '../../libs/common.js'
import {
	getGoodNumber,
	getGood,
	move
} from '../../libs/callToBack.js'

import * as sortGood from '../../libs/sortGood.js'
import Selecter from '../in/Selecter.jsx'
import SelectPage from '../in/SelectPage.jsx'

export default class Manage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isMove: false,
			good: [],
			oriGood: [],
			sort: 1,
			action: false,
			selected: [],
			numberOfGood: 0,
			pageNumber: 1,
			page: 1,
			limit: 10,
			position: {},
			error: {},
			destination: {},
			popOpen: false,
		}
		this.handleChange = this.handleChange.bind(this);
		this.meunClick = this.meunClick.bind(this);
		this.doAction = this.doAction.bind(this);
		this.setNumberOfGood = this.setNumberOfGood.bind(this);
		this.initGood = this.initGood.bind(this);
		this.renderRowColumn = this.renderRowColumn.bind(this);
	}

	changePage(page) {
		let params = {
			page: page,
			limit: this.state.limit,
			others: [{
				"key": "status",
				"value": 100,
			}],
		}
		getGood(this.initGood, params);
		this.setState({
			page
		});
	}

	componentWillMount() {
		let params = {
			others: [{
				"key": "status",
				"value": 100,
			}],
		}
		getGoodNumber(this.setNumberOfGood, params);
	}

	updateGood(others) {
		others.push({
			"key": "status",
			"value": 100,
		});
		let params = {
			page: this.state.page,
			limit: this.state.limit,
			others: others
		}
		getGood(this.initGood, params);
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
			others: [{
				"key": "status",
				"value": 100,
			}],
		}
		getGood(this.initGood, params);
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
			goods.map(this.renderRowColumn)
		)
	}
	renderRowColumn(good, i) {
		let import_time = parsetime(good.import_time);
		let estimated_export_time = parsetime(good.estimated_export_time, 0);
		let location_update_time = parsetime(good.location_update_time);
		let place = parsePlace(good);
		return (
			<TableRow key={good.id}>
		       	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{good.id}</TableRowColumn>
		       	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{good.type}</TableRowColumn>
		       	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{good.description}</TableRowColumn>
		       	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{import_time}</TableRowColumn>
		       	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{estimated_export_time}</TableRowColumn>
		       	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{location_update_time}</TableRowColumn>
		       	<TableRowColumn style={{overflow:"visible",textAlign:'center'}}>{place}</TableRowColumn>
		       	<TableRowColumn style={{textAlign:'center'}}><RaisedButton label="详情" onTouchTap={() => changeHash(`/material/${good._id}`)} /></TableRowColumn>
			</TableRow>
		)
	}

	doAction() {
		let selected = this.state.selected;
		let oriGood = this.state.good;
		let destination = this.state.destination;
		let goods = [];
		if (typeof selected === 'object' && selected.length === 0)
			return false;
		if (selected === "all")
			goods = oriGood;
		else {
			for (let i of selected)
				goods.push(oriGood[i]);
		}
		let place = {
			repository: -1,
			location: 0,
			layer: 0,
			num: goods.length,
		}
		move(() => window.location.reload(), {
			goods: goods,
			place: place,
			destination: destination,
		});
	}

	meunClick(event, child) {
		if (child.key === 'printTable') {
			let table2excel = new Table2Excel();
			let name = '入库单' + parsetime(new Date(), 2);
			table2excel.export(document.getElementsByClassName('tablePrint')[1], name);
		}
		if (child.key === 'printBar') {
			let good = this.state.good;
			let codes = [];
			for (let i in good) {
				downloadBarCode(good[i].material.id);
			}
		}
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
		const actions = [
			<FlatButton
        label="取消出库"
        primary={true}
        onTouchTap={()=>this.setState({popOpen:false})}
      />,
			<FlatButton
        label="确认出库"
        primary={true}
        keyboardFocused={true}
        onTouchTap={()=>this.doAction(true)}
      />,
		];
		return (
			<Paper style={paperStyle} zDepth={1}>
			<div>
				<Selecter onChange={this.updateGood.bind(this)}/>
				<Toolbar>
					<ToolbarGroup firstChild={true}>
						<DropDownMenu value={this.state.sort} onChange={this.handleChange} iconStyle={{fill:'black'}}>
							<MenuItem value={1} primaryText="物资编号" />
							<MenuItem value={2} primaryText="物资类型" />
							<MenuItem value={3} primaryText="物资名称" />
							<MenuItem value={4} primaryText="入库时间" />
							<MenuItem value={5} primaryText="估计出库时间" />
							<MenuItem value={6} primaryText="最近搬运时间" />
							<MenuItem value={7} primaryText="所处地址" />
						</DropDownMenu>
						<TextField
					    	hintText="在结果中筛选"
					    	hintStyle={{color:'gray'}}
					    	onChange={this.pick.bind(this)}
					  	/>
			        </ToolbarGroup>
			        <ToolbarGroup>
			        	<RaisedButton 
			        		label="确认出库"
			        		primary={true}
			        		onTouchTap={()=>this.setState({popOpen:true})}
			        		style={{display:this.state.isMove?'inline-block':'none'}}
			        	/>
			        	<RaisedButton 
			        		label={this.state.isMove?"取消出库":"选择出库"}
			        		primary={!this.state.isMove}
			        		secondary={this.state.isMove}
			        		onTouchTap={()=>{
								let isMove = !this.state.isMove;
								this.setState({isMove})
			        		}}
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
					        	<TableHeaderColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17,color:'black'}}>物资编号</TableHeaderColumn>
					        	<TableHeaderColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17,color:'black'}}>物资类型</TableHeaderColumn>
					        	<TableHeaderColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17,color:'black'}}>物资名称</TableHeaderColumn>
					        	<TableHeaderColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17,color:'black'}}>入库时间</TableHeaderColumn>
					        	<TableHeaderColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17,color:'black',overflow:'visible'}}>估计出库时间</TableHeaderColumn>
					        	<TableHeaderColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17,color:'black'}}>最近搬运时间</TableHeaderColumn>
					        	<TableHeaderColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17,color:'black'}}>所处地址</TableHeaderColumn>
					        	<TableHeaderColumn style={{textAlign:'center',fontWeight: 'bold',fontSize:17,color:'black'}}>详情</TableHeaderColumn>
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

			<Dialog
			title="去向"
			actions={actions}
			modal={false}
			open={this.state.popOpen}
			onRequestClose={()=>this.setState({popOpen:false})}
		    >
				<TextField
					floatingLabelText="去向"
					value={this.state.value}
					onChange={(e,destination)=>this.setState({destination})}
		        />
			</Dialog>

			</Paper>
		)
	}
}

function pickGood(good, v, sort) {
	let id = good.id;
	let type = good.type;
	let number = good.number;
	let import_time = parsetime(good.import_time);
	let estimated_export_time = parsetime(good.estimated_export_time);
	let location_update_time = parsetime(good.location_update_time);
	let toPlace = parsePlace(good);
	let selecter = [id, type, number, import_time, estimated_export_time, location_update_time, toPlace];
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