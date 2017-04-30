import React from 'react'
import JsBarcode from 'jsbarcode'

export default class BarCode extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			canvas: document.createElement('canvas')
		}
	}

	componentWillMount() {
		let canvas = this.state.canvas;
		JsBarcode(canvas, this.props.content, {
			format: this.props.format || "CODE128",
			width: this.props.width || 2,
			height: this.props.height || 100,
			displayValue: this.props.displayValue || true,
			lineColor: this.props.lineColor || "black",
			textPosition: this.props.textPosition || "bottom",
		});
		this.setState({
			canvas
		})
	}

	render() {
		return (
			<div>
                {this.state.canvas}
            </div>
		)
	}
}