/* This component defined many contrler components input text field
 *
 * Usage: 
 *	   import XXXCtlTextField from "./component/InputContrlTextField.jsx"
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 09.03.2016
 */
import React, { Component } from "react"

import TextField from "material-ui/TextField"
import {MergeObjects} from "../lib/util.js"

//function for judge value by reg
export const regJudger = (reg) => {
  return (value) => reg.test(value)
}
  

export const lenJudger = (minl, maxl) => { 
  return (value) => {
    let valueLen= value.length
    return valueLen > minl && valueLen < maxl
  }
}

/* special value text input contrler
 * @prop reg RegExp a reg to match special text
 * @prop errString String the error info [default:"Length of text mast between 0 and 100!"]
 * @prop errCallback Function if input is error , call it
 * @prop callback Function if input is true, call it
 */
export const RegCtlTextField = (props) => {

  return (
    <BaseCtlTextField {...props} judgeFunc={regJudger(props.reg)} />
  )
}
RegCtlTextField.propTypes = {
  reg: React.PropTypes.object,
  errString: React.PropTypes.string
}
RegCtlTextField.defaultProps = {
  reg: /don"t forget it/i,
  errString: "Please input suit value!"
} 

/* length text input contrler
 * @prop minl Number min length [default:0]
 * @prop maxl Number max length [default:100]
 * @prop errString String the error info [default:"Length of text mast between 0 and 100!"]
 * @prop errCallback Function if input is error , call it
 * @prop callback Function if input is true, call it
 */
export const LenCtlTextField = (props) => {
  return (
    <BaseCtlTextField {...props} judgeFunc={lenJudger(props.minl, props.maxl)} />
  )
}
LenCtlTextField.propTypes = {
  minl: React.PropTypes.number,
  maxl: React.PropTypes.number,
  errString: React.PropTypes.string
}
LenCtlTextField.defaultProps = {
  minl: 0,
  maxl: 100,
  errString: "Length of text mast between 0 and 100!"
} 

/* this are two TextField, one get init value , other confirm the value ,
 * usually used in confirm password input
 *
 * @prop confirmErrString String the error string while confirm two values failed
 * @prop errString String the error info [default:"Length of text mast between 0 and 100!"]
 * @prop errCallback Function(string ,string) if input is error , call it
 * @prop callback Function(value) if input is true, call it
 * @prop judgeFunc Function(vlaue) fuction for judge whether the value is valid
 */
