 /*  this is card lib
  *
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 09.03.2016
 */
import React, { Component } from "react"
 
import {Card, CardTitle, CardMedia} from "material-ui/Card"
import Divider from "material-ui/Divider"

import {windowSize} from "../lib/pageFun.js"
import {MergeObjects} from "../lib/util.js"


/* img card form , it while auto suit to the page size
 *
 * |--------------------------|
 * |          img             |
 * ----------------------------
 * |                          |
 * |                          |
 * |                          |
 * |                          |
 * ----------------------------
 * |         foot             |
 * ----------------------------
 * @prop style Object the additional style for card
 * @prop title String the title of the Card
 * @prop subtitle String the Subtitle title of the Card
 * @prop img String_or_Object the src for img or the img data
 * @prop foot Element the foot element
 */
export default class CommonImgCard extends Component {

  constructor(props){
    super(props)
    this.state = {
      "cardStyle": {},
      "imgStyle": {}
    }

    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount(){
    let win = windowSize()
    if(700 <= win.width && win.width < 800){
      this.setState({
        "cardStyle": { "margin": "0 auto", "width": "100%" },
        "imgStyle": {"display": "block"}
      })
    }else if( 325 <= win.width && win.width < 700){
      this.setState({
        "cardStyle": { "margin": "0 auto", "width": "100%" },
        "imgStyle": {"display": "none"}
      })
    }else if(win.width < 325){
      this.setState({
        "cardStyle": { "margin": "0 auto", "width": 325 },
        "imgStyle": {"display": "none"}
      })
    }else{
      this.setState({
        "cardStyle": { "margin": "100px auto", "width": 800 },
        "imgStyle": {"display": "block"}
      })
    }
  }

  
  render() {

    let style = {}
    MergeObjects(style, this.props.style)
    MergeObjects(style, this.state["cardStyle"])

    return (
      <BasicCard title={this.props.title} subtitle={this.props.subtitle} style={style}>
        <CardMedia >
            <img src={this.props.img} style={this.props.img ? this.state["imgStyle"] : {display: "none"}}/>
        </CardMedia>
        {this.props.children}
        {this.props.foot ? <Divider /> : null }
        {this.props.foot}
      </BasicCard>
    )
  }
}
CommonImgCard.propTypes = {
  style: React.PropTypes.object,
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  img: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),
  foot: React.PropTypes.element
}
CommonImgCard.defaultProps = {
  style: {},
  title: "Title",
  subtitle: "Subtitle"
}


/* the basic card , it only contain Title and Subtitle
 *
 * @prop title String 
 * @prop subtitle String
 * @prop style Object
 */
export class BasicCard extends Component {

  constructor(props){
    super(props)
  }

  render() {

    return (
      <Card style={this.props.style}>
        <CardTitle title={this.props.title} subtitle={this.props.subtitle}/>
        {this.props.children}
      </Card>
    )
  }
}
BasicCard.propTypes = {
  title: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string.isRequired,
  style: React.PropTypes.object
}
BasicCard.defaultProps = {
  style: {}
}
