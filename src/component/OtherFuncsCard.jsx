/* this Card is put many buttons of another function
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 20.03.2016
 */
import React, { Component  } from "react"

import {Card} from "material-ui/Card"

import BetweenButtons from "./buttons/BetweenButtons.jsx"
import InfoDialog from "./tool/InfoDialog.jsx"

import {MergeObjects} from "./lib/util.js"
import {hashChange} from "./lib/pageFun.js"
import {GetParticipatorsCSV} from "./lib/callToBack.js"

export default class OtherFuncsCard extends Component {

  constructor(props){
    super(props)

    this.state = {"isLoading": false}
  }

  render() {
    let BCstyle = {
      margin: "150px auto",
      width: "400px",
      background: "white"
    }

    let buttons = [
      {"label": "Send Email All", 
        "onTouchTap": () => hashChange("/sendall"),
        "disabled": 0,
        "type": 2, "btype": 1}, 
      {"label": "Export as CSV",
        "others":{
          "linkButton":true,
          "href": "/api/participators/download/"
        },
        "disabled": this.state.isLoading,
        "type": 2, "btype": 1}
    ]

    BCstyle = MergeObjects(MergeObjects({}, BCstyle), this.props.style)

    return (
      <Card style={BCstyle}>
        <InfoDialog ref={(c)=>{this._dialog = c}} />
        <BetweenButtons buttons={buttons} style={{padding: "16px", margin: "0 0"}}/>
      </Card>
    )
  }
}
OtherFuncsCard.propTypes = {
  style: React.PropTypes.object
}
OtherFuncsCard.defaultProps = {
  style: {}
}

