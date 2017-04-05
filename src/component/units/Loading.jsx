import React, { Component  } from "react"

import CircularProgress from "material-ui/CircularProgress"
import {Card, CardTitle} from "material-ui/Card"

import {MergeObjects} from "../lib/util.js"

export class StaticLoading extends Component {

  constructor(props){
    super(props)
    this.style = {
      position: "absolute"
    }
  }

  render() {

    return (
      <div style={this.style}>
        <Loding/>
      </div>
    )
  }
}
StaticLoading.propTypes = {style: React.PropTypes.object}
StaticLoading.defaultProps = {style: {}}

/* the loading div 
 *
 * @prop style Object the style of the outside plane div
 * @prop size Number the scale of the loading signal [default: 1.7]
 * @prop value Number The value of progress, only works in determinate mode.
 */
export class Loading extends Component {
  
  constructor(props) {
    super(props)
    
    this.planeDefaultStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexFlow: "column"
    }
  }

  render() {
    let LoadingStyle = {
      margin: "auto auto",
      width: 50+10*2+17.5*this.props.size*2,
      height: 50+10*2+17.5*this.props.size*2
    }

    let PlaneStyle = {}

    MergeObjects(PlaneStyle, this.planeDefaultStyle)
    MergeObjects(PlaneStyle, this.props.style)

    return (
      <div className="Plane" style={PlaneStyle}>
        <div className="Loading" style={LoadingStyle} >
          <CircularProgress mode="indeterminate" size={this.props.size} value={this.props.value}/> 
        </div>
      </div>
    )
  }
}
Loading.propTypes = {
  style: React.PropTypes.object,
  size: React.PropTypes.number,
  value: React.PropTypes.number
}
Loading.defaultProps = {
  style: {},
  size: 1.7,
  value: 60
}


export class LoadingCard extends Component {
  
  constructor(props) {
    super(props)
    this.minHeight = 400
    this.style = {}
  }

  render() {
    let children = null 
    let style = this.style
    style.minHeight = this.minHeight+"px"

    for(let key in this.props.style){
      style[key] = this.props.style[key]
    }

    if(this.props.isloading){
      children = <Loading style={{margin: "50px"}}/>
    }else{
      children = this.props.children
    }

    return (
      <Card style={style} >
        <CardTitle title={this.props.cardTitle}/>
        {children}
      </Card>
    )
  }
}
LoadingCard.propTypes = {
  //headColumns is the name of the Columns , but rowColumns is the key name of the Column element
  cardTitle: React.PropTypes.string,
  isloading: React.PropTypes.bool
}
LoadingCard.defaultProps = {
  style: {},
  cardTitle: "Title",
  isloading: true
}



