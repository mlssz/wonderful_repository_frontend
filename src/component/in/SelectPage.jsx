import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

let buttonStyle = {
	margin: "0 5",
}

export default class SelectPage extends React.Component {
	constructor(props) {
		super(props);
	}

	changePage(page) {
		let numberOfPage = this.props.numberOfPage;
		if (page > 0 && page <= numberOfPage) {
			this.props.changePage(page);
		}
	}

	renderButton() {
		let numberOfPage = this.props.numberOfPage;
		let start = this.props.page - 7;
		start = start > 0 ? start : 1;
		let end = start + 7;
		end = end > numberOfPage ? numberOfPage : end;
		let buttons = [];
		for (let i = start; i < end + 1; i++) {
			let button = <RaisedButton label={i} key={i} style={buttonStyle} primary={this.props.page===i} onTouchTap={()=>this.changePage(i)}/>
			buttons.push(button)
		}
		return buttons;
	}

	render() {
		let page = this.props.page;
		return (
			<div style={{margin:"10 auto",display: "inline-block",}}>
				<RaisedButton label="上一页" style={buttonStyle} onTouchTap={()=>this.changePage(page-1)}/>
					{this.renderButton.call(this)}
				<RaisedButton label="下一页" style={buttonStyle} onTouchTap={()=>this.changePage(page+1)}/>
			</div>
		)
	}
}