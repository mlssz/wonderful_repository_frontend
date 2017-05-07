import React, { Component } from "react"
import ReactDOM from "react-dom"

import Divider from 'material-ui/Divider'
import SelectField from 'material-ui/SelectField'
import FlatButton from "material-ui/FlatButton"
import MenuItem from 'material-ui/MenuItem'

import InfoDialog from "./tools/InfoDialog.jsx"
import {LenCtlTextField} from "./textfields/InputContrlTextField.jsx"
import BetweenButtons from "./buttons/BetweenButtons.jsx"
import {BaseCtlDateTimePickField} from "./times/InputControlTime.jsx"

export default class Searcher extends Component {

  constructor(props){
    super(props)
    this.state = {
      items: [{
        // key_index
        // method_index
        // key
        // method
        // date
        // value
        // isError
        date: Date.now()
      }]
    }

    this._info = null

    this.AddConditions = this.AddConditions.bind(this)
    this.DeleteAllConditions = this.DeleteAllConditions.bind(this)
    this.DeleteCondition = this.DeleteCondition.bind(this)
    this.StartSearch = this.StartSearch.bind(this)
    this.ShowAll = this.ShowAll.bind(this)
    this.ConditionChange = this.ConditionChange.bind(this)
  }

  AddConditions() {
    this.setState({
      items: this.state.items.concat([{date: Date.now()}])
    })
  }

  DeleteCondition(i) {
    let items = this.state.items
    if (i >= items.length || i<0) {
      return
    }
    if (items.length === 1 && i === 0) {
      return this.DeleteAllConditions()
    }

    this.setState({
      items: items.slice(0, i).concat(items.slice(i+1))
    })
  }

  DeleteAllConditions() {
    this.setState({
      items: [{date: Date.now()}]
    })
  }

  parseValue(type, v){
    if(type === Number) {
      return Number.parseFloat(v)
    }
    if(type === String) {
      return v
    }
    if(type === Date) {
      return v
    }
  }

  StartSearch() {
    let items = this.state.items
    for(let i of items){
      if(i.isError) {
        this._info.Open("错误", "您的输入有误，请根据提示修改!")
        return
      }
      if(!i.value) {
        this._info.Open("错误", "请您填写完表格！")
        return
      }
    }

    let other = items.map(v => {
      let searchKey = this.props.searchKeys[v.key_index]

      if (searchKey.type === Date) {
        return {
          key: v.key,
          [v.method]: v.value
        }
      }

      let value = v.value
      if(v.method_index === 0 ) {
        value = value
                 .split(" ")
                 .map(_v => this.parseValue(searchKey.type, _v.trim()))
                 .filter(_v => _v)
        value = value.length === 1 ? value[0] : value
      }else {
        value = value
                 .map(_v => this.parseValue(searchKey.type, _v.trim()))
                 .filter(_v => _v)
      }

      return {
        key: v.key,
        [v.method]: value
      }
    })

    this.props.onSearchTouchTap(other)
  }

  ConditionChange(i, v) {
    Object.assign(this.state.items[i], v)
    this.setState({
      items: this.state.items.slice()
    })
  }

  ShowAll() {
    this.props.onShowAllTouchTap()
  }

  render() {

    let buttons = [
      {
        label: "显示全部",
        type: 2,
        onTouchTap: this.ShowAll
      },
      {
        label: "搜索",
        type: 1,
        onTouchTap: this.StartSearch
      }
    ]

    let buttons2 = [
      {
        label: "删除所有条件",
        type: 2,
        btype: 1,
        onTouchTap: this.DeleteAllConditions
      },
      {
        label: "新增条件",
        type: 1,
        btype: 1,
        onTouchTap: this.AddConditions
      }
    ]

    return (
      <div >
        <InfoDialog ref={c => this._info = c} />
        <div style={{
          margin: "30px 0"
        }}>
          {this.state.items.map((v, i) => (
             <SearchLine
                 onChange={(c) => this.ConditionChange(i, c)}
                 searchKeys={this.props.searchKeys}
                 value={v.value}
                 key_index={v.key_index}
                 method_index={v.method_index}
                 key={v.date}
                 remove={this.DeleteCondition}
                 index={i} />
           ))}
        </div>

        <BetweenButtons buttons={buttons2} style={{width: 400, margin: "0 auto"}}/>
        <BetweenButtons buttons={buttons} />
      </div>
    )
  }
}
Searcher.propTypes = {
  style: React.PropTypes.object,
  searchKeys: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onSearchTouchTap: React.PropTypes.func,
  onShowAllTouchTap: React.PropTypes.func
}
Searcher.defaultProps = {
  style: {},
  onShowAllTouchTap: () => console.log("show all"),
  onSearchTouchTap: (v) => console.log(v)
}

