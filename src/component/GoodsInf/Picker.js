import React from "react"

export default class Picker extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			select: 0
		}
	}

	select(i) {
		this.setState({
			select: i
		})
		let type = ["all", "500", "501", "502"]
		this.props.setPageType(type[i - 1])
	}

	render() {
		let picker = {
			textAlign: "center",
		}
		let item_select = {
			textAlign: "center",
			margin: 10,
			paddingLeft: 10,
			paddingRight: 10,
			fontSize: 20,
			borderWidth: 1,
			borderStyle: "solid",
			borderColor: "black",
			borderRadius: 10,
		}
		let item_normal = {
			textAlign: "center",
			margin: 10,
			paddingLeft: 10,
			paddingRight: 10,
			fontSize: 20,
			color: "gray",
			borderWidth: 1,
			borderStyle: "solid",
			borderColor: "white",
		}
		return (
			<div style={picker}>
				<span style={this.state.select === 1 ? item_select : item_normal} onClick={()=>this.select(1)}>全 部</span>
				<span style={this.state.select === 2 ? item_select : item_normal} onClick={()=>this.select(2)}>入 库</span>
				<span style={this.state.select === 3 ? item_select : item_normal} onClick={()=>this.select(3)}>移 动</span>
				<span style={this.state.select === 4 ? item_select : item_normal} onClick={()=>this.select(4)}>出 库</span>
			</div>
		)
	}
}