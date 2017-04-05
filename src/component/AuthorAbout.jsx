import React, { Component  } from "react"

import FontIcon from "material-ui/FontIcon"
import {amberA700} from "material-ui/styles/colors"
import Divider from "material-ui/Divider"
import {Card, CardTitle} from "material-ui/Card"

import {BasicCard} from "./card/CommonCard.jsx"

import {MergeObjects} from "./lib/util.js"
import {windowSize} from "./lib/pageFun.js"

let footImage = require("../img/foot.png")

export class ProjectInfo extends Component {

  constructor(props){
    super(props)
    this.state = {"state":1}
  }

  render() {
    let BCstyle = {
      margin: "150px auto",
      width: "400px",
      background: "white"
    }

    let imgStyle = {
      width: 120,
      margin: "0 0 5px 0"
    }

    let pStyle = {
      margin: "5px 0"
    }

    BCstyle = MergeObjects(MergeObjects({}, BCstyle), this.props.style)

    return (
      <Card style={BCstyle}>
        <CardTitle title={"About"}/>
          <div style={{padding: "16px", margin: "0 0" }} >
          <div style={{textAlign: "center"}}>
            <p>\ (.= _ = ) /</p>
            <p style={pStyle}>Do What You Want! Fork Us On 
            <a href={"https://github.com/Gklub"} style={{color: amberA700,textDecoration: "none"}}> Github</a></p>
            <img src={footImage} style={imgStyle}/>
          </div>
          <br/>
          <div  style={{
            color:"rgba(0, 0, 0, 0.54)",
            margin: "5px 0 0 0",
            textAlign: "right"
          }}>
          <small>&copy; Mephis Pheies &nbsp; &copy; Chixyou</small>
          </div>
        </div>
      </Card>
    )
  }
}
ProjectInfo.propTypes = {
  style: React.PropTypes.object
}
ProjectInfo.defaultProps = {
  style: {}
}

export class GeekCardFoot extends Component {
  
  constructor(props){
    super(props)
    this.DivStyle={
      textAlign: "center",
      fontWeight: 500,
      fontSize: "0.7em",
      color: "rgb(118,118,118)",
      margin: "15px auto"}
    this.ImgStyle={
      width: 120, 
      verticalAlign: "middle" ,
      margin: "10px 150px"
    }
  }

  render() {

    let width = windowSize().width

    let child = (
        <div>Do What You Want<img src={footImage} style={this.ImgStyle}/>Fork Us On 
          <a href={"https://github.com/Gklub"} style={{color: amberA700,textDecoration: "none"}}> Github</a>
        </div>
    )

    if(width < 700){
      child = (
        <div>
        <p>Do What You Want! Fork Us On 
          <a href={"https://github.com/Gklub"} style={{color: amberA700,textDecoration: "none"}}> Github</a></p>
        <p style={{fontSize: "0.6em", fontWeight: 400}}>&copy; GeeKlub</p>
        </div>
      )
    }

    return (
      <div style={this.DivStyle}>
      {child}
      </div>
    )
  }
}
GeekCardFoot.propTypes = {
}
GeekCardFoot.defaultProps = {
}
