import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class PutAway extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{textAlign:'center'}}>
				<p>请填写物资信息</p>
				<MuiThemeProvider>
					<div style={{width:"40%",margin:"0 auto"}}>
						<TextField
					      defaultValue=""
					      floatingLabelText="物资编号"
					      fullWidth={true}
					  	/>
					  	<br/>
					  	<TextField
					      defaultValue=""
					      floatingLabelText="物资类型"
					      fullWidth={true}
					  	/>
					  	<br/>
					  	<TextField
					      defaultValue=""
					      floatingLabelText="入库时间"
					      fullWidth={true}
					  	/>
					  	<br/>
					  	<TextField
					      defaultValue=""
					      floatingLabelText="估计出库时间"
					      fullWidth={true}
					  	/>
					  	<br/>
					  	<div style={{textAlign:'start'}}>
						  	<TextField
						      defaultValue=""
						      floatingLabelText="物资描述"
						      fullWidth={true}
						      multiLine={true}
						  	/>
					  	</div>
					  	<br/>
					  	<RaisedButton label="继续"/>
				  	</div>
			    </MuiThemeProvider>
			</div>
		)
	}

}