class SearchLine extends Component {

  constructor(props){
    super(props)

    this.searchMethods = [
      {key: "value", label: "值匹配"},
      {key: "region", label: "范围查询"}
    ]

    this.handleKeyChange = this.handleKeyChange.bind(this)
    this.handleMethodChange = this.handleMethodChange.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.handleValueError = this.handleValueError.bind(this)
  }

  handleKeyChange(_, index, value) {
    this.props.onChange({
      key_index: value,
      key: this.props.searchKeys[value].key,
      value: null,
      isError: false
    })
  }

  handleMethodChange(_, index, value) {
    this.props.onChange({
      method_index: value,
      method: this.searchMethods[value].key,
      value: null,
      isError: false
    })
  }

  handleValueChange(value) {
    let key = this.props.key_index
    let method = this.props.method_index
    this.props.onChange({
      key_index: key,
      method_index: method,
      key: this.props.searchKeys[key].key,
      method: this.searchMethods[method].key,
      value: value,
      isError: false
    })
  }

  handleValueError(value) {

    this.props.onChange({
      value: value,
      isError: true
    })
  }

  render() {
    let searchKeys = this.props.searchKeys
    let selectKeyItems = this.props.searchKeys.map((k, i)=> (
      <MenuItem value={i} primaryText={k.label} key={i}/>
    ))

    let selectMethodItems = this.searchMethods.map((k, i) => (
      <MenuItem value={i} primaryText={k.label} key={i}/>
    ))

    let inputColumn
    if (this.props.method_index === 0){
      inputColumn =(
        <SingleInputs
            value={this.props.value}
            errCallback={this.handleValueError}
            callback={this.handleValueChange}
            type={searchKeys[this.props.key_index].type}
        />
      )
    }else{
      inputColumn =(
        <RegionInputs
            value={this.props.value}
            errCallback={this.handleValueError}
            callback={this.handleValueChange}
            type={searchKeys[this.props.key_index].type}
        />
      )
    }


    return (
      <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "bottom",
          margin: "16px 0"
      }}>
      <div style={{margin: "0 30px"}}>
        <SelectField floatingLabelText="属性"
          style={{width: 150}}
          value={this.props.key_index}
          onChange={this.handleKeyChange}
        >
          {selectKeyItems}
        </SelectField>
        <SelectField floatingLabelText="查询方式"
          style={{width: 120, margin: "0 30px"}}
          value={this.props.method_index}
          onChange={this.handleMethodChange}
        >
          {selectMethodItems}
        </SelectField>
      </div>
        <div style={{margin: "0 30px"}}>
        {inputColumn}
      </div>
      <div style={{padding: "32px 0 0", margin: "0 30px"}}>
        <FlatButton
            label="删除"
            secondary={true}
            onTouchTap={() => this.props.remove(this.props.index)}
        />
      </div>
      </div>
    )
  }
}
SearchLine.propTypes = {
  style: React.PropTypes.object,
  content: React.PropTypes.object,
  key_index: React.PropTypes.number,
  method_index: React.PropTypes.number,
  onChange: React.PropTypes.func,
  searchKeys: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
}
SearchLine.defaultProps = {
  style: {},
  onChange: console.log,
  key_index: 0,
  method_index: 0
}

class SingleInputs extends Component {

  constructor(props){
    super(props)
  }

