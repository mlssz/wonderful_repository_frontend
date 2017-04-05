import React, { Component  } from "react"

import {MergeObjects} from "../lib/util.js"

/* show inside plane string
 *
 * @prop scale Number the scale of the string
 * @prop string String the value of the string which to show
 */
export let InsidePlaneString = (props) => {
  
  return (<PlaneString {...props} textStyle={{
      color: "#dcdcdc",
      textShadow: "1px 1px 0 #eee"
    }} />)
}

/* show plane string 
 *
 * @prop scale Number the scale of the string
 * @prop strings Array<String> the value of the string which to show
 * @prop textStyle Object string style
 */
export default class PlaneString extends Component {
  
  constructor(props){
    super(props)

    this.defaultTextStyle = {
      textAlign: "center",
      fontWeight: 600,
      fontSize: 12
    }
  }

  render() {

    let ts = {}
    MergeObjects(ts, this.defaultTextStyle)
    MergeObjects(ts, this.props.textStyle)
    ts["fontSize"] = ts["fontSize"] * this.props.scale

    let ps = this.props.strings.map((string) => {
      return <p style={ts}>{string}</p>
    })

    return (
      <div style={{margin: "200px auto"}}>
        {ps}
      </div>
    )
  }
}
PlaneString.propTypes = {
  scale: React.PropTypes.number,
  strings: React.PropTypes.arrayOf(React.PropTypes.string)
}
PlaneString.defaultProps = {
  scale: 1,
  strings: ["my site"],
  textStyle: {
      color: "#000",
      textShadow: "1px 1px 0 #eee"
    }
}
