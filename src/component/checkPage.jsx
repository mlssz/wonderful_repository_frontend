import React, { Component } from "react"
import ReactDOM from "react-dom"

import Paper from "material-ui/Paper"
import Divider from 'material-ui/Divider'
import Chip from "material-ui/Chip"
import Avatar from "material-ui/Avatar"
import {Tabs, Tab} from "material-ui/Tabs"
import SelectField from 'material-ui/SelectField'
import FlatButton from "material-ui/FlatButton"
import MenuItem from 'material-ui/MenuItem'
import TimePicker from 'material-ui/TimePicker'
import {blue300, indigo900, red300, pink900} from "material-ui/styles/colors"

import {RegCtlTextField} from "./textfields/InputContrlTextField.jsx"
import InfoDialog from "./tools/InfoDialog.jsx"
import BetweenButtons from "./buttons/BetweenButtons.jsx"
import {general_table} from "./showData.jsx"
import {
  humanise_schedule,
  humanise_error_code,
  humanise_date,
  humanise_material_position
} from "../libs/humanise_map.js"

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

export default class CheckPage extends Component {

  constructor(props){
    super(props)
    this.state = {"state":1}
    this.tabStyle = {
      textAlign: "center",
      padding: 24,
    }
    this.state = {
      tab: "0"
    }

    this.changeTab = this.changeTab.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  changeTab(tab) {
    this.setState({tab})
  }

  handleChange(tab){
    this.setState({tab})
  }

  render() {

    let tabs = [
      {
        label: "总览",
        component: RepositoryOverview
      },
      {
        label: "位置信息",
        component: LocationOverview
      },
      {
        label: "自动盘点",
        component: AutoCheckConfig
      }
    ]

    return (
      <Tabs value={this.state.tab} onChange={this.handleChange}>
        {tabs.map((t, i) => (
           <Tab label={t.label} value={i.toString()} key={i}>
            <t.component style={this.tabStyle} changeTab={this.changeTab} />
           </Tab>
         ))}
      </Tabs>
    )
  }
}
CheckPage.propTypes = {
  style: React.PropTypes.object
}
CheckPage.defaultProps = {
  style: {}
}

class RepositoryOverview extends Component {

  constructor(props){
    super(props)
    this.paperStyle = {
      height: 60,
      width: 792,
      margin: "0 auto",
      padding: "0 24px",
      lineHeight: "60px"
    }
  }

