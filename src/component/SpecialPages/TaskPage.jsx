import React, {
  Component
} from "react"
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import {Tabs, Tab} from "material-ui/Tabs"
import Paper from 'material-ui/Paper'

import {CenterButtons} from "../buttons/BetweenButtons.jsx"
import {Loading} from "../tools/Loading.jsx"

import {changeHash, paperStyle} from "../../libs/common.js"
import {getTaskById, getTaskByMigrationId} from "../../libs/callToBack.js"
import {
  humanise_date,
  humanise_task_var,
  humanise_staff_var,
  humanise_material_var,
  humanise_material_position
} from "../../libs/humanise_map.js"
import {
  key_value_table
} from "../showData.jsx"

let headStyle = {
  fontSize: 20,
  fontWeight: 500,
  padding: 16,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}
let inheadStyle = {
  fontSize: 20
}

let normalText = {
  fontSize: 16,
  marginLeft: 20,
}

export default class TaskPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      "loading": true,
      "task": null
    }

  }

  componentWillMount(){
    let id_tuple = this.props.match.params.id.split("_")
    if (id_tuple.length !== 2) changeHash("/")

    let id = id_tuple[1]
    let method = id_tuple[0] === "task" ? getTaskById : getTaskByMigrationId

    method(id)
      .then(task => this.setState({
        "loading": false,
        "task": task
      }))
      .catch(console.log)
  }

  render() {
    if (this.state.loading) {
      return (<div><Loading style={{margin: 150}}/></div>)
    }

    // This should request to backend
    let task =  this.state.task

    let tabs = [
      {
        label: "基础信息",
        component: TaskBase
      },
    ]

    if (task.material) {
      tabs.push({
        label: "物品信息",
        component: TaskMaterial
      })
    }
    if (task.staff) {
      tabs.push({
        label: "人员信息",
        component: TaskStaff
      })
    }

    /* tabs.push({
     *   label: "更多",
     *   component: TaskMore
     * })
     */
    return (
      <Paper style={paperStyle}>
      <Tabs>
        {tabs.map((t, i) => (
           <Tab label={t.label} value={i.toString()} key={i}>
            <t.component style={this.tabStyle} task={task}/>
           </Tab>
         ))}
      </Tabs>
      </Paper>
    )
  }
}
TaskPage.propTypes = {
  style: React.PropTypes.object
}
TaskPage.defaultProps = {
  style: {}
}

class TaskBase extends Component {

  constructor(props){
    super(props)
  }

  render() {

    let task = this.props.task
    let task_kvmap = {
          "发布时间" : humanise_date(task.publish_time),
          "开始执行时间" : humanise_date(task.start_time),
          "结束时间" : humanise_date(task.end_time),
    }

    return (

        <CardText>
          <CardHeader
              title={<p style={inheadStyle}><span>{humanise_task_var(task.action)}</span></p>}
              subtitle={<p style={inheadStyle}> <span>状态</span> : <span>{humanise_task_var(task.status)}</span></p>} />
          <CardHeader title={<p style={inheadStyle}>时间</p>}/>
          <CardText>
            {key_value_table(task_kvmap)}
          </CardText>
          <Divider />

          <CardHeader title={<p  style={inheadStyle}>附加信息</p>}/>
          <CardText>
            {task.remark && task.remark.length >= 0 ? task.remark.split("\n").map((l, i) => <p key={i} style={normalText}>{l}</p>) : "空"}
          </CardText>
        </CardText>
    )
  }
}
TaskBase.propTypes = {
  style: React.PropTypes.object
}
TaskBase.defaultProps = {
  style: {}
}

class TaskMaterial extends Component {

  constructor(props){
    super(props)
  }

  render() {

    let material = this.props.task.material
    let migration = this.props.task.migration
    let material_kvmap =  {
      "物资id" : material.id ,
      "物资类型" : material.type ,
      "物资状态" : humanise_material_var(material.status),
      "宽" : material.width ,
      "长" : material.length ,
      "高" : material.height ,
      "物资描述" : material.description,
    }
    if (migration) {
      material_kvmap["原位置"] = humanise_material_position(migration.from_repository, migration.from_location, migration.from_layer),
      material_kvmap["新位置"] = humanise_material_position(migration.to_repository, migration.to_location, migration.to_layer)
    }

    return (
          <CardText>
          <p  style={headStyle}>
            <span>物资</span>
            <FlatButton label="查看详情" onTouchTap={() => changeHash(`/material/${material._id}`)}/>
          </p>
          <CardText>
            {key_value_table(material_kvmap)}
          </CardText>
          </CardText>
    )
  }
}
TaskMaterial.propTypes = {
  style: React.PropTypes.object
}
TaskMaterial.defaultProps = {
  style: {}
}

class TaskStaff extends Component {

  constructor(props){
    super(props)
  }

  render() {
    let staff = this.props.task.staff
    let staff_kvmap = {
      "姓名": staff.name,
      "账户": staff.account,
      "职位": humanise_staff_var(staff.permission),
      "性别": staff.sex ? "男" : "女",
      "年龄": staff.age
    }

    return (
        <CardText>
          <p  style={headStyle}>
            <span>人员</span>
            <FlatButton label="查看详情" onTouchTap={() => changeHash(`/staff/${staff._id}`)} />
          </p>
          <CardText>
            {key_value_table(staff_kvmap)}
          </CardText>
        </CardText>
    )
  }
}
TaskStaff.propTypes = {
  style: React.PropTypes.object
}
TaskStaff.defaultProps = {
  style: {}
}

class TaskMore extends Component {

  constructor(props){
    super(props)
  }

  render() {
    const buttons = [
      {
        label: "删除任务",
        type: 2,
        disabled: this.props.task.status < 1 ? 0 : 1,
        onTouchTap: console.log
      }
    ]

    return (
        <CardText style={{height: 86, padding:"50px 24px 0 24px"}}>
          <CenterButtons buttons={buttons} />
        </CardText>
    )
  }
}
TaskMore.propTypes = {
  style: React.PropTypes.object
}
TaskMore.defaultProps = {
  style: {}
}
