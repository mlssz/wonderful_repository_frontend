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

import MaterialPage from "./MaterialPage.jsx"
import StaffPage from "./StaffPage.jsx"
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
      "state": 1
    }

  }

  render() {
    // This should request to backend
    let task = typeof this.props.params !== "string" ? this.props.params : {
      "_id": "dsafdsadsaf32413141kl2",
      "action": 500,
      "status": 1,
      "publish_time": "2017-04-06T04:57:36.801Z",
      "start_time": "2017-04-06T04:57:36.801Z",
      "end_time": "2017-04-06T04:57:36.801Z",
      "remark": "this just a test\n dont be serious.",
      "staff": {
          "_id": "dsafdsadsaf32413141kl2",
          "name": "因幡帝",
          "account": "inaba_tewi",
          "passwd": "123456",
          "sex": 0,
          "age": 222,
          "permission": 1,
          "signup_time": 1491451593158,
          "last_login_time": 1491451593158
      },
      "material": {
          "_id": "dsafdsadsaf32413141kl2",
          "id": this.props.params,
          "type": "tester",
          "description": "wonderful repository",
          "import_time": "2017-04-06T04:57:36.801Z",
          "estimated_export_time": "2017-04-06T04:57:36.801Z",
          "height": 1,
          "width": 1,
          "length": 2,
          "status": 300,
          "from_repository": 0,
          "from_location": 0,
          "from_layer": 0,
          "to_repository": 12,
          "to_location": 1,
          "to_layer": 0,
          "last_migrations": "1234",
          "location_update_time": "2017-04-06T04:57:36.801Z"
      }
    }

    let task_kvmap = {
          "发布时间" : humanise_date(task.publish_time),
          "开始执行时间" : humanise_date(task.start_time),
          "结束时间" : humanise_date(task.end_time),
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
      "原位置":  humanise_material_position(material.from_repository, material.from_location, material.from_layer),
      "新位置":  humanise_material_position(material.to_repository, material.to_location, material.to_layer),
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
          <CardHeader title={<p style={inheadStyle}>时间</p>}/>
          <CardText>
            {key_value_table(task_kvmap)}
          </CardText>
          <Divider />

          <CardHeader title={<p  style={inheadStyle}>附加信息</p>}/>
          <CardText>
            {task.remark.length <= 0 ? "空" : task.remark.split("\n").map((l, i) => <p key={i} style={normalText}>{l}</p>)}
          </CardText>
          <Divider />

          <p  style={headStyle}>
            <span>物资</span>
            <FlatButton label="查看详情" onTouchTap={
              () => this.props.changePage(MaterialPage, "Material", material)}/>
          </p>
          <CardText>
            {key_value_table(material_kvmap)}
          </CardText>

          <Divider />

          <p  style={headStyle}>
            <span>人员</span>
            <FlatButton label="查看详情" onTouchTap={
              () => this.props.changePage(StaffPage, "Staff", staff)} />
          </p>
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
