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
import Paper from 'material-ui/Paper'
import {
	Table,
	TableBody,
	TableRow,
	TableRowColumn
} from 'material-ui/Table';
import inPng from '../../img/入库.png'
import outPng from '../../img/出库.png'
import movePng from '../../img/移库.png'
import errPng from '../../img/异常.png'

import echarts from 'echarts'

import {
	changeHash,
	paperStyle
} from '../../libs/common.js'

import {
	getGoodNumber,
	getTaskNumber
} from '../../libs/callToBack.js';

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
			use: 0,
			inNum: 0,
			out: 0,
			move: 0,
			error: 0,
		}
		this.setIn = this.setIn.bind(this);
		this.setout = this.setout.bind(this);
		this.setmove = this.setmove.bind(this);
	}

	setIn(inNum) {
		this.setState({
			inNum
		})
	}
	setout(out) {
		this.setState({
			out
		})
	}
	setmove(move) {
		this.setState({
			move
		})
	}

	componentDidMount() {
		getGoodNumber(renderMap);
		let params = {
			others: [{
				"key": "action",
				"value": 500,
			}, {
				"key": "status",
				"value": [0, 1]
			}]
		}
		getTaskNumber(this.setIn, params)
		params = {
			others: [{
				"key": "action",
				"value": 501,
			}, {
				"key": "status",
				"value": [0, 1]
			}]
		}
		getTaskNumber(this.setmove, params)
		params = {
			others: [{
				"key": "action",
				"value": 502,
			}, {
				"key": "status",
				"value": [0, 1]
			}]
		}
		getTaskNumber(this.setout, params)
	}


	click(action) {
		let hash = ["putawayManage", "outManage", "moveManage", "check"][action];
		changeHash(hash);
	}

	render() {
		return (
			<Paper style={{display:'flex',justifyContent:'center',padding:20,width:"80%",margin:"30 auto"}}>
				<Paper style={{padding:20,flex:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
					<div style={{width:"100%",height:400}} id='map'></div>
				</Paper>

				<div style={{flex:1}}>
					<p style={{marginLeft:20,fontSize:17,fontWeight:"bold"}}>正在进行的任务数量</p>
					<div style={{display:'flex',marginBottom:50}}>
						<div style={{flex:1,justifyContent:'center',alignItems:'center',cursor:"pointer"}} onClick={()=>this.click(0)}>
							<Paper style={{flexDirection:'column',width:170,height:170,display:'flex',justifyContent:'center',alignItems:'center',margin:"0 auto"}} circle={true}>
								<p style={{color:'#845AD6'}}>入库</p>
								<img src={inPng} style={{width:50,height:50}}/>
								<p style={{color:'#845AD6'}}>{this.state.inNum}</p>
							</Paper>
						</div>
						<div style={{flex:1,justifyContent:'center',alignItems:'center',cursor:"pointer"}} onClick={()=>this.click(1)}>
							<Paper style={{flexDirection:'column',width:170,height:170,display:'flex',justifyContent:'center',alignItems:'center',margin:"0 auto"}} circle={true}>
								<p style={{color:'#00AEAA'}}>出库</p>
								<img src={outPng} style={{width:50,height:50}}/>
								<p style={{color:'#00AEAA'}}>{this.state.out}</p>
							</Paper>
						</div>
					</div>
					<div style={{display:'flex'}}>
						<div style={{flex:1,justifyContent:'center',alignItems:'center',cursor:"pointer"}} onClick={()=>this.click(2)}>
							<Paper style={{flexDirection:'column',width:170,height:170,display:'flex',justifyContent:'center',alignItems:'center',margin:"0 auto"}} circle={true}>
								<p style={{color:'#EDAF61'}}>移动</p>
								<img src={movePng} style={{width:50,height:50}}/>
								<p style={{color:'#EDAF61'}}>{this.state.move}</p>
							</Paper>
						</div>
						<div style={{flex:1,justifyContent:'center',alignItems:'center',cursor:"pointer"}} onClick={()=>this.click(3)}>
							<Paper style={{flexDirection:'column',width:170,height:170,display:'flex',justifyContent:'center',alignItems:'center',margin:"0 auto"}} circle={true}>
								<p style={{color:'#FD555F'}}>异常</p>
								<img src={errPng} style={{width:50,height:50}}/>
								<p style={{color:'#FD555F'}}>{this.state.error}</p>
							</Paper>
						</div>
					</div>

				</div>
			</Paper>
		)
	}
}

function renderMap(data = 0) {
	let myChart = echarts.init(document.getElementById('map'));
	let value = (data / 2640).toFixed(2);
	let option = {
		title: {
			text: '仓库利用率'
		},
		tooltip: {
			formatter: "{a} <br/>{b} : {c}%"
		},
		series: [{
			name: '仓库利用率',
			type: 'gauge',
			detail: {
				formatter: '{value}%'
			},
			data: [{
				value: value,
				name: '利用率'
			}]
		}]
	};
	myChart.setOption(option);
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