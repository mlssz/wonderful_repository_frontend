import React, { Component  } from "react"

import {darkBlack, pink500} from "material-ui/styles/colors"
import {List, ListItem} from "material-ui/List"
import FontIcon from "material-ui/FontIcon"
import Divider from "material-ui/Divider"
import RaisedButton from "material-ui/RaisedButton"

import {BasicCard} from "./card/CommonCard.jsx"
import {PowerA} from "./units/PowerNative.jsx"

import {MergeObjects} from "./lib/util.js"
import {uriChange} from "./lib/pageFun.js"

class ParticipatorList extends Component {

  constructor(props){
    super(props)

    this.icons = {
      "name": "face",
      "school": "school",
      "sno": "account_box",
      "qq": "account_circle",
      "phone": "phone_iphone",
      "email": "email",
      "github": "github"
    }
  }

  render() {

    let data = this.props.data
    let createFontIcon = (name, style={}) => {
      if(name == "github"){
        return <FontIcon className="fa fa-github" style={style} />
      }else{
        return <FontIcon className="material-icons" style={style}>{name}</FontIcon>
      }
    }
    let listItems = []

    for(let key in data){
      if(key == "hasResume") continue

      if(data[key]){
        listItems.push(
          <ListItem primaryText={
            key == "github" 
              ? (<PowerA href={"https://github.com/"+data[key]+"/"} 
                  outStyle={{color: darkBlack, fontWeight: 800, textDecoration: "none"}}
                  overStyle={{color: pink500, fontWeight: 800}}>{data[key]}</PowerA>)
              : data[key]} 
          secondaryText={key}
          leftIcon={createFontIcon(this.icons[key])} />)
      }
    }

    return (
      <List>
        {listItems}
      </List>
    )
  }
}
ParticipatorList.propTypes = {
  style: React.PropTypes.object,
  data: React.PropTypes.object.isRequired
}
ParticipatorList.defaultProps = {
  style: {}
}


export default class ParticipatorCard extends Component {
  
  constructor(props) {
    super(props)
    this.state = {"loading": 0} //1 is loading

    this._dialog = {}

  }

  render() {
    let BCstyle = {
      margin: "150px auto",
      width: "400px",
      background: "white"
    }

    let resume_suffix = this.props.data["hasResume"]
    let email = this.props.data["email"]

    BCstyle = MergeObjects(MergeObjects({}, BCstyle), this.props.style)

    return (
      <BasicCard title={"Participator"} subtitle={"more info"} style={BCstyle}  >
        <div style={{padding: "16px", margin: "0 0" }} >
          <ParticipatorList data={this.props.data} />
          <Divider />
        </div>
        <div style={{padding: "16px", margin: "0 0", textAlign: "right"}}>
          <RaisedButton
            label="Resume"
            linkButton={true}
            href={"/static/resumes/"+email+"."+resume_suffix}
            disabled={resume_suffix ? false : true}
            primary={true}
            icon={<FontIcon className="muidocs-icon-custom-github" />} />
        </div>
      </BasicCard>
    )
  }
}
ParticipatorCard.propTypes = {
  style: React.PropTypes.object,
  data: React.PropTypes.object.isRequired
}
ParticipatorCard.defaultProps = {
  style: {}
}
