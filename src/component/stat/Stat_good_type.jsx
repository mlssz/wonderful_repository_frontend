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
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton'
import Down from 'material-ui/svg-icons/navigation/expand-more'

import echarts from 'echarts'

import {
	getGoodNumber
} from '../../libs/callToBack.js'

let buttonStyle = {
	margin: 0,
	border: "1px #EAEAEA solid",
	position: 'relative'
}

export default class Stat_good_type extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		}
	}

	setDate(times, type = 0, data = []) {
		let types = ["生活电器-生活电器", "电脑办公-电脑办公", "衣物服饰-衣物服饰", "酒水饮料-酒水饮料", "食品生鲜-食品生鲜"]
		let that = this;

		function nextSet(times, type, data, num) {
			data.push({
				name: types[type - 1].slice(0, 4),
				value: num,
			})
			console.log('data:', data)
			if (type < types.length)
				that.setDate(times, type, data);
			else {
				that.getData(data);
			}
		}
		let daySecond = 86400000;
		let fromTime = new Date(new Date() - daySecond * times);
		let params = {
			others: [{
				"key": "type",
				"value": types[type],
			}, {
				"key": "import_time",
				"region": [fromTime, new Date()]
			}]
		}
		getGoodNumber((num) => nextSet(times, ++type, data, num), params)
	}

	getData(data) {
		this.setState({
			data
		});
		renderEcharts(data);
	}

	componentDidMount() {
		this.setDate(1, 0);
	}

	render() {
		return (
			<div>
				<Toolbar>
					<ToolbarGroup firstChild={true}>
						<ToolbarTitle text="货物类型统计" style={{marginLeft:20}}/>
					</ToolbarGroup>
					<ToolbarGroup>
						<RaisedButton label="今日" style={buttonStyle} onTouchTap={()=>this.setDate(1)} />
						<RaisedButton label="最近一周"  style={buttonStyle} onTouchTap={()=>this.setDate(7)} />
						<RaisedButton label="最近一月" style={buttonStyle} onTouchTap={()=>this.setDate(30)} />
						<RaisedButton 
							label="自定义"
							icon={<Down/>}
							labelPosition="before"
							style={buttonStyle}
							onTouchTap={(event)=>this.setState({open: true,anchorEl: event.currentTarget,})}/>
					</ToolbarGroup>
				</Toolbar>
				<div>
					<div style={{width:"33%",minHeight:"70%",display:"inline-block"}} id="map"></div>
					<div style={{width:"66%",display:"inline-block",verticalAlign:'top',paddingTop:60}}>
						<Table>
							<TableBody displayRowCheckbox={false}>
								<TableRow>
									<TableRowColumn>#</TableRowColumn>
							        <TableRowColumn>类型</TableRowColumn>
							        <TableRowColumn>数量</TableRowColumn>
								</TableRow>
								{renderTable(this.state.data)}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		)
	}
}

function renderEcharts(data) {
	let map = echarts.init(document.getElementById('map'));
	let option = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		series: [{
			name: '访问来源',
			type: 'pie',
			radius: '55%',
			data: data.sort((a, b) => a.value > b.value)
		}]
	};
	map.setOption(option);
}

function renderTable(datas) {
	let tableRows = [];
	for (let i in datas) {
		let data = datas[i];
		let row =
			<TableRow key={i}>
				<TableRowColumn>{parseInt(i)+1}</TableRowColumn>
				<TableRowColumn>{data.name}</TableRowColumn>
				<TableRowColumn>{data.value}</TableRowColumn>
			</TableRow>
		tableRows.push(row);
	}
	return tableRows;
}