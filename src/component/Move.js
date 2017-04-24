import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAdd from 'material-ui/svg-icons/content/add';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

let inputStyle = {
	flex: 1,
	margin: "0 10",
};

export default class PutAway extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			number: 1,
			goods: [{
				code: "",
				type: "",
				num: "",
				out: ""
			}],
		}
		this.renderRow = this.renderRow.bind(this);
		this.addRow = this.addRow.bind(this);
		this.updateGoods = this.updateGoods.bind(this);
	}

	renderRow() {
		let number = this.state.number;
		let dom = [];
		for (let i = 0; i < number; i++)
			dom.push(<Row key={i} index={i} updateGoods={this.updateGoods}/>)
		return dom;
	}

	addRow() {
		let number = this.state.number
		this.setState({
			number: number + 1
		})
	}

	updateGoods(good, index) {
		let goods = this.state.goods;
		goods[index] = good;
		this.setState({
			goods
		})
	}

	render() {
		return (
			<div style={{width:"100%"}}>
                <MuiThemeProvider>
                	<div>
                		{this.renderRow()}
		                <div style={{textAlign:"center",marginTop:"10px",display:"flex",justifyContent:"space-around"}}>
			                <RaisedButton label="增加入库" primary={true} onClick={this.addRow}/>
			                <RaisedButton label="确认入库" primary={true}/>
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
				code: "",
				type: "",
				num: "",
				out: ""
			}
		}
		this.updateValue = this.updateValue.bind(this);
	}

	updateValue(val, type) {
		let good = this.state.good;
		good[type] = val;
		this.setState({
			good
		})
		this.props.updateGoods(good, this.props.index)
	}

	render() {
		return (
			<div style={{display:"flex"}}>
				<TextField
                    floatingLabelText="物资编码"
                    style={inputStyle}
                    value={this.state.good.code}
                    onChange={(e,val)=>this.updateValue(val,"code")}
                />
                <TextField
                    floatingLabelText="物资类型"
                    style={inputStyle}
                    value={this.state.good.type}
                    onChange={(e,val)=>this.updateValue(val,"type")}
                />
                <TextField
                    floatingLabelText="数量"
                    style={inputStyle}
                    value={this.state.good.num}
                    onChange={(e,val)=>this.updateValue(val,"num")}
                />
                <TextField
                    floatingLabelText="去向"
                    style={inputStyle}
                    value={this.state.good.out}
                    onChange={(e,val)=>this.updateValue(val,"out")}
                />
            </div>
		)
	}
}