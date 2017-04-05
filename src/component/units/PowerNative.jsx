/* This file define many powerful native component 
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 03.04.2016
 */
import React, { Component  } from "react"

import {hashChange} from "../lib/pageFun.js"

/* this <a> component could change style while mouse over
 *
 * @prop outStyle Object the style while mouse out
 * @prop overStyle Object the style while mouse over
 */
export class PowerA extends Component {

  constructor(props){
    super(props)
    this.state = {"isHovered":false}

    this.handleHowered = this.handleHowered.bind(this)
    this.handleLeave = this.handleLeave.bind(this)
  }

  handleHowered(){
    this.setState({
      "isHovered": true
    })
  }

  handleLeave(){
    this.setState({
      "isHovered": false
    })
  }

  render() {

    let style = this.state.isHovered ? this.props.overStyle : this.props.outStyle

    return (
      <a onMouseOver={this.handleHowered} onMouseOut={this.handleLeave} {...this.props} style={style}>
        {this.props.children}
      </a>
    )
  }
}
PowerA.propTypes = {
  outStyle: React.PropTypes.object,
  overStyle: React.PropTypes.object
}
PowerA.defaultProps = {
  outStyle: {},
  overStyle: {}
}
