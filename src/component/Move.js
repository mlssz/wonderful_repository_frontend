import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAdd from 'material-ui/svg-icons/content/add';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import EnsurePutaway from './ensureMove/EnsurePutaway.js'
import AutoComplete from 'material-ui/AutoComplete';

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

export default class Move extends React.Component {
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
		this.handleChange = this.handleChange.bind(this);
		this.ensure = this.ensure.bind(this);
	}

	renderRow() {
		let number = this.state.number;
		let dom = [];
		for (let i = 0; i < number; i++)
			dom.push(<Row key={i} index={i} updateGoods={this.updateGoods} type={this.props.params.type}/>)
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

	handleChange(obj, num, val) {
		let value = !val ? "移动" : "出库";
		this.props.changePage(Move, value, {
			type: val
		})
	}

	ensure() {
		let goods = this.state.goods.filter(isEmpty);
		let value = !this.props.params.type ? "确认移动" : "确认出库";
		if (goods.length)
			this.props.changePage(EnsurePutaway, value, {
				goods: goods,
				type: this.props.params.type
			});
		else
			alert("请填写内容!!")
	}

	render() {
		console.log(this.props)
		return (
			<div style={{width:"100%"}}>
				<DropDownMenu value={this.props.params.type} onChange={this.handleChange}>
					<MenuItem value={0} primaryText="移动" />
					<MenuItem value={1} primaryText="出库" />
		        </DropDownMenu>
		        <br />
                <MuiThemeProvider>
                	<div>
                		{this.renderRow()}
		                <div style={{textAlign:"center",marginTop:"10px",display:"flex",justifyContent:"space-around"}}>
			                <RaisedButton label={!this.state.type?"增加移动":"增加出库"} primary={true} onTouchTap={this.addRow}/>
			                <RaisedButton label={!this.state.type?"确认移动":"确认出库"} primary={true} onTouchTap={this.ensure}/>
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
				out: "",
				action: !this.props.type ? 501 : 502,
				dataSource: [],
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

	handleUpdateInput(value) {
		let datas = ["1491451593158", "1491451593159", "1492222593158", "12359756304569", "1987563198534", "5219876025973", "6489752036975", "1023685219763"];
		this.setState({
			dataSource: datas.filter((data) => data.indexOf(value) >= 0) || [],
			code: value
		});
	};

	render() {
		return (
			<div style={{display:"flex"}}>
                <AutoComplete
		         	hintText="物资编码"
		          	dataSource={this.state.dataSource||[]}
		          	onUpdateInput={this.handleUpdateInput.bind(this)}
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
                {
                	!this.props.type?
                    <TextField
                        floatingLabelText="去向"
                        style={inputStyle}
                        value={this.state.good.out}
                        onChange={(e,val)=>this.updateValue(val,"out")}/>:false
                }
            </div>
		)
	}
}