  render() {
    let inputColumn
    if (this.props.type === Date) {
      inputColumn = (
        <BaseCtlDateTimePickField
            judgeFunc={(v) => v}
            timeprops={{floatingLabelText: "时间", textFieldStyle:{width: 146}}}
            dateprops={{floatingLabelText: "日期", textFieldStyle:{width: 227}}}
            errString="日期时间不能为空！"
            callback={this.props.callback}
            errCallback={this.props.errCallback}
            value={this.props.value}
        />
      )
    }else{
      inputColumn = (
        <LenCtlTextField
            minl={1}
            maxl={256}
            textprops={{
              floatingLabelText:"多个可能值用空格分隔",
              style: {width: 373}
            }}
            errString="请填写有效查询值！"
            callback={this.props.callback}
            errCallback={this.props.errCallback}
            value={this.props.value}
        />
      )
    }

    return inputColumn
  }
}
SingleInputs.propTypes = {
  style: React.PropTypes.object
}
SingleInputs.defaultProps = {
  style: {}
}

class RegionInputs extends Component {

  constructor(props){
    super(props)
    this.state = {
      value: this.props.value || [],
      leftError: 0,
      rightError: 0
    }

    this.handleLeftChange = this.handleLeftChange.bind(this)
    this.handleRightChange = this.handleRightChange.bind(this)
    this.handleRightError = this.handleRightError.bind(this)
    this.handleLeftError = this.handleLeftError.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    let value = !nextProps.value ? [] : nextProps.value
    if(value.toString() !== this.state.value.toString()) {
      this.setState({
        value: value
      })
    }
  }

  handleLeftError(value) {
    let values = [value, this.state.value[1]]
    this.setState({
      leftError: 1
    })

    this.props.errCallback(values)
  }

  handleRightError(value) {
    let values = [this.state.value[0], value]
    this.setState({
      rightError: 1
    })

    this.props.errCallback(values)
  }

  handleLeftChange(value) {
    let values = [value, this.state.value[1]]
    this.setState({
      value: values,
      leftError: 0
    })

    if(this.state.rightError !== 1 && values[0] && values[1]){
      this.props.callback(values)
    }
  }

  handleRightChange(value) {
    let values = [this.state.value[0], value]
    this.setState({
      value: values,
      rightError: 0
    })

    if(this.state.leftError !== 1 && values[0] && values[1]){
      this.props.callback(values)
    }
  }

  generatInputs(Comp, leftprops, rightprops) {
    const divider = (
      <div style={{
        height: 10,
        margin: "20px 20px"
      }} >
      <p> - </p>
      </div>
    )

    return [(
        <Comp {...leftprops}
            callback={this.handleLeftChange}
            errCallback={this.handleLeftError}
            value={this.state.value[0]}
        />
      ),
      divider,
      (<Comp
            {...rightprops}
            callback={this.handleRightChange}
            errCallback={this.handleRightError}
            value={this.state.value[1]}
        />
      )]
  }

  render() {
    let inputColumn = []
    if (this.props.type === Date) {
      let props = {
            judgeFunc:(v) => v,
            timeprops:{floatingLabelText: "时间"},
            dateprops:{floatingLabelText: "日期"},
            errString:"日期时间不能为空！"
        }
      inputColumn = this.generatInputs(BaseCtlDateTimePickField, props, props)
    }else{
      let leftprops = {
        minl:1,
        maxl:256,
        textprops:{
          floatingLabelText:"最小值",
          style: {
            width: 164
          }
        },
        errString:"请填写有效查询值！"
      }
      let rightprops = {
        minl:1,
        maxl:256,
        textprops:{
          floatingLabelText:"最大值",
          style: {
            width: 164
          }
        },
        errString:"请填写有效查询值！"
      }
      inputColumn = this.generatInputs(LenCtlTextField, leftprops, rightprops)
    }

    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "bottom",
      }}>
        {inputColumn}
      </div>
    )
  }
}
RegionInputs.propTypes = {
  style: React.PropTypes.object,
  // value,
  // type,
  // callback,
  // errCallback
}
RegionInputs.defaultProps = {
  style: {}
}
