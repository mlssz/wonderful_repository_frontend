import React, { Component  } from "react"

import FlatButton from "material-ui/FlatButton"
import FontIcon from "material-ui/FontIcon"
import {grey400, darkBlack, amberA700} from "material-ui/styles/colors"

import {FilterKeyMerge, MergeObjects} from "../lib/util.js"

/* a upload component (while show up file info)
 *
 * @prop style Object div style
 * @prop judgeValid Func(value, file) check the changed value, if it doesn"t return null, 
 *                                     the returned value should be a string and it means error reason
 * @prop callback Func(value, file) if the change value is valid, call this function 
 * @prop errCallback Func(value, file) if the change value is invalid, call this function 
 * @prop defaultInfo String the default value for info
 */
export class FlatULButtonSection extends Component {

  constructor(props){
    super(props)
    this.state = {
      "errString": "",
      "info": ""
    }

    this.defaultDivStyle = {
      //display: "flex",
      //justifyContent: "start",
      //alignItems: "flex-end",
    }

    this.handleFileChange = this.handleFileChange.bind(this)
  }

  handleFileChange(value, file){
    let err = this.props.judgeValid(value, file)
    if(err !== null && !!err){
      this.setState({
        "errString": err
      })

      this.props.errCallback(value, file)
    }else{
      this.setState({
        "errString":"",
        "info": "File: "+value.split("\\").pop()
      })

      this.props.callback(value, file)
    }
  }

  render() {

    let infoElement = (value, color) => {
      let style = {
        color: color ? color : grey400,
        fontSize: "0.8em",
        margin: "0 0 0 5px"
      }
      return (
        <span style={style}>{value}</span>
      )
    }

    let info = this.state.errString ? infoElement(this.state.errString, "red")
                 : this.state.info ? infoElement(this.state.info, darkBlack)
                   : infoElement(this.props.defaultInfo)

    let divStyle = MergeObjects(
       MergeObjects({}, this.defaultDivStyle), this.props.style)

    return (
      <div style={divStyle}>
        <FlatULButton 
          label={"Resume"}
          primary={true}
          buttonStyle={{color: amberA700}}
          onChange={this.handleFileChange}
        />
        {info}
      </div>
    )
  }
}
FlatULButtonSection.propTypes = {
  style: React.PropTypes.object,
  callback: React.PropTypes.func,
  errCallback: React.PropTypes.func,
  judgeValid: React.PropTypes.func,
  defaultInfo: React.PropTypes.string
}
FlatULButtonSection.defaultProps = {
  style: {},
  callback: (value, file) => console.log("file change"),
  errCallback: (value, file) => console.log("err file"),
  judgeValid: (value, file) => null,
  defaultInfo: "please select up load file !"
}

/* flat upload button 
 *
 * @prop buttonStyle Object
 * @prop onTouchTap Func
 * @prop onChange Func
 * other flat prop
 */
export default class FlatULButton extends Component {

  constructor(props){
    super(props)
    this.state = {"state":1}

    this.defaultStyle = {
      cursor: "pointer",
      margin: "0 0",
      padding: "0 0",
      left: 0,
      top: 0,
      width: 120
    }
  }

  render() {

    let buttonStyle = MergeObjects(
        MergeObjects({}, this.defaultStyle), this.props.buttonStyle)

    return (
      <BaseULButton buttonComponent={FlatButton} 
        {...this.props}
        style={buttonStyle}
        icon={<FontIcon className="material-icons" >file_upload</FontIcon>}
      />
    )
  }
}
FlatULButton.propTypes = {
  buttonStyle: React.PropTypes.object,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onTouchTap: React.PropTypes.func
}
FlatULButton.defaultProps = {
  buttonStyle: {},
  label: "Up Load",
  onTouchTap: ()=>{console.log("to up load")},
  onChange: (value, file)=>{console.log(value, file)}
}


/* the base Upload file button 
 * a button Component + a hidden file input tag
 *
 * @prop buttonComponent Object(react component) 
 * and other prop to button Component
 */
export class BaseULButton extends Component {

  constructor(props){
    super(props)
    this.state = {"state":1}

    this._input = {}
    this.handleButtonTouchTap = this.handleButtonTouchTap.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
  }

  handleButtonTouchTap(...params){
    if(!this._input) return console.log("no file input!") 

    this._input.click()
    this.props.onTouchTap(params)
  }

  handleFileChange(event){
    let input = event.target
    let file = input.files[0]
    let value = input.value

    this.props.onChange(value, file) 
  }

  render() {
    let buttonProps = FilterKeyMerge({}, this.props, ["onTouchTap", "onChange"])

    return (
      <span >
        <this.props.buttonComponent  {...buttonProps} onTouchTap={this.handleButtonTouchTap}/>
        <input ref={(c)=>{this._input = c}} style={{display: "none"}} type={"file"} onChange={this.handleFileChange}/>
      </span>
    )
  }
}
BaseULButton.propTypes = {
  style: React.PropTypes.object,
  buttonComponent: React.PropTypes.func.isRequired,
}
BaseULButton.defaultProps = {
  style: {}
}
//style={{width: this.props.style.width}}
