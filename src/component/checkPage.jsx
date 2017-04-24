import React, { Component } from "react"
import ReactDOM from "react-dom"

import Paper from "material-ui/Paper"
import Divider from 'material-ui/Divider'
import Chip from "material-ui/Chip"
import Avatar from "material-ui/Avatar"
import {blue300, indigo900, red300, pink900} from "material-ui/styles/colors"

const repo = {
        "id": 1,
        "available_space": 40,
        "stored_count": 23,
        "locations": (new Array(44)).fill(0).map((v, i) => {
          return {
            "id": i+1,
            "place": i % 4 + 1,
            "label": (44-i).toString(),
            "available_space": 34,
            "materials": [1, 2, 3]
          }
        })
}
const errors = [
  {
    "fixed": false,
    "error_code": 1,
    "repository": 1,
    "location": 28,
    "layer": 0,
    "material": 32143214,
    "image": "/errors/a.png"
  },
  {
    "fixed": false,
    "error_code": 1,
    "repository": 1,
    "location": 28,
    "layer": 0,
    "material": 32143214,
    "image": "/errors/a.png"
  },
  {
    "fixed": false,
    "error_code": 1,
    "repository": 1,
    "location": 23,
    "layer": 0,
    "material": 32143214,
    "image": "/errors/a.png"
  },
  {
    "fixed": false,
    "error_code": 1,
    "repository": 1,
    "location": 39,
    "layer": 0,
    "material": 32143214,
    "image": "/errors/a.png"
  },
]


const paperStyle = {
  height: 60,
  width: 840,
  margin: "0 auto",
  padding: "0 24px",
  textAlign: "center",
  lineHeight: "60px"
}

const pageStyle = {
  width: "100%",
  textAlign: "center"
}

const locationStyle = {
  margin: "20px auto",
  textAlign: "left",
  width: 900,
}

const locationItemStyle = {
  width: 300,
  margin: "2px 0",
  display: "inline-block"
}

class RepositoryInfoLine extends Component {

  constructor(props){
    super(props)
    this.state = {"state":1}
  }

  render() {
    let materials = this.props.materials
    let space = this.props.available_space

    return (
      <p style={{
        margin: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <span>物资数量: <span style={{color: blue300}}>{materials}</span></span>
        <span>剩余空间: <span style={{color: blue300}}>{space}</span></span>
        <span>错误数量: <span style={{color: red300}}>{materials}</span></span>
      </p>
    )
  }
}
RepositoryInfoLine.propTypes = {
  style: React.PropTypes.object,
  materials: React.PropTypes.number.isRequired,
  available_space: React.PropTypes.number.isRequired
}
RepositoryInfoLine.defaultProps = {
  style: {}
}

export default class CheckPage extends Component {

  constructor(props){
    super(props)
    this.state = {"state":1}

  }

  render() {

    let createItem = l => {
      let err_num = errors.filter(e => e.location === l.id).length
      let color = err_num > 0 ? red300 : blue300
      let backgroundColor = err_num > 0 ? pink900 : indigo900
      let info = `物资数量：${l.materials.reduce((a, b) => a+b)}`
      info = err_num > 0 ? info + `, 错误数量：${err_num}` : info

      return (
        <div style={locationItemStyle} key={l.id}>
          <Chip backgroundColor={color} >
            <Avatar size={32} color={color} backgroundColor={backgroundColor}>
              {l.label}
            </Avatar>
            {info}
          </Chip>
        </div>
      )
    }

    let A = repo.locations.filter(l => l.place === 1 || l.place === 4).map(createItem)
    let B = repo.locations.filter(l => l.place === 2).map(createItem)
    let C = repo.locations.filter(l => l.place === 3).map(createItem)

    return (
      <div style={pageStyle}>
        <Paper style={paperStyle} zDepth={1}
            children={<RepositoryInfoLine materials={repo.stored_count} available_space={repo.available_space} />}
        />
          <img src="/static/img/Locations.png" style={{width: 426, margin: "20px auto"}}/>
          <div style={locationStyle}>
          <h1>A区</h1>
            {A}
          </div>
          <Divider />
          <div style={locationStyle}>
          <h1>B区</h1>
            {B}
          </div>
          <Divider />
          <div style={locationStyle}>
          <h1>C区</h1>
            {C}
          </div>
      </div>
    )
  }
}
CheckPage.propTypes = {
  style: React.PropTypes.object
}
CheckPage.defaultProps = {
  style: {}
}
