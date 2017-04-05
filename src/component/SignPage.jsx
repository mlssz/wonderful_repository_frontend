/* The page of sign up info for participters
 *
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 09.03.2016
 */
import React, { Component } from "react"

import Divider from "material-ui/Divider"
import {grey500} from "material-ui/styles/colors"
 
import InfoDialog from "./tool/InfoDialog.jsx"
import {FlatULButtonSection} from "./buttons/UpLoadButton.jsx"
import {CenterButtons} from "./buttons/BetweenButtons.jsx"
import {LenCtlTextField, RegCtlTextField} from "./textfield/InputContrlTextField.jsx"
import {hashChange} from "./lib/pageFun.js"
import {PostParticipator} from "./lib/callToBack.js"


export default class SignPage extends Component {

  constructor(props){
    super(props)
    this.state = {
      "disabled": false  //while touch down button , disable all button and textField
    }

    this.fields = {
      "Name": { "isValid": 0, "value": "" },
      "School": { "isValid": 0, "value": "" },
      "StudentNumber": { "isValid": 0, "value": "" },
      "Phone": { "isValid": 0, "value": "" },
      "QQ": { "isValid": 0, "value": "" },
      "Email": { "isValid": 0, "value": "" },
      "Github": { "isValid": 0, "value": "" },
      "Resume": { "isValid": 0, "value": "" }
    }
    this._dialog = {}

    this.callbacks = this.callbacks.bind(this)
    this.fileCallbacks = this.fileCallbacks.bind(this)
    this.handleButtonTouchTap = this.handleButtonTouchTap.bind(this)
  }

  callbacks(fieldname){
    return {
      "callback": (value) => {
        this.fields[fieldname] = {
          "isValid": 1,
          "value": value.trim()
        }
      },
      "errCallback": () => {
        this.fields[fieldname] = {
          "isValid": 0,
          "value": ""
        }
      }
    }  
  }

  fileCallbacks(){
    return {
      "callback": (value, file) => {
        this.fields["Resume"] = {
          "isValid": 1,
          "value": file
        }
      },
      "errCallback": () => {
        this.fields["Resume"] = {
          "isValid": 0,
          "value":""
        }
      }
    }  
  }

  handleButtonTouchTap(){
    let fields = this.fields

    for(let key in fields){
      if(key === "Github" || key === "Resume") continue

      if(fields[key].isValid === 0){
        return
      }
    }
    this.setState({
      "disabled": true
    })

    PostParticipator({
      "name": fields["Name"].value,
      "school": fields["School"].value,
      "sno": fields["StudentNumber"].value,
      "phone": fields["Phone"].value,
      "qq": fields["QQ"].value,
      "email": fields["Email"].value,
      "github": fields["Github"].value,
      "file": fields["Resume"].value
    }, (err, data) => {
      this.setState({
        "disabled": false
      })

      if(err){
        this._dialog.Open("Error", err.toString())
        return
      }

      if(data["status"] === 1)
        this._dialog.Open("Error", data.message)
      else
        hashChange("success")
    })
  }
  
  render() {
    let okButton = { "label": "OK", "onTouchTap": this.handleButtonTouchTap, "type": 2}
    let divStyle = { "height": 82, "padding": 4, "margin": "0 auto"}
    let textField = { "width": "100%" }
    let PdivderStyle = { "margin": "15px 5px 0 5px" ,fontSize:"1.3em", color: grey500}
    let uploadJudgeValid = (value, file) => {
      if(file.size >= 2*1024*1024){
        return "File size should be smaller than 2M."
      }

      let suffix = value.split("\\").pop().split(".", 2).pop()
      if(suffix !== "pdf" && suffix !== "md" && suffix !== "markdown"){
        return "File type should be pdf or markdown."
      }
      return null
    }

    return (
        <div style={{padding: "16px", margin: "0 auto", width: "300px" }} >
          <InfoDialog ref={(c)=>{this._dialog = c}} />
          <p style={PdivderStyle}>{"Required"}</p>
          <Divider/ >
          <div style={divStyle} key={1} >
            <LenCtlTextField hintText="Let's remember you!" floatingLabelText="Name"  minl={0} maxl={20}
              errString="Name is indispensable ! And Length of Name should be between 1 to 20 !" style={textField}
              {...this.callbacks("Name")} disabled={this.state.disabled}/>
          </div>
          <div style={divStyle} key={2} >
          <LenCtlTextField hintText="We believe your school is wonderful!" floatingLabelText="School" minl={1} maxl={20}
              errString="Length of your school name should be between 2 to 20" style={textField}
              {...this.callbacks("School")} disabled={this.state.disabled}/>
          </div>
          <div style={divStyle} key={3} >
            <RegCtlTextField hintText="If you have ..." floatingLabelText="StudentNumber" reg={/^[ \t\s]*[0-9]{0,30}[ \t\s]*$/}
              errString="StudentNumber should be a number string, and Length of it should be smaller than 30 !" style={textField}
              {...this.callbacks("StudentNumber")} disabled={this.state.disabled}/>
          </div>
          <div style={divStyle} key={4} >
            <RegCtlTextField hintText="We will not make nuisance calls." floatingLabelText="Phone" reg={/^[ \t\s]*[0-9]{11}[ \t\s]*$/}
              errString="Phone should be a number string, and Length of it should be 11 !" style={textField}
              {...this.callbacks("Phone")} disabled={this.state.disabled}/>
          </div>
          <div style={divStyle} key={5} >
            <RegCtlTextField hintText="Let's chat on-line!" floatingLabelText="QQ" reg={/^[ \t\s]*[0-9]{5,12}[ \t\s]*$/}
              errString="QQ should be a number string, and Length of it should be between 5 to 12 !" style={textField}
              {...this.callbacks("QQ")} disabled={this.state.disabled}/>
          </div>
          <div style={divStyle} key={6} >
            <RegCtlTextField hintText="This is the most important!" floatingLabelText="Email" reg={/^[ \t\s]*\w+(\.\w+)*@(\w+\.)+\w{2,3}[ \t\s]*$/}
              errString="Please input a right email" style={textField}
              {...this.callbacks("Email")} disabled={this.state.disabled}/>
          </div>
          <p style={PdivderStyle}>{"Optional"}</p>
          <Divider/ >
          <div style={divStyle} key={7} >
            <RegCtlTextField hintText="便于我们删选参赛者 (for hackathon)" floatingLabelText="Github" reg={/^[ \t\s]*\w+[ \t\s]*$/}
              errString="Please input a right Github Name" style={textField}
              {...this.callbacks("Github")} disabled={this.state.disabled}/>
          </div>
          <div style={{"height": 66, "padding": "20px 4px 4px 4px", "margin": "0 auto"}} key={8} >
            <FlatULButtonSection defaultInfo={"便于与合适的公司进行交流"} 
              judgeValid={uploadJudgeValid} 
              {...this.fileCallbacks()} disabled={this.state.disabled}/>
          </div>
          <div style={{padding: "0", margin: "5px auto 15px", width: 88}}>
            <CenterButtons buttons={[okButton]}  disabled={this.state.disabled}/>
          </div>
        </div>
    )
  }
}
SignPage.propTypes = {style: React.PropTypes.object}
SignPage.defaultProps = {style: {}}

