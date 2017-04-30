/* this file define the button frameworks
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 29.03.2016
 */
import React, { Component  } from "react"

import RaisedButton from "material-ui/RaisedButton"
import FlatButton from "material-ui/FlatButton"
import FloatingActionButton from "material-ui/FloatingActionButton"

//TODO: modify CenterButtons , make it be reuseable

/* this function create buttons automatically
 *
 * button formate: {
 *  "label": string,
 *  "onTouchTap": function,
 *  "disabled": 1,
 *  "type": 0,1,2  //1: primary , 2: secondary, 0: default
 *  "btype": 0,1,2 //0: RaisedButton , 1: FlatButton 2:FloatingActionButton 
 *  "others": object , other props
 *  }
 *
 * @param elf Object button formate
 * @return ButtonElements 
 */
export function suitButton(elf){
  let props = elf.others !== undefined && elf.others instanceof Object ? elf.others : {}
  let children = []
  let Button = RaisedButton

  props.onTouchTap = elf.onTouchTap

  switch(elf.type){
    case 1: props.primary = true;break
    case 2: props.secondary = true;break
    default:
  }

  switch(elf.btype){
    case 1: Button=FlatButton;break
    case 2: Button=FloatingActionButton;break
    default:
  }

  if(elf.disabled){
    props.disabled = true
  }

  if(typeof elf.label === "string"){
    props.label = elf.label
  }else{
    children.push(elf.label)
  }

  return React.createElement(Button, props, ...children)
}

export class CenterButtons extends Component {
  
  constructor(props) {
    super(props)

    this.mainStyle = {
      display: "inline",
      margin: "0 auto"
    }
  }

  render() {

    let inlineButtons = this.props.buttons.map(suitButton)
    let style = Object.assign({}, this.mainStyle, this.props.style)

    return (
      <div style={style} >
        {inlineButtons}
      </div>
    )
  }
}
CenterButtons.propTypes = {
  style: React.PropTypes.object,
  buttons: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
}
CenterButtons.defaultProps = {style: {}}

export default class BetweenButtons extends Component {
  
  constructor(props) {
    super(props)

    this.mainStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }

  render() {
    for(let key in this.props.style){
      this.mainStyle[key] = this.props.style[key]
    }

    let inlineButtons = this.props.buttons.map(suitButton)

    return (
      <div style={this.mainStyle} >
        {inlineButtons}
      </div>
    )
  }
}
BetweenButtons.propTypes = {
  style: React.PropTypes.object,
  //button formate: [{"label": string, "onTouchTap": function, "disabled": 1 ,"type": 0,1,2}, ...]
  //1: primary , 2: secondary, 0: default
  buttons: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
}
BetweenButtons.defaultProps = {style: {}}
