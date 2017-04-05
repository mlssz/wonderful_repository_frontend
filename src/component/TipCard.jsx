import React, { Component  } from "react"

import {amberA400, pink500} from "material-ui/styles/colors"
import Toggle from "material-ui/Toggle"

import {BasicCard} from "./card/CommonCard.jsx"
import InfoDialog from "./tool/InfoDialog.jsx"
import BetweenButtons from "./buttons/BetweenButtons.jsx"
import {RegCtlTextField} from "./textfield/InputContrlTextField.jsx"

import {MergeObjects} from "./lib/util.js"
import {hashChange} from "./lib/pageFun.js"
import {DeleteParticipators, SendEmail,GetSwitch,PatchSwitch} from "./lib/callToBack.js"

export class SToggleCard extends Component {

  constructor(props){
    super(props)
    this.state = {
      "isLoading": true,
      "toggle": false
    }
  
    this.BCstyle = {
      margin: "150px auto",
      width: "700px",
      background: "white"
    }
    this.toggleStyle = {
      maxWidth: 250,
      margin: "20px auto"
    }

    this.componentDidMount = this.componentDidMount.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  componentDidMount(){
    GetSwitch((err, body) => {
      this.setState({
        isLoading: false
      })

      if(err){
        this._dialog.Open("Error", err.toString())
        return 
      }

      if(body["status"] === 1){
        this._dialog.Open("Error", body["message"])
      }else{
        this.setState({
          toggle: body["message"]
        })
      }
    })
  }

  handleToggle(){
    let toggle = !this.state.toggle

    this.setState({
      "isLoading": true,
      "toggle": toggle
    })

    PatchSwitch(toggle, (err, body) => {
      if(err){
        this.setState({
          isLoading: false,
          toggle: !toggle
        })

        this._dialog.Open("Error", err.toString())
        return 
      }

      if(body["status"] === 1){
        this.setState({
          isLoading: false,
          toggle: !toggle
        })
        this._dialog.Open("Error", body["message"])
      }else{
        this.setState({
          isLoading: false
        })
      }
    })
  }

  render() {

    let BCstyle = MergeObjects(MergeObjects({}, this.BCstyle), this.props.style)

    return (
      <BasicCard title={"Toggle"} subtitle={"open or close sign up"} style={BCstyle} >
        <InfoDialog ref={(c)=>{this._dialog = c}} />
        <div style={{padding: "16px", margin: "0 0" ,  textAlign: "center"}} >
        <Toggle
          label="Sign Up Toggle"
          disabled={this.state.isLoading}
          defaultToggled={this.state.toggle}
          style={this.toggleStyle}
          onToggle={this.handleToggle}
          />
        </div>
      </BasicCard>
    )
  }
}
SToggleCard.propTypes = {
  style: React.PropTypes.object
}
SToggleCard.defaultProps = {
  style: {}
}

export  class ClearCard extends Component {
  
  constructor(props) {
    super(props)
    this.state = {"isLoading": false} //1 is isLoading

    this._dialog = {}
    
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(){
    DeleteParticipators("all",(err, body) =>{
      this.setState({isLoading: false})
      if(err){
        this._dialog.Open("Error", err.toString())
        return 
      }

      if(body["status"] === 1){
        this._dialog.Open("Error", body["message"])
      }else{
        hashChange("/")
      }
    })
  }

  render() {
    let BCstyle = {
      margin: "150px auto",
      width: "700px",
      background: "white"
    }

    let buttons = [
      {"label": "Delete", 
        "onTouchTap": this.handleDelete,
        "disabled": this.state.isLoading,
        "type": 1}, 
      {"label": "Back",
       "onTouchTap":() => hashChange("/"),
        "disabled": this.state.isLoading,
        "type": 2}
    ]

    BCstyle = MergeObjects(MergeObjects({}, BCstyle), this.props.style)

    return (
      <BasicCard title={"Clear"} subtitle={"delete all participators"} style={BCstyle} >
        <InfoDialog ref={(c)=>{this._dialog = c}} />
        <div style={{padding: "16px", margin: "0 0" , color: pink500, textAlign: "center"}} >
          <p>Clear Operation Will Delete All Participator Datas!</p>
          <p>Do you really want to do so?</p>
        </div>
        <BetweenButtons buttons={buttons} style={{padding: "16px", margin: "0 0"}}/>
      </BasicCard>
    )
  }
}
ClearCard.propTypes = {
  style: React.PropTypes.object
}
ClearCard.defaultProps = {
  style: {}
}

export class SendAllCard extends Component {

  constructor(props){
    super(props)
    this.state = {"isLoading": false} //1 is isLoading

    this._dialog = {}
    
    this.content ={
      value: "",
      isValid: false
    }
    this.callbacks = this.callbacks.bind(this)
    this.handleSend = this.handleSend.bind(this)
  }

  handleSend(){
    if(!this.content.isValid){
      return 
    }

    this.setState({isLoading: true})
    SendEmail("all", this.content.value,(err, body) =>{
      this.setState({isLoading: false})
      if(err){
        this._dialog.Open("Error", err.toString())
        return 
      }

      if(body["status"] === 1){
        this._dialog.Open("Error", body["message"])
      }else{
        this._dialog.Open("Ok", "Success To Send Emails To All Participators.")
      }
    })
  }

  callbacks(){
    return {
      "callback": (value) => {
        this.content = {
          "isValid": true,
          "value": value
        }
      },
      "errCallback": () => {
        this.content = {
          "isValid": false,
          "value": ""
        }
      }
    }  
  }

  render() {

    let BCstyle = {
      margin: "150px auto",
      width: "700px",
      background: "white"
    }

    let buttons = [
      {"label": "Send", 
        "onTouchTap": this.handleSend,
        "disabled": this.state.isLoading,
        "type": 1}, 
      {"label": "Back",
       "onTouchTap":() => hashChange("/"),
        "disabled": this.state.isLoading,
        "type": 2}
    ]

    BCstyle = MergeObjects(MergeObjects({}, BCstyle), this.props.style)

    return (
      <BasicCard title={"Send Email All"} subtitle={"send emails to all participators"} style={BCstyle} >
        <InfoDialog ref={(c)=>{this._dialog = c}} />
        <div style={{padding: "16px",color: amberA400, fontWeight: 900, margin:"0"}} >
          <p style={{margin:"0"}}>Please input the main content of email: </p>
          <RegCtlTextField 
            fullWidth={true}
            multiLine={true}
            rows={4}
            rowsMax={10}
            hintText="email main content..."
            floatingLabelText="Context"
            errString="You should input one world at least."
            reg={/^[ \t\s]*\S[\s\S]*[ \t\s]*$/} 
            {...this.callbacks()}
          />
        </div>
        <BetweenButtons buttons={buttons} style={{padding: "16px", margin: "0 0"}}/>
      </BasicCard>
    )
  }
}
SendAllCard.propTypes = {
  style: React.PropTypes.object
}
SendAllCard.defaultProps = {
  style: {}
}
