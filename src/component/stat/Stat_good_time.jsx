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

import {
	randomNum
} from '../../libs/common.js'

import echarts from 'echarts'

let buttonStyle = {
	margin: 0,
	border: "1px #EAEAEA solid",
	position: 'relative'
}

function randomArr() {
	return [randomNum(1, 100), randomNum(100, 300), randomNum(300, 400), randomNum(400, 600), randomNum(600, 700), randomNum(700, 900), randomNum(900, 1000)]

}

function getdata(from, to) {
	let data = [
		[],
		randomArr(),
		randomArr(),
		randomArr(),
		randomArr(),
		randomArr()
	]
	for (let i = 0; i < 7; i++) {
		data[0][i] = data[1][i] + data[2][i] + data[3][i] + data[4][i] + data[5][i];
	}
	return data;
}

let data = getdata();

export default class Stat_good_type extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		}
		this.setData = this.setData.bind(this)
	}

	setData(data) {
		this.setState({
			data
		})
	}

	getData(data) {
		this.setState({
			data: data[0]
		});
		renderEcharts(data);
	}

	componentDidMount() {
		this.getData(data);
	}

	render() {
		return (
			<div>
				<Toolbar>
					<ToolbarGroup firstChild={true}>
						<ToolbarTitle text="入库时长统计" style={{marginLeft:20}}/>
					</ToolbarGroup>
					<ToolbarGroup>
						<RaisedButton label="所有种类" style={buttonStyle} onTouchTap={()=>this.setData(data[0])} />
						<RaisedButton label="生活电器"  style={buttonStyle} onTouchTap={()=>this.setData(data[1])} />
						<RaisedButton label="电脑办公" style={buttonStyle} onTouchTap={()=>this.setData(data[2])} />
						<RaisedButton label="衣物服饰" style={buttonStyle} onTouchTap={()=>this.setData(data[3])} />
						<RaisedButton label="酒水饮料" style={buttonStyle} onTouchTap={()=>this.setData(data[4])} />
						<RaisedButton label="食品生鲜" style={buttonStyle} onTouchTap={()=>this.setData(data[5])} />
						<RaisedButton 
							label="自定义"
							icon={<Down/>}
							labelPosition="before"
							style={buttonStyle}
							onTouchTap={(event)=>this.setState({open: true,anchorEl: event.currentTarget,})}/>
					</ToolbarGroup>
				</Toolbar>
				<div>
					<div style={{width:"66%",minHeight:"70%",display:"inline-block"}} id="map"></div>
					<div style={{width:"33%",display:"inline-block",verticalAlign:'top',paddingTop:60}}>
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
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		legend: {
			data: ['所有种类', '生活电器', '电脑办公', '衣物服饰', '酒水饮料', '食品生鲜']
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			data: ['1周内', '1月内', '3月内', '半年内', '1年内', '3年内', '大于三年']
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
			name: '所有种类',
			type: 'bar',
			data: data[0]
		}, {
			name: '生活电器',
			type: 'bar',
			stack: '生活电器',
			data: data[1]
		}, {
			name: '电脑办公',
			type: 'bar',
			barWidth: 10,
			stack: '电脑办公',
			data: data[2]
		}, {
			name: '衣物服饰',
			type: 'bar',
			stack: '衣物服饰',
			data: data[3]
		}, {
			name: '酒水饮料',
			type: 'bar',
			stack: '搜索引擎',
			data: data[4]
		}, {
			name: '食品生鲜',
			type: 'bar',
			stack: '食品生鲜',
			data: data[5]
		}]
	};
	map.setOption(option);
}

function renderTable(datas) {
	let tableRows = [];
	let name = ['1周内', '1月内', '3月内', '半年内', '1年内', '3年内', '大于三年'];
	for (let i in datas) {
		let data = datas[i];
		let row =
			<TableRow key={i}>
				<TableRowColumn>{parseInt(i)+1}</TableRowColumn>
				<TableRowColumn>{name[i]}</TableRowColumn>
				<TableRowColumn>{data}</TableRowColumn>
			</TableRow>
		tableRows.push(row);
	}
	return tableRows;
}