import React from 'react';

export default class SelectPageNum extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startPage: 1,
		}
	}

	render() {
		return (
			<div style={{textAlign:"center"}}>
				<Number number={this.state.startPage+0}/>
				<Number number={this.state.startPage+1}/>
				<Number number={this.state.startPage+2}/>
				<Number number={this.state.startPage+3}/>
				<Number number={this.state.startPage+4}/>
				<Number number={this.state.startPage+5}/>
				<Number number={this.state.startPage+6}/>
			</div>
		)
	}
}

class Number extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let item_normal = {
			paddingLeft: 10,
			paddingRight: 10,
			paddingTop: 5,
			paddingBottom: 5,
		}
		let item_select = {
			paddingLeft: 10,
			paddingRight: 10,
			paddingTop: 5,
			paddingBottom: 5,
			borderWidth: 1,
			borderStyle: 'solid',
			borderColor: 'black',
		}
		return (
			<span style={item_normal}>
				{this.props.number}
			</span>
		)
	}
}