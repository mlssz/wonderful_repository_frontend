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
		value: 100,
		name: '生活电器'
	}, {
		value: 200,
		name: '电脑办公'
	}, {
		value: 300,
		name: '衣物服饰'
	}, {
		value: 400,
		name: '酒水饮料'
	}, {
		value: 300,
		name: '食品生鲜'
	}],
	[{
		value: 854,
		name: '生活电器'
	}, {
		value: 924,
		name: '电脑办公'
	}, {
		value: 705,
		name: '衣物服饰'
	}, {
		value: 670,
		name: '酒水饮料'
	}, {
		value: 970,
		name: '食品生鲜'
	}],
	[{
		value: 4590,
		name: '生活电器'
	}, {
		value: 7690,
		name: '电脑办公'
	}, {
		value: 4890,
		name: '衣物服饰'
	}, {
		value: 1860,
		name: '酒水饮料'
	}, {
		value: 8739,
		name: '食品生鲜'
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
						<ToolbarTitle text="货物类型统计" style={{marginLeft:20}}/>
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