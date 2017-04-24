import React from 'react';
import ReactDOM from "react-dom";
import Mean from './component/mean.js'
import SearchPage from './component/SearchPage.js'
import injectTapEventPlugin from "react-tap-event-plugin"

injectTapEventPlugin()

class Body extends React.Component {
	constructor(props) {
		super(props);
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
					<Mean/>
				</div>
				<div style={rightStyle}>
					<div style={headStyle}>标题</div>
					<SearchPage/>
				</div>
			</div>
		)
	}

}

ReactDOM.render(<Body/>, document.getElementById('content'));