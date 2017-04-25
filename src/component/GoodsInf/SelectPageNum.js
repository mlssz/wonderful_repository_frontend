import React from "react"

export default class SelectPageNum extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			startPage: 1,
			select: 1,
		}
		this.changePage = this.changePage.bind(this)
	}

	changePage(i) {
		this.props.setPageNum(i)
		this.setState({
			select: i
		})
	}

	render() {
		let startPage = this.state.startPage
		startPage = startPage - 7 < 0 ? 1 : startPage - 7
		return (
			<div style={{textAlign:"center",marginTop:20}}>
				<Number number={startPage+0} changePage={this.changePage} selected={startPage+0===this.state.select}/>
				<Number number={startPage+1} changePage={this.changePage} selected={startPage+1===this.state.select}/>
				<Number number={startPage+2} changePage={this.changePage} selected={startPage+2===this.state.select}/>
				<Number number={startPage+3} changePage={this.changePage} selected={startPage+3===this.state.select}/>
				<Number number={startPage+4} changePage={this.changePage} selected={startPage+4===this.state.select}/>
				<Number number={startPage+5} changePage={this.changePage} selected={startPage+5===this.state.select}/>
				<Number number={startPage+6} changePage={this.changePage} selected={startPage+6===this.state.select}/>
			</div>
		)
	}
}

class Number extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let item_normal = {
			paddingLeft: 10,
			paddingRight: 10,
		}
		let item_select = {
			paddingLeft: 10,
			paddingRight: 10,
			backgroundColor: "#0BACD6",
			color: "white",
		}
		return (
			<span style={this.props.selected?item_select:item_normal} onClick={()=>this.props.changePage(this.props.number)}>
				{this.props.number}
			</span>
		)
	}
}