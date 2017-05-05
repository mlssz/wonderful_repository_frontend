import React, { Component  } from "react"

import CircularProgress from "material-ui/CircularProgress"
import {Card, CardTitle} from "material-ui/Card"

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
 * @prop size Number the scale of the loading signal [default: 100]
 * @prop thickness Number stroke width in pixels
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
      margin: "30px auto",
      width: this.props.size,
      height: this.props.size
    }

    let PlaneStyle = Object.assign({}, this.planeDefaultStyle, this.props.style)

    return (
      <div className="Plane" style={PlaneStyle}>
        <div className="Loading" style={LoadingStyle} >
          <CircularProgress
              size={this.props.size}
              thickness={this.props.thickness}
          />
        </div>
      </div>
    )
  }
}
Loading.propTypes = {
  style: React.PropTypes.object,
  size: React.PropTypes.number,
  thickness: React.PropTypes.number,
}
Loading.defaultProps = {
  style: {},
  size: 100,
  thickness: 5,
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



