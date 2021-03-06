import React, { Component } from "react"
import ReactDOM from "react-dom"

import {Card} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import Chip from "material-ui/Chip"
import Avatar from "material-ui/Avatar"
import {Tabs, Tab} from "material-ui/Tabs"
import SelectField from 'material-ui/SelectField'
import FlatButton from "material-ui/FlatButton"
import MenuItem from 'material-ui/MenuItem'
import TimePicker from 'material-ui/TimePicker'
import Paper from 'material-ui/Paper'
import {blue300, cyan500,indigo50, red500, pink50, red300} from "material-ui/styles/colors"

import Searcher from "./Searcher.jsx"
import {RegCtlTextField} from "./textfields/InputContrlTextField.jsx"
import InfoDialog from "./tools/InfoDialog.jsx"
import BetweenButtons from "./buttons/BetweenButtons.jsx"
import {printable_table} from "./showData.jsx"
import {Loading} from "./tools/Loading.jsx"

import {getRepoDetail, getErrors, createError} from "../libs/callToBack.js"
import {paperStyle} from "../libs/common.js"
import {
  humanise_schedule,
  humanise_error_code,
  humanise_date,
  humanise_material_position
} from "../libs/humanise_map.js"

export default class CheckPage extends Component {

  constructor(props){
    super(props)
    this.tabStyle = {
      textAlign: "center",
      padding: 24,
    }
    this.state = {
      tab: "0",
      loading: true,
      repo: null,
      errors: null
    }

    this.changeTab = this.changeTab.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.reloadData = this.reloadData.bind(this)
  }

  reloadData() {
    console.log("reload")
    this.setState({
      loading: true
    })
    getRepoDetail(1)
      .then(r => {
        this.setState({
          "repo": r,
        })

        return getErrors()
      })
      .then(e => this.setState({
        loading: false,
        errors: e
      }))
      .catch(console.log)
  }

  componentWillMount(){
    this.reloadData()
  }

  changeTab(tab) {
    this.setState({tab})
  }

  handleChange(tab){
    this.setState({tab})
  }

  render() {
    if (this.state.loading) {
      return (<div><Loading style={{margin: 150}}/></div>)
    }

    let repo = this.state.repo

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
      <Paper style={paperStyle}>
      <Tabs value={this.state.tab} onChange={this.handleChange}>
        {tabs.map((t, i) => (
           <Tab label={t.label} value={i.toString()} key={i}>
            <t.component style={this.tabStyle} changeTab={this.changeTab} repo={repo} errors={this.state.errors} reload={this.reloadData}/>
           </Tab>
         ))}
      </Tabs>
      </Paper>
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
    this.state = {
      last_check_time: Date.now()
    }
    this._info = null

    this.paperStyle = {
      height: 80,
      width: 792,
      margin: "0 auto",
      padding: "15 24px",
      lineHeight: "20px"
    }
  }

  manual_check(){
    createError(1, 1, 1, 2)
      .then(() => {
        this._info.Open("提醒",
                        "手动盘点成功！",
                        this.props.reload
        )
      })
      .catch(console.log)
  }

  render() {

    let repo = this.props.repo
    let errors = this.props.errors

    let humanise_errors = errors.map(e => ({
      "error_code": humanise_error_code(e.error_code),
      "position": humanise_material_position(e.repository, e.location, e.layer),
      "material": 32143214,
      "create_date": humanise_date(e.create_date)
    }))
    let errors_headers = [
      ["错误类型", "error_code"],
      ["位置", "position"],
      ["相关物资", "material"],
      ["出错时间", "create_date"],
    ]

    let buttons = [
      {
        "label": "设置自动盘点",
        "onTouchTap": () => this.props.changeTab("2"),
        "type": 2
      },
      {
        "label": "手动盘点",
        "type":1,
        "onTouchTap": () => this.manual_check()
      }
    ]

    let info_line = (
      <div>
        <p style={{
          margin: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span>物资数量: <span style={{color: blue300}}>{repo.stored_count}</span></span>
          <span>空间总数: <span style={{color: blue300}}>{44*20*3}</span></span>
          <span>剩余空间: <span style={{color: blue300}}>{repo.available_space}</span></span>
          <span>错误数量: <span style={{color: red300}}>{errors.length}</span></span>
        </p>
        <p><span>最近一次盘点时间: <span style={{color: red300}}>{humanise_date(this.state.last_check_time)}</span></span></p>
      </div>
    )

    let locations = this.props.repo.locations
    let headers = [
      ["位置号", "label"],
      ["物资数量", "materials_num"],
      ["剩余空间(立方米)", "available_space"],
      ["错误数量", "errors_num"]
    ]
    let rows = locations.map(l => {
      let label = ""
      if(l.place === 1 || l.place ===4) {
        label="A-"
      }else if (l.place === 2) {
        label="C-"
      }else{
        label="B-"
      }

      return Object.assign({}, l, {
        "label": label+l.label,
        "materials_num": l.materials_num.reduce((a, b) => a+b),
        "errors_num": errors.filter(e => e.location === l.id).length
      })
    })

    return (
      <div  style={this.props.style}>
        <InfoDialog ref={c => this._info = c} defaultLabel={"Ok"} />
        <Paper style={this.paperStyle} zDepth={1}
               children={info_line} />

        <div style={{margin: "50px 0"}}>
          {errors.length > 0 ? printable_table("错误列表", "error_table", errors_headers, humanise_errors): undefined}
        </div>
        <div style={{margin: "50px 0"}}>
        {printable_table("盘点结果", "checkresult", headers, rows)}
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
    let repo = this.props.repo
    let errors = this.props.errors

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
      let color = err_num > 0 ? pink50 : indigo50
      let backgroundColor = err_num > 0 ? red500 : cyan500
      let info = `物资数量：${l.materials_num.reduce((a, b) => a+b)}`
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