  render() {

    let humanise_errors = errors.map(e => ({
      "fixed": e.fixed ? "已修复" : "未修复",
      "error_code": humanise_error_code(e.error_code),
      "position": humanise_material_position(e.repository, e.location, e.layer),
      "material": 32143214,
    }))
    let errors_headers = [
      ["错误类型", "error_code"],
      ["位置", "position"],
      ["相关物资", "material"],
      ["状态", "fixed"],
    ]

    let buttons = [
      {
        "label": "设置自动盘点",
        "onTouchTap": () => this.props.changeTab("2"),
        "type": 2
      },
      {
        "label": "盘点",
        "type":1
      }
    ]

    let info_line = (
        <p style={{
          margin: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span>物资数量: <span style={{color: blue300}}>{repo.stored_count}</span></span>
          <span>空间总数: <span style={{color: blue300}}>{44*20*3}</span></span>
          <span>剩余空间: <span style={{color: blue300}}>{repo.available_space}</span></span>
          <span>错误数量: <span style={{color: red300}}>{errors.length}</span></span>
        </p>
    )


    return (
      <div  style={this.props.style}>
        <Paper style={this.paperStyle} zDepth={1}
               children={info_line} />

        <div style={{margin: "50px 0"}}>
          {general_table(errors_headers, humanise_errors)}
        </div>
        <BetweenButtons buttons={buttons} />
      </div>
    )
  }
}
RepositoryOverview.propTypes = {
  style: React.PropTypes.object
}
RepositoryOverview.defaultProps = {
  style: {}
}

class LocationOverview extends Component {

  constructor(props){
    super(props)
  }

  render() {

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
        <div  style={this.props.style}>
          <img src="/static/img/locations.png" style={{width: 426, margin: "20px auto"}}/>
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
LocationOverview.propTypes = {
  style: React.PropTypes.object
}
LocationOverview.defaultProps = {
  style: {}
}

class AutoCheckConfig extends Component {

  constructor(props){
    super(props)
    this.state = {
      current: {
        type: 0,
        time: Date.now() + 120000,
        other: 0
      },
      update: {
        type: 0,
        time: Date.now() + 120000,
        other: 0
      }
    }
    this.paperStyle = {
      height: 60,
      width: 792,
      margin: "0 auto",
      padding: "0 24px",
      lineHeight: "60px"
    }
    this._info_cancel = null
    this._info_change = null

    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleOtherChange = this.handleOtherChange.bind(this)
    this.handleTimePickerChange = this.handleTimePickerChange.bind(this)
    this.cancelAutoCheck = this.cancelAutoCheck.bind(this)
    this.changeAutoCheck = this.changeAutoCheck.bind(this)
    this.handleOtherChangeType3 = this.handleOtherChangeType3.bind(this)
  }

  handleTypeChange(_, index) {
    this.setState({
      update: Object.assign({}, this.state.update,{type: index})
    })
  }
  handleOtherChange(_, index) {
    this.setState({
      update: Object.assign({}, this.state.update,{other: index})
    })
  }
  handleOtherChangeType3(num) {
    let n = Math.floor(this.state.update.other / 60) * 60 + num
    this.setState({
      update: Object.assign({}, this.state.update, {other: n})
    })
    console.log(n)
  }
  handleTimePickerChange(_, date) {
    this.setState({
      update: Object.assign({}, this.state.update, {time: date})
    })
  }

  cancelAutoCheck() {
    this.setState({
      current:Object.assign({}, this.state.current, {type: -1}),
      update: Object.assign({}, this.state.update, {type: -1})
    })
    this._info_cancel.Close()
  }
  changeAutoCheck() {
    this.setState({current: this.state.update})
    this._info_change.Close()
  }

  render() {
    let buttons = [
      {
        "label": "取消自动盘点",
        "type": 0,
        "onTouchTap": () => this._info_cancel.Open(
          "取消自动盘点",
          "确认取消自动盘点功能？")
      },
      {
        "label": "确认修改",
        "type": 1,
        "onTouchTap": () => this._info_change.Open(
          "修改自动盘点方式",
          `确认将自动盘点方式修改为 ${humanise_schedule(this.state.update)}`)
      },
    ]

    let type_select = ["每天", "每周", "每月", "每隔"]
    let weekday_select = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    let dateday_select = (new Array(30)).fill(1).map((k,i) => (i+1)+"号")

    let info_line = (
        <p style={{
          margin: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span>盘点方式: <span style={{color: blue300}}>{humanise_schedule(this.state.current)}</span></span>
          <span>下次盘点时间: <span style={{color: red300}}>{humanise_date(Date.now()+ 120000)}</span></span>
        </p>
    )

    return (
      <div  style={this.props.style}>
      <InfoDialog ref={c => this._info_cancel = c}
      anotherButton={<FlatButton
                         label="OK"
                         secondary={true}
                         keyboardFocused={false}
                         onTouchTap={this.cancelAutoCheck} />}
      />
      <InfoDialog ref={c => this._info_change = c}
      anotherButton={<FlatButton
                         label="OK"
                         secondary={true}
                         keyboardFocused={false}
                         onTouchTap={this.changeAutoCheck} />}
      />

        <Paper style={this.paperStyle} zDepth={1} children={info_line} />

      <div style={{
        margin: "30px 0",
        display: "flex",
        height: 204,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <SelectField floatingLabelText="自动方式"
          style={{margin: "0 16px"}}
          value={this.state.update.type}
          onChange={this.handleTypeChange} >
         {type_select.map((k, i) => (<MenuItem value={i} primaryText={k} />))}
        </SelectField>
        {this.state.update.type !== 1 ? undefined : (
          <SelectField floatingLabelText="星期"
                      style={{margin: "0 16px"}}
                      value={this.state.update.other}
                      onChange={this.handleOtherChange} >
          {weekday_select.map((k, i) => (<MenuItem value={i} primaryText={k} />))}
          </SelectField>
         )}
        {this.state.update.type !== 2 ? undefined : (
          <SelectField floatingLabelText="月"
                       style={{margin: "0 16px"}}
                       value={this.state.update.other}
                       onChange={this.handleOtherChange} >
            {dateday_select.map((k, i) => (<MenuItem value={i} primaryText={k} />))}
          </SelectField>
        )}
        {this.state.update.type !== 3 ? undefined : (
          <div style={{margin: "0 24px"}}>
            <RegCtlTextField
                reg={/^\d+$/}
                style={{width: 130, margin: "20px 0"}}
                hintText="1"
                floatingLabelText="小时"
                callback={v => this.handleOtherChangeType3(Number.parseInt(v) * 3600)}
                errString="请填写大于0的整数" />
          <br />
          +
          <br />
          <RegCtlTextField
                reg={/^\d+$/}
                style={{width: 130, margin: 0}}
                hintText="0"
                floatingLabelText="分钟"
                callback={v => this.handleOtherChangeType3(Number.parseInt(v) * 60)}
                errString="请填写大于0的整数" />
          </div>
        )}
        {this.state.update.type !== 3 ? undefined : <span style={{padding: "26px 0 0 0"}}>从</span>}
        {this.state.update.type === -1 ? undefined : (
          <TimePicker
              style={{padding: "24px 0 0 16px"}}
              textFieldStyle={{width: 100}}
              format="24hr"
              hintText="时间"
              value={new Date(this.state.update.time)}
              onChange={this.handleTimePickerChange}
          />
        )}
        {this.state.update.type !== 3 ? undefined : <span style={{padding: "26px 0 0 0"}}>开始</span>}
      </div>
        <BetweenButtons buttons={buttons} />
      </div>
    )
  }
}
AutoCheckConfig.propTypes = {
  style: React.PropTypes.object
}
AutoCheckConfig.defaultProps = {
  style: {}
}
