import React from 'react'
import {
	Toolbar,
	ToolbarGroup,
	ToolbarSeparator,
	ToolbarTitle
} from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/RaisedButton'
import Popover from 'material-ui/Popover'
import Down from 'material-ui/svg-icons/navigation/expand-more'
import DatePicker from 'material-ui/DatePicker'
import {
	Table,
	TableBody,
	TableRow,
	TableRowColumn
} from 'material-ui/Table';

import echarts from 'echarts'

import {
	randomNum
} from '../../libs/common.js'

let buttonStyle = {
	margin: 0,
	border: "1px #EAEAEA solid",
	position: 'relative'
}
let pickerStyle = {
	width: 100,
}

let pickerState = {
	style: pickerState,
	autoOk: false,
	className: 'Datepicker'
}

export default class Stat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: true,
			from: new Date(),
			to: new Date(),
		}
	}

	componentDidMount() {
		let goodsNum = echarts.init(document.getElementById('goodsNum'));
		let goodsNumOption = {
			title: {
				text: '货物类型数量饼状图'
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			series: [{
				name: '访问来源',
				type: 'pie',
				radius: '55%',
				data: [{
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
				}].sort((a, b) => a.value > b.value)
			}]
		};
		goodsNum.setOption(goodsNumOption);
		let missionsNum = echarts.init(document.getElementById('missionsNum'));
		let missionsNumOption = {
			title: {
				text: '任务数量饼状图'
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			series: [{
				name: '访问来源',
				type: 'pie',
				radius: '55%',
				data: [{
					value: 2124,
					name: '入库'
				}, {
					value: 765,
					name: '移动'
				}, {
					value: 4576,
					name: '出库'
				}].sort((a, b) => a.value > b.value)
			}]
		};
		missionsNum.setOption(missionsNumOption);
		let personNum = echarts.init(document.getElementById('personNum'));
		let personNumOption = {
			title: {
				text: '工龄饼状图'
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			series: [{
				name: '访问来源',
				type: 'pie',
				radius: '55%',
				data: [{
					value: 388,
					name: '半年内'
				}, {
					value: 712,
					name: '一年内'
				}, {
					value: 180,
					name: '三年内'
				}, {
					value: 260,
					name: '三年以上'
				}].sort((a, b) => a.value > b.value)
			}]
		};
		personNum.setOption(personNumOption);
		let timeLength = echarts.init(document.getElementById('timeLength'));
		let timeLengthOption = {
			title: {
				text: '物品入库时长'
			},
			tooltip: {},
			legend: {
				data: ['时长']
			},
			xAxis: {
				data: ["1周内", "7-30天", "半年", "一年", "1-3年", "3年以上"]
			},
			yAxis: {},
			series: [{
				name: '时长',
				type: 'bar',
				data: [5, 20, 36, 10, 10, 20]
			}]
		};
		timeLength.setOption(timeLengthOption);
	}

	renderRow(aver) {
		let person = [{
			name: '李世明',
			number: randomNum(1000, 5000),
		}, {
			name: '陶行知',
			number: randomNum(1000, 5000),
		}, {
			name: '唐玄宗',
			number: randomNum(1000, 5000),
		}, {
			name: '黄贯中',
			number: randomNum(1000, 5000),
		}, {
			name: '汉高祖',
			number: randomNum(1000, 5000),
		}].sort((a, b) => a.number < b.number);
		return person.map((data, i) => {
			let diff = data.number - aver;
			return (
				<TableRow key={i}>
						<TableRowColumn>{i+1}</TableRowColumn>
				        <TableRowColumn>{data.name}</TableRowColumn>
				        <TableRowColumn style={{color:diff>0?'red':'green'}}>{diff>0?'+'+diff.toString():diff.toString()}</TableRowColumn>
					</TableRow>)
		})
	}

	render() {
		return (
			<div>
				<Toolbar>
					<ToolbarGroup firstChild={true}>
						<ToolbarTitle text="统计管理" style={{marginLeft:20}}/>
					</ToolbarGroup>
					<ToolbarGroup>
						<RaisedButton label="今日" style={buttonStyle} />
						<RaisedButton label="最近一周"  style={buttonStyle}/>
						<RaisedButton label="最近一月" style={buttonStyle}/>
						<RaisedButton 
							label="自定义"
							icon={<Down/>}
							labelPosition="before"
							style={buttonStyle}
							onTouchTap={(event)=>this.setState({open: true,anchorEl: event.currentTarget,})}/>
					</ToolbarGroup>
				</Toolbar>
				<div style={{marginBottom:50,padding:30}}>
					<div style={{width:"33%",height:300,display:"inline-block"}} id="goodsNum">
					</div>
					<div style={{width:"33%",height:300,display:"inline-block"}} id="missionsNum">
					</div>
					<div style={{width:"33%",height:300,display:"inline-block"}} id="personNum">
					</div>
				</div>
				<div style={{marginBottom:50,padding:30}}>
					<div style={{width:"50%",height:300,display:"inline-block"}} id="timeLength"></div>
					<div style={{width:"50%",height:300,display:"inline-block"}} id="persionMission">
						<div style={{display:'flex',justifyContent:'space-between'}}>
							<b style={{fontSize:18}}>任务量反馈</b>
							<span style={{fontSize:16}}>平均值:3480</span>
						</div>
						<Table>
							<TableBody displayRowCheckbox={false}>
								<TableRow>
									<TableRowColumn>#</TableRowColumn>
							        <TableRowColumn>姓名</TableRowColumn>
							        <TableRowColumn>完成任务量</TableRowColumn>
								</TableRow>
								{this.renderRow(3480)}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		)
	}
}

//货物类型数量，饼状图
//一定周期各种任务数量，表格
//一定周期，不同入库时长物品，表格
//不同出库量武平，表格
//运输人员任务量，表格

// <Popover
//         open={this.state.open}
//         anchorEl={this.state.anchorEl}
//         anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
//         targetOrigin={{horizontal: 'right', vertical: 'top'}}
//         onRequestClose={()=>{this.setState({open: false,})}}
//       >
//       	<div>
//       		<p style={{textAlign:'center'}}>自定义范围</p>
//       		<div>
//       			<div style={{display:"inline-block"}}>
//       				<span>从</span>
//       				<DatePicker value={this.state.from} {...pickerState}/>
//       			</div>
//       			<div style={{display:"inline-block"}}>
//       				<span>到</span>
//       				<DatePicker value={this.state.to} {...pickerState}/>
//       			</div>
//       		</div>
//       	</div>
//       </Popover>