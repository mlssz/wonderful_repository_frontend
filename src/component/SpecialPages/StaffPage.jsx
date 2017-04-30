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
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'

import TaskPage from './TaskPage.jsx'

import {
  humanise_staff_var,
  humanise_date,
} from "../../libs/humanise_map.js"
import {
  key_value_table,
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

export default class StaffPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      "state": 1
    }

  }

  render() {
    let staff = this.props.params
    console.log(staff)
    let base_kvmap =  {
      "职位" : humanise_staff_var(staff.permission),
      "性别": staff.sex ? "男" : "女",
      "年龄": staff.age,
    }
    console.log(base_kvmap)
    let account_kvmap = {
      "账号": staff.account,
      "密码": staff.passwd,
      "注册时间" : staff.signup_time,
      "上次登入时间" : staff.last_login_time,
    }


    return (
      <div>
        <CardHeader
            title={<p style={{fontSize:26}}> <span>姓名</span> : <span>{staff.name}</span></p>}
            />
        <CardText>
          <CardHeader title={<p style={inheadStyle}>基本信息</p>}/>
          <CardText>
            {key_value_table(base_kvmap)}
          </CardText>
          <Divider />

          <CardHeader title={<p  style={inheadStyle}>账户信息</p>}/>
          <CardText>
            {key_value_table(account_kvmap)}
          </CardText>

        </CardText>
      </div>
    )
  }
}
StaffPage.propTypes = {
  style: React.PropTypes.object
}
StaffPage.defaultProps = {
  style: {}
}
