import React from 'react';
import ReactDOM from "react-dom";
import Mean from './component/mean.js'
import injectTapEventPlugin from "react-tap-event-plugin"

injectTapEventPlugin()

class Body extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: false,
			title: '标题',
		}
		this.changePage = this.changePage.bind(this);
	}

	changePage(page, title) {
		this.setState({
			page,
			title
		});
	}

	render() {
		let bodyStyle = {
			display: 'flex',
			padding: 0,
			margin: 0,
			minHeight: '100%',
		}
		let leftStyle = {
			display: 'inline-block',
			width: '200px',
			backgroundColor: '#EAEAEA',
			height: '100%',
		}
		let headStyle = {
			padding: 5,
			backgroundColor: '#EAEAEA',
			height: '20px',
			textAlign: 'center',
			fontSize: '20px',
			lineHeight: '20px',
		}
		let rightStyle = {
			flex: 1,
		}
		return (
			<div className='body' style={bodyStyle}>
				<div style={leftStyle}>
					<div style={headStyle}>WonderFul</div>
					<Mean changePage={this.changePage}/>
				</div>
				<div style={rightStyle}>
					<div style={headStyle}>{this.state.title}</div>
					{this.state.page}
				</div>
			</div>
		)
	}

}

ReactDOM.render(<Body/>, document.getElementById('content'));