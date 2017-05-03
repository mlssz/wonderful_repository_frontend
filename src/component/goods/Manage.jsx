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
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import DropDownMenu from 'material-ui/DropDownMenu'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import {
	testGoods,
	parseParams,
	parsetime,
	parsePlace,
	changeHash,
	downloadBarCode
} from '../../libs/common.js'

import {Loading} from "../tools/Loading.jsx"
import * as sortGood from '../../libs/sortGood.js'
import Selecter from '../in/Selecter.jsx'

export default class Manage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			good: [],
			sort: 1,
			action: false,
			selected: 0,
		}
		this.handleChange = this.handleChange.bind(this);
		this.meunClick = this.meunClick.bind(this);
		this.doAction = this.doAction.bind(this);
	}

	componentWillMount() {
		let good = testGoods;
		for (let i in good)
			good[i].number = Math.floor(Math.random() * (9999 - 1) + 1);
		this.setState({
			good
		});
	}

	handleChange(event, index, value) {
		let good = this.state.good;
		switch (value) {
			case 1:
				good = good.sort(sortGood.sortById);
				break;
			case 2:
				good = good.sort(sortGood.sortByType);
				break;
			case 3:
				good = good.sort(sortGood.sortByNum);
				break;
			case 4:
				good = good.sort(sortGood.sortByImportTime);
				break;
			case 5:
				good = good.sort(sortGood.sortByOutTime);
				break;
			case 6:
				good = good.sort(sortGood.sortByMoveTime);
				break;
			case 7:
				good = good.sort(sortGood.sortByPlace);
				break;
		}
		this.setState({
			sort: value,
			good,
		})
	}

	renderRow() {
		let goods = this.state.good;
		return (
			goods.map(this.renderRowColumn)
		)
	}

	renderRowColumn(good) {
		let import_time = parsetime(good.import_time);
		let estimated_export_time = parsetime(good.estimated_export_time, 0);
		let location_update_time = parsetime(good.location_update_time);
		let place = parsePlace(good);
		return (
			<TableRow key={good.id}>
		       	<TableRowColumn style={{overflow:"visible"}}>{good.id}</TableRowColumn>
		       	<TableRowColumn>{good.type}</TableRowColumn>
		       	<TableRowColumn>{good.number}</TableRowColumn>
		       	<TableRowColumn style={{overflow:"visible"}}>{import_time}</TableRowColumn>
		       	<TableRowColumn>{estimated_export_time}</TableRowColumn>
		       	<TableRowColumn style={{overflow:"visible"}}>{location_update_time}</TableRowColumn>
		       	<TableRowColumn>{place}</TableRowColumn>
		       	<TableRowColumn><RaisedButton label="详情" onTouchTap={() => changeHash(`/material/${good.id}`)}/></TableRowColumn>
			</TableRow>
		)
	}

	action() {
		let action = !this.state.action;
		this.setState({
			action,
		});
	}

	doAction(action) {
		if (this.state.selected === 0)
			return false;
		let hash = ['move', 'out'][action];
		let good = this.state.good[this.state.selected - 1];
		let task = {
			type: [],
			num: '',
			id: good.id.toString(),
		}
		sessionStorage.setItem(hash + 'task', JSON.stringify(task));
		changeHash(hash);
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

	render() {
    if (true) {
      return (<div><Loading /></div>)
    }

		return (
			<div>
				<Selecter/>
				<Toolbar>
					<ToolbarGroup firstChild={true}>
						<DropDownMenu value={this.state.sort} onChange={this.handleChange} iconStyle={{fill:'black'}}>
							<MenuItem value={1} primaryText="默认排序" />
							<MenuItem value={2} primaryText="物资类型" />
							<MenuItem value={3} primaryText="物资数量" />
							<MenuItem value={4} primaryText="入库时间" />
							<MenuItem value={5} primaryText="估计出库时间" />
							<MenuItem value={6} primaryText="最近搬运时间" />
							<MenuItem value={7} primaryText="所处地址" />
						</DropDownMenu>
			        </ToolbarGroup>
			        <ToolbarGroup>
			          <RaisedButton 
			          	label={!this.state.action?"操作":"取消"}
			          	primary={!this.state.action}
			          	secondary={this.state.action}
			          	onTouchTap={this.action.bind(this)}/>
			          <ToolbarSeparator />
			          <IconMenu
			            iconButtonElement={
			              <IconButton touch={true}>
			                <NavigationExpandMoreIcon />
			              </IconButton>
			            }
			            onItemTouchTap={this.meunClick}
			          >
			            <MenuItem primaryText="打印物品单" key='printTable'/>
			            <MenuItem primaryText="打印条形码" key='printBar'/>
			          </IconMenu>
			        </ToolbarGroup>
				</Toolbar>
				<Table
					selectable={true}
					className="tablePrint"
					onRowSelection={(e)=>this.setState({selected:e[0]})}>
				    <TableBody
				    	displayRowCheckbox={this.state.action}
				    	deselectOnClickaway={false}>
						<TableRow selectable={false}>
				        	<TableRowColumn>物资编号</TableRowColumn>
				        	<TableRowColumn>物资类型</TableRowColumn>
				        	<TableRowColumn>物资数量</TableRowColumn>
				        	<TableRowColumn>入库时间</TableRowColumn>
				        	<TableRowColumn>估计出库时间</TableRowColumn>
				        	<TableRowColumn>最近搬运时间</TableRowColumn>
				        	<TableRowColumn>所处地址</TableRowColumn>
				        	<TableRowColumn>详情</TableRowColumn>
			    		</TableRow>
						{this.renderRow.call(this)}
				    </TableBody>
				</Table>
				{
					this.state.action?
					<div style={{display:"flex",justifyContent:"space-around",margin:30}}>
						<RaisedButton label="移动" primary={true} onTouchTap={()=>this.doAction(0)}/>
						<RaisedButton label="出库" primary={true} onTouchTap={()=>this.doAction(1)}/>
					</div>:false
				}
			</div>
		)
	}
}
