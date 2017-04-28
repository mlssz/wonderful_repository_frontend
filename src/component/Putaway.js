import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAdd from 'material-ui/svg-icons/content/add';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import EnsurePutaway from './ensureputaway/EnsurePutaway.js'

let inputStyle = {
	flex: 1,
	margin: "0 10",
};

function isEmpty(good) {
	for (let i in good)
		if (good[i] === "")
			return false;
	return true;
}

export default class PutAway extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			number: 1,
			goods: [{
				type: "",
				num: "",
				estimated_export_time: "",
				description: "",
				action: 500,
			}],
		}
		this.addRow = this.addRow.bind(this);
		this.renderRow = this.renderRow.bind(this);
		this.updateGoods = this.updateGoods.bind(this);
		this.ensure = this.ensure.bind(this);
	}

	addRow() {
		let number = this.state.number
		this.setState({
			number: number + 1
		})
	}

	renderRow() {
		let number = this.state.number;
		let dom = [];
		for (let i = 0; i < number; i++)
			dom.push(<Row key={i} index={i} updateGoods={this.updateGoods}/>)
		return dom;
	}

	updateGoods(good, index) {
		let goods = this.state.goods;
		goods[index] = good;
		this.setState({
			goods
		})
	}

	ensure() {
		let goods = this.state.goods.filter(isEmpty);
		if (goods.length)
			this.props.changePage(EnsurePutaway, "确认入库", {
				goods: goods
			});
		else
			alert("请填写内容!!")
	}

	render() {
		return (
			<div style={{width:"100%"}}>
                <MuiThemeProvider>
                	<div>
                		{this.renderRow()}
		                <div style={{textAlign:"center",marginTop:"10px",display:"flex",justifyContent:"space-around"}}>
			                <RaisedButton label="增加入库" primary={true} onTouchTap={this.addRow}/>
			                <RaisedButton label="确认入库" primary={true} onTouchTap={this.ensure}/>
		                </div>
                	</div>
                </MuiThemeProvider>
      		</div>
		)
	}
}

class Row extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			good: {
				type: "",
				num: "",
				estimated_export_time: "",
				description: "",
				action: 500,
			}
		}
		this.updateValue = this.updateValue.bind(this);
	}

	updateValue(val) {
		let good = this.state.good;
		good.type = val;
		this.setState({
			good
		})
		this.props.updateGoods(good, this.props.index)
	}

	updateNum(val) {
		let good = this.state.good;
		good.num = val;
		this.setState({
			good
		})
		this.props.updateGoods(good, this.props.index)
	}

	updateTime(val) {
		let good = this.state.good;
		good.estimated_export_time = val;
		this.setState({
			good
		})
		this.props.updateGoods(good, this.props.index)
	}

	updateDes(val) {
		let good = this.state.good;
		good.description = val;
		this.setState({
			good
		})
		this.props.updateGoods(good, this.props.index)
	}

	render() {
		return (
			<div style={{display:"flex"}}>
                <TextField
                    floatingLabelText="物资类型"
                    style={inputStyle}
                    value={this.state.good.type}
                    onChange={(e,val)=>this.updateValue(val)}
                />
                <TextField
                    floatingLabelText="数量"
                    style={inputStyle}
                    value={this.state.good.num}
                    onChange={(e,val)=>this.updateNum(val)}
                />
                <TextField
                    floatingLabelText="估计出库时间"
                    style={inputStyle}
                    value={this.state.good.estimated_export_time}
                    onChange={(e,val)=>this.updateTime(val)}
                />
                <TextField
                    floatingLabelText="物资描述"
                    style={inputStyle}
                    value={this.state.good.description}
                    onChange={(e,val)=>this.updateDes(val)}
                />
            </div>
		)
	}
}
