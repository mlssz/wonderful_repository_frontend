import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Right from 'material-ui/svg-icons/navigation/chevron-right'
import UserName from 'material-ui/svg-icons/social/person'
import Psw from 'material-ui/svg-icons/action/accessibility'

import {
	changeHash
} from '../../libs/common.js';
import {
	getRepo,
	login
} from '../../libs/callToBack.js';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			psw: '',
			isRemember: false,
		}
		this.login = this.login.bind(this);
	}

	login(repo) {
		let loginState = {
			userName: this.state.userName,
			psw: this.state.psw
		}
		let params = {
			loginState: loginState,
			repo: repo,
			isRem: this.state.isRemember,
		}
		login(() => changeHash('/'), params);
	}

	render() {
		return (
			<div>
				<div style={{width:"100%",height:"50%",backgroundColor:"#00AFCC",position:"absolute",zIndex:"-999"}}></div>
				<div style={{width:"100%",height:"50%",backgroundColor:"#E8E7E7",position:"absolute",top:"50%",zIndex:"-999"}}></div>
				<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}>
					<Paper style={{width:"40%",height:230,textAlign:"center",position:"relative"}} zDepth={2}>
						<div style={{display:"flex",justifyContent:"center"}}>
							<UserName style={{alignSelf:"flex-end",margin:"0 10 13 0"}}/>
							<TextField
								floatingLabelText="用户名"
								floatingLabelStyle={{color:"gray"}}
								value={this.state.userName}
								inputStyle={{margin:0}}
								onChange={(e,userName)=>this.setState({userName})}
					        />
					    </div>
					    <div style={{display:"flex",justifyContent:"center"}}>
							<Psw style={{alignSelf:"flex-end",margin:"0 10 13 0"}}/>
					        <TextField
								floatingLabelText="密码"
								floatingLabelStyle={{color:"gray"}}
								value={this.state.psw}
								type="password"
								inputStyle={{margin:0}}
								onChange={(e,psw)=>this.setState({psw})}
					        />
					    </div>
				        <div style={{maxWidth:250,margin:"30 auto"}}>
					        <Checkbox
								label="记住用户"
								checked={this.state.isRemember}
								onCheck={(e,isRemember)=>this.setState({isRemember})}
								style={{marginBottom: 16,}}
						    />
				        </div>
				        <FloatingActionButton 
				        	style={{position:"absolute",top:"50%",left:"100%",marginTop:-28,marginLeft:-28}}
				        	secondary={true}
				        	onTouchTap={()=>getRepo(this.login)}>
					    	<Right />
					    </FloatingActionButton>
					</Paper>
				</div>
			</div>
		)
	}
}