export class ConfirmCtlTextField extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      "upValue": "",
      "downValue": "",
      "upIsErr": false,
      "upErrString": "",
      "downErrString": ""
    }

    this.divDefaultStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexFlow: "column"
    }

    this.tfDivDefaultStyle = {
      margin: "10px 0",
      height: 88
    }

    this.confirmJudgeFunc = this.confirmJudgeFunc.bind(this)
    this.upHandleOnChange = this.upHandleOnChange.bind(this)
    this.upHandleOnBlur = this.upHandleOnBlur.bind(this)
    this.downHandleOnBlur = this.downHandleOnBlur.bind(this)
    this.downHandleOnChange = this.downHandleOnChange.bind(this)
  }

  confirmJudgeFunc(){
    let state = this.state

    if(!(state.upValue.length > 0 && state.downValue.length > 0)) return 
    // while upValue and downValue are both full, do follow

    if(state.upValue === state.downValue){
      this.setState({
        "downErrString": ""
      })
      this.props.callback(state.upValue)
    }else{
      this.setState({
        "downErrString": this.props.confirmErrString
      })
      this.props.errCallback(state.upValue, state.downValue)
    }
  }

  upHandleOnChange(event){
    this.setState({
      upValue: event.target.value
    })

    if(this.state.upIsErr === false) return
    
    if(this.props.judgeFunc(event.target.upValue)){
      this.setState({
        "upErrString": ""
      })
    }else{
      this.setState({
        "upErrString": this.props.errString
      })
    }
  }

  upHandleOnBlur(){
    if(this.props.judgeFunc(this.state.upValue)){
      this.setState({"upIsErr": false, "upErrString": ""})
      this.confirmJudgeFunc()
    }else{
      this.setState({
        "upIsErr": true,
        "upErrString": this.props.errString
      })
      this.props.errCallback(this.state.upValue, this.state.downValue)
    }
  }

  downHandleOnChange(event){
    this.setState({
      downValue: event.target.value
    })
  }

  downHandleOnBlur(){
    this.confirmJudgeFunc()
  }

  render() {

    let divStyle = {}
    MergeObjects(divStyle, this.divDefaultStyle)
    MergeObjects(divStyle, this.props.divStyle)

    let tfDivStyle = {}
    MergeObjects(tfDivStyle, this.tfDivDefaultStyle)
    MergeObjects(tfDivStyle, this.props.tfStyle)
    //let errString = this.state.upIsValid ? this.props.confirmErrString  
                                         //: this.props.errString 
    return (
      <div style={divStyle}>
        <div style={tfDivStyle}>
          <TextField {...this.props} type={"password"} errorText={this.state.upErrString} 
            onChange={this.upHandleOnChange} onBlur={this.upHandleOnBlur} />
        </div>  
        <div style={tfDivStyle}>
        <TextField floatingLabelText={"Input Again"} type={"password"} errorText={this.state.downErrString} 
          onChange={this.downHandleOnChange} onBlur={this.downHandleOnBlur} />
        </div>  
      </div>  
    )
  }
}
ConfirmCtlTextField.propTypes = {
  divStyle: React.PropTypes.object,
  tfStyle: React.PropTypes.object,
  errString: React.PropTypes.string,
  confirmErrString: React.PropTypes.string,
  errCallback: React.PropTypes.func,
  callback: React.PropTypes.func
}
ConfirmCtlTextField.defaultProps = {
  divStyle: {},
  tfStyle: {
    margin: "10px 0"
  },
  errCallback: () => console.log("error value"),
  callback: () => console.log("true value"),
  errString: "Your input is wrong",
  confirmErrString: "Two inputs don't match the confirmation"
}


/* base text input contrler
 * @prop errString String the error info [default:"Length of text mast between 0 and 100!"]
 * @prop errCallback Function if input is error , call it
 * @prop callback Function(value) if input is true, call it
 * @prop judgeFunc Function(vlaue) fuction for judge whether the value is valid
 */
export class BaseCtlTextField extends Component {

  constructor(props){
    super(props)
    this.state = {
      "isError": 0,
      "value": "",
      "errValue": ""
    }

    this.ctlJudge_and_changeText = this.ctlJudge_and_changeText.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
  }

  //TODO: this.state.value is not needed to put in state , for while it change ,nothing should be change 
  //      so, we can put it in this.value
  /* this component "s  core, it change errorText and call resove or reject
   * @param resove Function(String) 
   * @param reject Function(String)
   */
  ctlJudge_and_changeText(resove, reject){
    let value = this.state.value
    let JudgeFunc = this.props.judgeFunc

    if(JudgeFunc(value)){
      this.setState({
        errValue: ""
      })
      resove && resove(value)
    }else{
      this.setState({
        errValue: this.props.errString
      })
      reject && reject(value)
    }
  }

  handleOnChange(event){
    this.setState({
      value: event.target.value
    })

    if(this.state.isError === 1){
      this.ctlJudge_and_changeText()
    }
  }

  handleOnBlur(){
    this.ctlJudge_and_changeText(
      (value) => {
        this.setState({"isError": 0})
        this.props.callback(value)
      },
      (value) => {
        this.setState({"isError": 1})
        this.props.errCallback(value)
      }
    )
  }

  render() {

    return (
      <TextField {...this.props} errorText={this.state.errValue} 
        onChange={this.handleOnChange} onBlur={this.handleOnBlur} />
    )
  }
}
BaseCtlTextField.propTypes = {
  judgeFunc: React.PropTypes.func.isRequired,
  errString: React.PropTypes.string,
  errCallback: React.PropTypes.func,
  callback: React.PropTypes.func
}
BaseCtlTextField.defaultProps = {
  judgeFunc: (value) => value,
  errString: "Your input is wrong!",
  errCallback: () => console.log("error value"),
  callback: () => console.log("true value")
} 

