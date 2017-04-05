import React, { Component  } from "react"

import {Card, CardTitle} from "material-ui/Card"
import TextField from "material-ui/TextField"

import InfoDialog from "./tool/InfoDialog.jsx"
import BetweenButtons from "./buttons/BetweenButtons.jsx"

import {hashChange, parseParams, uriChange} from "./lib/pageFun.js"
import {Check_username, Check_password} from "./lib/inputCheck.js"
import {UserLogin} from "./lib/callToBack.js"


export default class LoginCard extends Component {
  
  constructor(props) {
    super(props)
    this.state = {"loading": 0} //1 is loading

    this.handleButtonTouchEnd = this.handleButtonTouchEnd.bind(this)
    this.handleUsernameOnChange = this.handleUsernameOnChange.bind(this)
    this.handlePasswordOnChange = this.handlePasswordOnChange.bind(this)

    this.username = {
      isValid: false,
      value: ""
    }
    this.password = {
      isValid: false,
      value: ""
    }
  }

  handleButtonTouchEnd() {
    if(!this.state.loading && this.username.isValid && this.password.isValid){

      this.setState({"loading": 1})

      UserLogin(this.username.value, this.password.value, (err, data) => {
        if(err){
          this._dialog.Open("Error",err.toString())
        }else if(data["status"]){
          this._dialog.Open("Error",data["message"])
        }else{
          let params = parseParams(window.location.search)

          if(params.next === undefined){
            uriChange("/")
          }else{
            uriChange(params.next)
          }
        }

        this.setState({"loading": 0})
      })
    }
  }

  handleUsernameOnChange(){
    if(this._username === undefined) return

    let username = this._username.getValue()
    let check_result = Check_username(username)

    if(! check_result.isValid){
      this._username.setErrorText(check_result.error)
      this.username.isValid = false
    }else{
      this._username.setErrorText("")
      this.username.isValid = true
      this.username.value = username
    }
  }

  handlePasswordOnChange(){
    if(this._password === undefined) return

    let password = this._password.getValue()
    let check_result = Check_password(password)

    if(! check_result.isValid){
      this._password.setErrorText(check_result.error)
      this.password.isValid = false
    }else{
      this._password.setErrorText("")
      this.password.isValid = true
      this.password.value = password
    }
  }

  render() {
    let loginButton = { "label": "Login", "onTouchEnd": this.handleButtonTouchEnd, "type": 1}
    let signUpButton =  {"label": "To Sign Up", "onTouchEnd": () => {hashChange("signup")}, "type": 2}
    let loading

    if(this.state.loading){
      loginButton.disabled = 1
    }

    return (
      <Card style={this.props.style}>
        <CardTitle title="Login" subtitle="Ready to System"/>
        <InfoDialog ref={(c)=>{this._dialog = c}}/>
        <div style={{padding: "16px", margin: "0 0", width: "100%" }} >
          <TextField style={{margin: "5px 0"}}
           floatingLabelText="Username" type="text" 
           ref={(c)=>{this._username = c}} onChange={this.handleUsernameOnChange}
           />
          <TextField style={{margin: "5px 0"}}
           floatingLabelText="Password" type="password" 
           ref={(c)=>{this._password = c}} onChange={this.handlePasswordOnChange}
           />
        </div>
        <BetweenButtons buttons={[loginButton, signUpButton]} style={{padding: "16px", margin: "0 0"}}/>
      </Card>
    )
  }
}
LoginCard.propTypes = {style: React.PropTypes.object}
LoginCard.defaultProps = {style: {}}
