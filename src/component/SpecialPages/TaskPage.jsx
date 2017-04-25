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

import {
  humanise_task_var,
  humanise_staff_var,
  humanise_material_var
} from "../../libs/humanise_map.js"

let headStyle = {
  fontSize: 20,
}

let normalText = {
  fontSize: 16,
  marginLeft: 20,
}

export default class TaskPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      "state": 1
    }

  }

  render() {
    let task = this.props.params
    let staff = task.staff !== undefined ? (
      <div>
        <p style={normalText}> name : {task.staff.name} </p>
        <p style={normalText}> account : {task.staff.account} </p>
        <p style={normalText}> permission: {humanise_staff_var(task.staff.permission)}</p>
        <p style={normalText}> sex : {task.staff.sex} </p>
        <p style={normalText}> age : {task.staff.age} </p>
      </div>
    ) : task.staff
    let origin = task.material.from_repository === 0 ? (<p style={normalText}> 入库 </p>) : (<p style={normalText}> 原位置 : {task.material.from_repository}仓{task.material.from_location}号位置{task.material.from_layer}</p>)
    let destination = task.material.to_repository === -1 ? (<p style={normalText}> 出库 </p>) : (<p style={normalText}> 新位置 : {task.material.to_repository}仓{task.material.to_location}号位置{task.material.to_layer}</p>)

    return (
      <div>
      <CardHeader
          title={<p style={{fontSize:26}}> <span>Action</span> : <span>{task.action}</span> (<span>{humanise_task_var(task.action)})</span></p>}
          subtitle={<p style={{fontSize:26}}> <span>Status</span> : <span>{task.status}</span> (<span>{humanise_task_var(task.status)})</span></p>} />

      <CardText>
        <CardHeader title={<p style={headStyle}>时间</p>}/>
        <CardText>
          <p style={normalText}><span>发布时间</span> : <span>{task.publish_time}</span></p>
          <p style={normalText}><span>开始执行时间</span> : <span>{task.start_time}</span></p>
          <p style={normalText}><span>结束时间</span> : <span>{task.end_time}</span></p>
        </CardText>
        <Divider />

        <CardHeader title={<p  style={headStyle}>附加信息</p>}/>
        <CardText>
          {task.remark.length <= 0 ? "空" : task.remark.split("\n").map((l, i) => <p key={i} style={normalText}>{l}</p>)}
        </CardText>
        <Divider />

        <CardHeader title={<p  style={headStyle}>物资</p>}/>
        <CardText>
          <p style={normalText}> 物资id : {task.material.id} </p>
          <p style={normalText}> 物资类型 : {task.material.type} </p>
          <p style={normalText}> 物资状态 : {humanise_material_var(task.material.status)}</p>
          {origin}
          {destination}
          <p style={normalText}> 宽 : {task.material.width} </p>
          <p style={normalText}> 长 : {task.material.length} </p>
          <p style={normalText}> 高 : {task.material.height} </p>
          <p style={normalText}> 物资描述 : {task.material.description}</p>
        </CardText>

        <Divider />
        <CardHeader title={<p  style={headStyle}>人员</p>}/>
        <CardText>
          {staff}
        </CardText>
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