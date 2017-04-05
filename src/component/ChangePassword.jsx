import React, { Component  } from "react"

import {Card, CardTitle} from "material-ui/Card"
import TextField from "material-ui/TextField"

import {BasicCard} from "./card/CommonCard.jsx"
import InfoDialog from "./tool/InfoDialog.jsx"
import {Loading} from "./units/Loading.jsx"
import BetweenButtons from "./buttons/BetweenButtons.jsx"
import {ConfirmCtlTextField, regJudger} from "./textfield/InputContrlTextField.jsx" 

import {hashChange, parseParams, uriChange} from "./lib/pageFun.js"
import {Check_username, Check_password} from "./lib/inputCheck.js"
import {UserChangePassword} from "./lib/callToBack.js"


export default class ChangePasswordCard extends Component {
  
  constructor(props) {
    super(props)
    this.state = {"loading": 0} //1 is loading

    this.handleButtonTouchTap = this.handleButtonTouchTap.bind(this)
    this.callbacks = this.callbacks.bind(this)

    this.value = {
      isValid: false,
      value: ""
    }
    this._dialog = {}
  }

  callbacks(){
    return {
      "callback": (value) => {
        this.value = {
          "isValid": true,
          "passwd": value.trim()
        }
      },
      "errCallback": () => {
        this.value = {
          "isValid": false,
          "passwd": ""
        }
      }
    }  
  }

  handleButtonTouchTap() {
    console.log(this.value)
    if(!this.value.isValid) return;

    this.setState({
      loading: 1
    })
    UserChangePassword(this.value.passwd, (err, data) => {
      this.setState({
        loading: 0
      })
      if(err){
        this._dialog.Open("Error", err.toString())
        return
      }

      if(data["status"]){
        this._dialog.Open("Error", data["message"])
      }else{
        uriChange("/ghost/")
      }
    })
  }

  render() {
    let changePasswordButton =  {"label": "Ok", "onTouchTap": this.handleButtonTouchTap, "type": 1}
    let backButton = { "label": "Back", "onTouchTap": () => {hashChange("")}, "type": 2}

    if(this.state.loading){
      changePasswordButton.disabled = 1
    }

    let BCstyle = {
      margin: "100px auto",
      width: "700px",
      background: "white"
    }

    let loading = (
      <Loading style={{
        height: 778
      }} size={2}/>
    )

    let confirmCtlTextField = (
      <ConfirmCtlTextField 
        floatingLabelText={"New Password"}
        hintText={"Don't too simple..."}
        confirmErrString={"Password doesn't match the confirmation"} 
        errString={"Password should Length of password should be between 6 to 20"}
        judgeFunc={regJudger(/^[\t \s]*[0-9a-zA-Z_]{6,20}[\t \s]*$/)}
        {...this.callbacks()}
      />
    )


    return (
      <BasicCard title={"Change Password"} subtitle={"for data safe"} style={BCstyle}>
        <InfoDialog ref={(c)=>{this._dialog = c}}/>
        <div style={{padding: "16px", margin: "0 0" , height: 248}} >
          {this.state.loading ?  loading : confirmCtlTextField}
        </div>
        <BetweenButtons buttons={[changePasswordButton, backButton]} style={{padding: "16px", margin: "0 0"}}/>
      </BasicCard>
    )
  }
}
ChangePasswordCard.propTypes = {style: React.PropTypes.object}
ChangePasswordCard.defaultProps = {style: {}}
