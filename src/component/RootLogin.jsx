import React, { Component  } from "react"

import RaisedButton from "material-ui/RaisedButton"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from "material-ui/styles/getMuiTheme"

import InfoDialog from "./tool/InfoDialog.jsx"
import {LenCtlTextField} from "./textfield/InputContrlTextField.jsx"
import {InlineTBFrame} from "./frame/TextButtonFrame.jsx"

import RootPageTheme from "./logTheme.js"
import {uriChange} from "./lib/pageFun.js"
import {RootLogin} from "./lib/callToBack.js"
import {windowSize} from "./lib/pageFun.js"

export default class RootLoginBlock extends Component {

  constructor(props){
    super(props)
    this.state = {
      "disabled": false
    }

    this.value = {
      "passwd":"",
      "isValid": false
    }

    this.callbacks = this.callbacks.bind(this)
    this.handleButtonTouchTap = this.handleButtonTouchTap.bind(this)
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
      "errCallback": (value) => {
        this.value = {
          "isValid": false,
          "passwd": ""
        }
      }
    }  
  }

  handleButtonTouchTap(){
    if(!this.value.isValid) return 

    this.setState({
      disabled: true
    })

    RootLogin(this.value.passwd, (err, body) => {
      this.setState({
        disabled: false
      })

      if(err){
        this._dialog.Open("Error", err.toString())
        return
      }

      if(body["status"]){
        this._dialog.Open("Error", body["message"])
      }else{
        uriChange("/ghost/")
      }
    })

  }

  render() {
    let textField = (
      <LenCtlTextField hintText="Please input password" floatingLabelText="Root" minl={1} maxl={50}
         errString="Length of password should be between 1 to 50 ."  type={"password"}
        {...this.callbacks()} disabled={this.state.disabled} />
    )
    let button = (      
      <RaisedButton label="GO" secondary={true} labelColor={"black"} onTouchTap={this.handleButtonTouchTap}/>
    )
    
    let style = {
      width: 500,
      height: 88,
      margin: (windowSize().height-88)/2+"px auto"
    }
      
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(RootPageTheme)}>
        <div style={style}>
          <InfoDialog ref={(c)=>{this._dialog = c}} contentStyle={{color: "rgb(224,224,224)"}}/>
          <InlineTBFrame
          textelement={textField}
          buttonelement={button}
          style={{height:88, justifyContent: "center"}}/>
        </div>
      </MuiThemeProvider>
    )
  }
}
RootLoginBlock.propTypes = {style: React.PropTypes.object}
RootLoginBlock.defaultProps = {style: {}}
