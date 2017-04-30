import React from 'react'
import JsBarcode from 'jsbarcode'

export default class BarCode extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		JsBarcode("#barcode", this.props.content, {
			format: this.props.format || "CODE128",
			width: this.props.width || 2,
			height: this.props.height || 100,
			displayValue: this.props.displayValue || true,
			lineColor: this.props.lineColor || "black",
			textPosition: this.props.textPosition || "bottom",
		});

	}

	render() {
		return (
			<div>
                <svg id="barcode"></svg>
            </div>
		)
	}
}