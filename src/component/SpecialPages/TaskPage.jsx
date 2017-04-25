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
import {
  key_value_table
} from "../../libs/showdata.jsx"

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
    let task_kvmap = {
          "发布时间" : task.publish_time,
          "开始执行时间" : task.start_time,
          "结束时间" : task.end_time,
    }
    let staff = task.staff
    let staff_kvmap = staff === undefined ? undefined : {
      "姓名": staff.name,
      "账户": staff.account,
      "职位": humanise_staff_var(staff.permission),
      "性别": staff.sex ? "男" : "女",
      "年龄": staff.age
    }
    let material = task.material
    let material_kvmap = material === undefined ? undefined : {
      "物资id" : material.id ,
      "物资类型" : material.type ,
      "物资状态" : humanise_material_var(material.status),
      "原位置": material.from_repository === 0 ? undefined : `${material.from_repository}仓${material.from_location}号位置${material.from_layer}`,
      "新位置": material.to_repository === -1 ? undefined : `${material.to_repository}仓${material.to_location}号位置${material.to_layer}`,
      "宽" : material.width ,
      "长" : material.length ,
      "高" : material.height ,
      "物资描述" : material.description,
    }


    return (
      <div>
      <CardHeader
          title={<p style={{fontSize:26}}> <span>Action</span> : <span>{task.action}</span> (<span>{humanise_task_var(task.action)})</span></p>}
          subtitle={<p style={{fontSize:26}}> <span>Status</span> : <span>{task.status}</span> (<span>{humanise_task_var(task.status)})</span></p>} />

      <CardText>
        <CardHeader title={<p style={headStyle}>时间</p>}/>
        <CardText>
          {key_value_table(task_kvmap)}
        </CardText>
        <Divider />

        <CardHeader title={<p  style={headStyle}>附加信息</p>}/>
        <CardText>
          {task.remark.length <= 0 ? "空" : task.remark.split("\n").map((l, i) => <p key={i} style={normalText}>{l}</p>)}
        </CardText>
        <Divider />

        <CardHeader title={<p  style={headStyle}>物资</p>}/>
        <CardText>
          {key_value_table(material_kvmap)}
        </CardText>

        <Divider />
        <CardHeader title={<p  style={headStyle}>人员</p>}/>
        <CardText>
          {key_value_table(staff_kvmap)}
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
