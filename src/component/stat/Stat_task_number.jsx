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

let buttonStyle = {
	margin: 0,
	border: "1px #EAEAEA solid",
	position: 'relative'
}

let data = [
	[{
		value: 2124,
		name: '入库'
	}, {
		value: 765,
		name: '移动'
	}, {
		value: 4576,
		name: '出库'
	}],
	[{
		value: 9805,
		name: '入库'
	}, {
		value: 860,
		name: '移动'
	}, {
		value: 6890,
		name: '出库'
	}],
	[{
		value: 25960,
		name: '入库'
	}, {
		value: 49886,
		name: '移动'
	}, {
		value: 19860,
		name: '出库'
	}]
]

export default class Stat_good_type extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		}
	}

	getData(data) {
		this.setState({
			data
		});
		renderEcharts(data);
	}

	componentDidMount() {
		this.getData(data[0]);
	}

	render() {
		return (
			<div>
				<Toolbar>
					<ToolbarGroup firstChild={true}>
						<ToolbarTitle text="任务数量统计" style={{marginLeft:20}}/>
					</ToolbarGroup>
					<ToolbarGroup>
						<RaisedButton label="今日" style={buttonStyle} onTouchTap={()=>this.getData(data[0])} />
						<RaisedButton label="最近一周"  style={buttonStyle} onTouchTap={()=>this.getData(data[1])} />
						<RaisedButton label="最近一月" style={buttonStyle} onTouchTap={()=>this.getData(data[2])} />
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