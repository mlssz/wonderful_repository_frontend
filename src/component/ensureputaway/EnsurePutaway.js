import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import ShowTable from './showTable.js'
import Putaway from '../Putaway.js'

export default class PutAway extends React.Component {

	constructor(props) {
		super(props)
	}

	ensure() {
		alert('入库成功！！！');
		this.props.changePage(<Putaway/>, "入库");
	}

	cancle() {
		this.props.changePage(<Putaway/>, "入库");
	}

	render() {
		return (
			<div>
				<ShowTable goods={this.props.goods}/>
				<div style={{display:"flex",justifyContent:"space-around"}}>
				<RaisedButton label="取消" primary={true} onClick={this.cancle.bind(this)}/>
				<RaisedButton label="确认" primary={true} onClick={this.ensure.bind(this)}/>
				</div>
			</div>
		)
	}
}