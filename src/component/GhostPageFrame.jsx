/* This file define the dispatch and framework for ghost page
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 03.04.2016
 */
import React, { Component  } from "react"

import ParticipatorCard from "./Participator.jsx"
import {ProjectInfo} from "./AuthorAbout.jsx"
import Participators from "./Participators.jsx"
import OtherFuncsCard from "./OtherFuncsCard.jsx"

import {ClearCard, SToggleCard} from "./TipCard.jsx"

export default class GhostPageFrame extends Component {

  constructor(props){
    super(props)

    this.state = {
      "toShow": false,
      "data": {}
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(data){
    if(!this.state.data || this.state.data.email != data.email){
      this.setState({
        "toShow": true,
        "data": data
      })
    }else{
      this.setState({
        "toShow": false,
        "data": {}
      })
    }
  }

  render() {
    let floatMargin = (this.props.windowSize.width - 1050)/2
    floatMargin = floatMargin > 0 ? floatMargin : 0

    let margin_listcard = {
      float: "left",
      margin: "100px 30px 0 0"
    }
    
    let margin_participatorcard = {
      margin: "50px 0",
      float: "right"
    }
    let margin_otherfuncscard = {
      margin: "100px 0 0",
      float: "right"
    }

    return (
      <div style={{
        width: 1050,
        margin:"0 "+floatMargin+"px 40px",
        padding: "0", float:"left",
        overflowX: "scroll"
      }}>
        <Participators  style={margin_listcard} onRowClick={this.handleClick}/>
        <OtherFuncsCard style={margin_otherfuncscard} />
        {this.state.toShow 
          ? <ParticipatorCard style={margin_participatorcard} data={this.state.data}/> 
          : <ProjectInfo style={margin_participatorcard} /> }
      </div>
    )
  }
}
GhostPageFrame.propTypes = {
  style: React.PropTypes.object,
  windowSize: React.PropTypes.object.isRequired
}
GhostPageFrame.defaultProps = {
  style: {}
}

export class ControlPageFrame extends Component {

  constructor(props){
    super(props)
    this.state = {"state":1}

    this.divStyle = {
      margin: "150px auto",
      width: "700px"
    }
  
  }

  render() {

    return (
      <div style={this.divStyle}>
        <SToggleCard style={{margin: "0 auto"}} />
        <ClearCard style={{margin: "30px auto"}}/>
      </div>
    )
  }
}
ControlPageFrame.propTypes = {
  style: React.PropTypes.object
}
ControlPageFrame.defaultProps = {
  style: {}
}
