import React, { Component } from "react"
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Divider from 'material-ui/Divider'

import {humanise_task_var, humanise_staff_var, humanise_material_var} from "../../libs/humanise_map.js"

export default class TaskPage extends Component {

  constructor(props){
    super(props)
    this.state = {"state":1}

  }

  render() {
    let task = this.props.params
    let staff = task.staff !== undefined ? (
      <div>
        <p> name : {task.staff.name} </p>
        <p> account : {task.staff.account} </p>
        <p> permission: {humanise_staff_var(task.staff.permission)}</p>
        <p> sex : {task.staff.sex} </p>
        <p> age : {task.staff.age} </p>
      </div>
    ) : task.staff
    let origin = task.material.from_repository === 0 ? (<p> 入库 </p>)
      : (<p> 原位置 : {task.material.from_repository}仓{task.material.from_location}号位置{task.material.from_layer}</p>)
    let destination = task.material.to_repository === -1 ? (<p> 出库 </p>)
      : (<p> 新位置 : {task.material.to_repository}仓{task.material.to_location}号位置{task.material.to_layer}</p>)

    return (
    <div>
      <CardHeader
          title={<p> <span>Action</span> : <span>{task.action}</span> (<span>{humanise_task_var(task.action)})</span></p>}
          subtitle={<p> <span>Status</span> : <span>{task.status}</span> (<span>{humanise_task_var(task.status)})</span></p>} />

      <CardText>
        <p><span>发布时间</span> : <span>{task.publish_time}</span></p>
        <p><span>开始执行时间</span> : <span>{task.start_time}</span></p>
        <p><span>结束时间</span> : <span>{task.end_time}</span></p>
        <Divider />
        <p><span>附加信息</span> : </p>
        {task.remark.length <= 0 ? "空" : task.remark.split("\n").map((l, i) => <p key={i}>{l}</p>)}
        <Divider />
        <p> 物资id : {task.material.id} </p>
        <p> 物资类型 : {task.material.type} </p>
        <p> 物资状态 : {humanise_material_var(task.material.status)}</p>
        {origin}
        {destination}
        <p> 宽 : {task.material.width} </p>
        <p> 长 : {task.material.length} </p>
        <p> 高 : {task.material.height} </p>
        <p> 物资描述 : {task.material.description}</p>
        <Divider />
        {staff}
      </CardText>
    </div>
    )
  }
}
TaskPage.propTypes = {
  style: React.PropTypes.object
}
TaskPage.defaultProps = {
  style: {}
}
