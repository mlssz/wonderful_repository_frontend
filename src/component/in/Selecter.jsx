import React from 'react'
import Searcher from "../Searcher.jsx"
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

export default class ReactClassName extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			paperDisplay: false
		}
	}

	onSearchTouchTap(v) {
		this.props.onChange(v)
	}

	onShowAllTouchTap() {
		this.props.onChange([])
	}

	render() {
		let searchKeys = [{
			key: "description",
			label: "物资名称",
			type: String
		}, {
			key: "date",
			label: "入库时间",
			type: Date
		}, {
			key: "id",
			label: "物资id",
			type: Number
		}];
		return (
			<div>
				<div style={{height:56}}>
					<span style={{fontSize:20,lineHeight:"56px",marginLeft:20}}>按照条件筛选</span>
					<RaisedButton
						label={this.state.paperDisplay?"隐藏":"显示"}
						primary={true}
						onTouchTap={()=>{
							let paperDisplay =!this.state.paperDisplay;
							this.setState({paperDisplay})
						}}
						style={{float:"right",margin:10}}/>
					<div style={{clear:'both'}}></div>
				</div>
				<Paper style={{display:this.state.paperDisplay?'block':'none'}}>
					<Searcher
						searchKeys={searchKeys}
						onSearchTouchTap={this.onSearchTouchTap.bind(this)}
						onShowAllTouchTap={this.onShowAllTouchTap.bind(this)}/>
				</Paper>
			</div>
		)
	}
}