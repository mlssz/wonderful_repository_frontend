import React, { Component  } from "react"

import {MergeObjects} from "../lib/util.js"


/* this frame means one textfield and one button (inline)
 * like:
 *  ____________  | button |
 *
 * @prop textseat Number 0 means left , 1 means right
 * @prop textelement RectElement 
 * @prop buttonelement RectElement
 * @prop textSpanStyle Object the style of textelement"s span
 * @prop buttonSpanStyle Object the style of buttonelement"s span
 * @prop style Object the object of frame
 */
export class InlineTBFrame extends Component {
  
  constructor(props) {
    super(props)
    
    this.divStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }

  render() {
    let divStyle = {}
    MergeObjects(divStyle, this.divStyle)
    MergeObjects(divStyle, this.props.style)

    let elements = [
      ( 
         <span style={this.props.textSpanStyle}>
          {this.props.textelement}
        </span>
      ),
      (
        <span style={this.props.buttonSpanStyle}>
          <div style={{margin: "28px 0 0 0"}}>
            {this.props.buttonelement}
          </div>
        </span>
      )
    ]

    if(this.props.textseat !== 0){
      elements.push(elements.shift())
    }


    return (
      <div style={divStyle}>
        {elements}
      </div>
    )
  }
}
InlineTBFrame.propTypes = {
  textseat: React.PropTypes.number,
  textelement: React.PropTypes.element.isRequired,
  buttonelement: React.PropTypes.element.isRequired,
  textSpanStyle: React.PropTypes.object,
  buttonSpanStyle: React.PropTypes.object,
  style: React.PropTypes.object
}
InlineTBFrame.defaultProps = {
  textseat: 0,
  textSpanStyle: {height: "100%", margin:"0 10px"},
  buttonSpanStyle: {height: "100%",  margin: "0 10px"},
  style: {}
}
