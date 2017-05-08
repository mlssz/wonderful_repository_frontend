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
import {Tabs, Tab} from "material-ui/Tabs"
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'

import BetweenButtons from "../buttons/BetweenButtons.jsx"
import {Loading} from "../tools/Loading.jsx"
import {getStaffById} from "../../libs/callToBack.js"

import {
  humanise_staff_var,
  humanise_date,
} from "../../libs/humanise_map.js"
import {paperStyle} from "../../libs/common.js"
import {
  key_value_table,
} from "../showData.jsx"

let inheadStyle = {
  fontSize: 20
}

export default class StaffPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      "loading": true,
      "staff": null
    }

  }

  componentWillMount(){
    getStaffById(this.props.mid)
      .then(staff => this.setState({
        "loading": false,
        "staff": staff
      }))
      .catch(console.log)
  }

  render() {
    if (this.state.loading) {
      return (<div><Loading style={{margin: 150}}/></div>)
    }

    let staff = this.state.staff

    let tabs = [
      {
        label: "基础信息",
        component: StaffBase
      },
    ]

    tabs.push({
      label: "更多",
      component: StaffMore
    })

    return (
      <Paper style={paperStyle}>
        <Tabs>
          {tabs.map((t, i) => (
            <Tab label={t.label} value={i.toString()} key={i}>
              <t.component style={this.tabStyle} staff={staff}/>
            </Tab>
          ))}
        </Tabs>
      </Paper>
    )
  }
}
StaffPage.propTypes = {
  style: React.PropTypes.object
}
StaffPage.defaultProps = {
  style: {}
}

class StaffBase extends Component {

  constructor(props){
    super(props)
  }

  render() {
    let staff = this.props.staff

    let base_kvmap =  {
      "职位" : humanise_staff_var(staff.permission),
      "性别": staff.sex ? "男" : "女",
      "年龄": staff.age,
    }
    console.log(base_kvmap)
    let account_kvmap = {
      "账号": staff.account,
      "密码": staff.passwd,
      "注册时间" : humanise_date(staff.signup_time),
      "上次登入时间" : humanise_date(staff.last_login_time),
    }

    return (
        <CardText>
          <CardHeader
            title={<p style={inheadStyle}> <span>姓名</span> : <span>{staff.name}</span></p>}
            />
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
    )
  }
}
StaffBase.propTypes = {
  style: React.PropTypes.object
}
StaffBase.defaultProps = {
  style: {}
}

class StaffMore extends Component {

  constructor(props){
    super(props)
  }

  render() {
    const buttons = [
      {
        label: "删除职员",
        type: 2,
        onTouchTap: console.log
      },
      {
        label: "修改职员信息",
        type: 1,
        onTouchTap: console.log
      },
    ]

    return (
        <CardText style={{height: 86, padding:"50px 200px 0 200px"}}>
          <BetweenButtons buttons={buttons} />
        </CardText>
    )
  }
}
StaffMore.propTypes = {
  style: React.PropTypes.object
}
StaffMore.defaultProps = {
  style: {}
}
