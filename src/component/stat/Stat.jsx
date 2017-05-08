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
		this.state = {}
	}

	componentDidMount() {
		renderMap()
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
					<div style={{display:'flex',marginBottom:50}}>
						<div style={{flex:1,justifyContent:'center',alignItems:'center',cursor:"pointer"}} onClick={()=>this.click(0)}>
							<Paper style={{flexDirection:'column',width:170,height:170,display:'flex',justifyContent:'center',alignItems:'center',margin:"0 auto"}} circle={true}>
								<p style={{color:'#845AD6'}}>入库</p>
								<img src={inPng} style={{width:50,height:50}}/>
								<p style={{color:'#845AD6'}}>259</p>
							</Paper>
						</div>
						<div style={{flex:1,justifyContent:'center',alignItems:'center',cursor:"pointer"}} onClick={()=>this.click(1)}>
							<Paper style={{flexDirection:'column',width:170,height:170,display:'flex',justifyContent:'center',alignItems:'center',margin:"0 auto"}} circle={true}>
								<p style={{color:'#00AEAA'}}>出库</p>
								<img src={outPng} style={{width:50,height:50}}/>
								<p style={{color:'#00AEAA'}}>160</p>
							</Paper>
						</div>
					</div>
					<div style={{display:'flex'}}>
						<div style={{flex:1,justifyContent:'center',alignItems:'center',cursor:"pointer"}} onClick={()=>this.click(2)}>
							<Paper style={{flexDirection:'column',width:170,height:170,display:'flex',justifyContent:'center',alignItems:'center',margin:"0 auto"}} circle={true}>
								<p style={{color:'#EDAF61'}}>移动</p>
								<img src={movePng} style={{width:50,height:50}}/>
								<p style={{color:'#EDAF61'}}>50</p>
							</Paper>
						</div>
						<div style={{flex:1,justifyContent:'center',alignItems:'center',cursor:"pointer"}} onClick={()=>this.click(3)}>
							<Paper style={{flexDirection:'column',width:170,height:170,display:'flex',justifyContent:'center',alignItems:'center',margin:"0 auto"}} circle={true}>
								<p style={{color:'#FD555F'}}>异常</p>
								<img src={errPng} style={{width:50,height:50}}/>
								<p style={{color:'#FD555F'}}>0</p>
							</Paper>
						</div>
					</div>

				</div>
			</Paper>
		)
	}
}

function renderMap() {
	let myChart = echarts.init(document.getElementById('map'));
	let option = {
		title: {
			text: '仓库利用率'
		},
		tooltip: {
			formatter: "{a} <br/>{b} : {c}%"
		},
		// toolbox: {
		// 	feature: {
		// 		restore: {},
		// 		saveAsImage: {}
		// 	}
		// },
		series: [{
			name: '仓库利用率',
			type: 'gauge',
			detail: {
				formatter: '{value}%'
			},
			data: [{
				value: 34.67,
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