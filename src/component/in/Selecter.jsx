import React from 'react'
import Paper from 'material-ui/Paper';
import Popover from 'material-ui/Popover'
import FlatButton from 'material-ui/FlatButton'

import {
	types
} from '../../libs/common.js';

let styles = {
	row: {
		padding: 10,
		fontSize: 16,
	},
	span: {
		display: "inline-block",
		width: 100,
		textAlign: 'center',
	},
	rowTop: {
		display: "inline-block",
		width: 100,
		color: 'gray',
	},
};

export default class Selecter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			popover: null,
			isShow: true,
		}
		this.renderDeepType = this.renderDeepType.bind(this)
	}

	renderType() {
		let typeRow = [];
		for (let i in types) {
			let type = <FlatButton label={i} key={i}/>;
			typeRow.push(type);
		}
		return typeRow;
	}

	renderDeepType(e, type) {
		let popover = <Popover
		        open={true}
		        anchorEl={e.target}
		        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
		        targetOrigin={{horizontal: 'left', vertical: 'top'}}
		        onRequestClose={()=>false}
		        useLayerForClickAway={false}
		        className='popover'
		      >
		      		<div style={{fontSize:16,margin:10}}>
						{
							types[type].map((item,i)=> 
								<span 
									style={styles.span}
									key={i}>
									{item}
								</span>)
						}
					</div>
		      </Popover>
		this.setState({
			popover
		})
	}

	selectButton() {
		let isShow = !this.state.isShow;
		this.setState({
			isShow
		})
		let SelectContent = document.getElementById('SelectContent');
		if (!isShow)
			SelectContent.style.display = 'none';
		else
			SelectContent.style.display = 'block';
	}

	render() {
		return (
			<Paper zDepth={1} style={{width:"100%",marginBottom:20}}>
				<div style={{minHeight:44,}}>
					<div style={{position:'relative',padding:10,fontSize:14}}>
						<span style={{fontSize:20,letterSpacing:5}}>条件筛选</span>
						<FlatButton 
							label={this.state.isShow?"收起":"更多"}
							style={{
								position:"absolute",
								right:20,
								textAlign:"center",
							}}
							onTouchTap={this.selectButton.bind(this)}/>
					</div>
					<div id="SelectContent">
						<div style={styles.row}>
							<span style={styles.rowTop}>类型:</span>
							{this.renderType.call(this)}
							{this.state.popover}
						</div>
						<div style={styles.row}>
							<span style={styles.rowTop}>数量:</span>
							<FlatButton label="<500" />
							<FlatButton label="500-1000" />
							<FlatButton label="1000-3000" />
							<FlatButton label="3000-5000" />
							<FlatButton label=">5000" />
						</div>
						<div style={styles.row}>
							<span style={styles.rowTop}>入库时间:</span>
							<FlatButton label="<1月" />
							<FlatButton label="1-3月" />
							<FlatButton label="3-6月" />
							<FlatButton label="6-12月" />
							<FlatButton label=">1年" />
						</div>
					</div>
				</div>
			</Paper>
		)
	}
}