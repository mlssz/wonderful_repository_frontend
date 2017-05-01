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
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper'
import {Tabs, Tab} from "material-ui/Tabs"
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'

import {changeHash} from "../../libs/common.js"
import {
  humanise_material_var,
  humanise_date,
  humanise_material_position,
} from "../../libs/humanise_map.js"
import {
  key_value_table,
} from "../showData.jsx"

let inheadStyle = {
  fontSize: 20
}


export default class MaterialPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    let tabs = [
      {
        label: "基础信息",
        component: MaterialBase
      },
      {
        label: "移动记录",
        component: MaterialMigrations
      },
    ]

    return (
      <Tabs>
        {tabs.map((t, i) => (
           <Tab label={t.label} value={i.toString()} key={i}>
            <t.component style={this.tabStyle} />
           </Tab>
         ))}
      </Tabs>
    )
  }
}
MaterialPage.propTypes = {
  style: React.PropTypes.object
}
MaterialPage.defaultProps = {
  style: {}
}

class MaterialBase extends Component {

  constructor(props){
    super(props)
    this.state = {"state":1}
  }

  render() {
    let material = {
      "_id": "dsafdsadsaf32413141kl2",
      "id": 1491451593158,
      "type": "生活电器-生活电器",
      "description": "wonderful repository",
      "import_time": "2017-04-06T04:57:36.801Z",
      "estimated_export_time": "2017-04-06T04:57:36.801Z",
      "height": 1,
      "width": 1,
      "length": 2,
      "status": 300,
      "repository_id": -1,
      "location_id": 0,
      "layer": 0,
      "last_migrations": "1234",
      "location_update_time": "2017-04-06T04:57:36.801Z"
    }
    let material_kvmap =  {
      "物资状态" : humanise_material_var(material.status),
      "当前位置": material.repository_id === undefined ? undefined : humanise_material_position(material.repository_id, material.location_id, material.layer),
      "原位置": material.from_repository === undefined ? undefined : humanise_material_position(material.from_repository, material.from_location, material.from_layer),
      "新位置": material.to_repository === undefined ? undefined : humanise_material_position(material.to_repository, material.to_location, material.to_layer),
      "宽" : material.width ,
      "长" : material.length ,
      "高" : material.height ,
      "物资描述" : material.description,
    }
    let time_kvmap = {
      "入库时间": humanise_date(material.import_time),
      "预计出库时间": humanise_date(material.estimated_export_time),
      "位置更新时间": humanise_date(material.location_update_time)
    }



    return (
        <CardText>
          <CardHeader
              title={<p style={inheadStyle}> <span>物资id</span> : <span>{material.id}</span></p>}
              subtitle={<p style={inheadStyle}> <span>物资类型</span> : <span>{material.type}</span> </p>} />
          <CardText>
            {key_value_table(material_kvmap)}
          </CardText>
          <Divider />

          <CardHeader title={<p  style={inheadStyle}>时间</p>}/>
          <CardText>
            {key_value_table(time_kvmap)}
          </CardText>
        </CardText>
    )
  }
}
MaterialBase.propTypes = {
  style: React.PropTypes.object
}
MaterialBase.defaultProps = {
  style: {}
}

class MaterialMigrations extends Component {

  constructor(props){
    super(props)
  }

  render() {
    const migrations = [{
      "_id": "dsafdsaf32141314",
      "material": "dsafdsaf32141314",
      "date": "2017-04-06T04:57:36.801Z",
      "from_repository": 1,
      "from_location": 12,
      "from_layer": 0,
      "to_repository": 1,
      "to_location": 3,
      "to_layer": 0,
    }, {
      "_id": "dsafdsaf32141314",
      "material": "dsafdsaf32141314",
      "date": "2017-04-06T04:57:36.801Z",
      "from_repository": 1,
      "from_location": 4,
      "from_layer": 0,
      "to_repository": 1,
      "to_location": 12,
      "to_layer": 0,
    }, {
      "_id": "dsafdsaf32141314",
      "material": "dsafdsaf32141314",
      "date": "2017-04-06T04:57:36.801Z",
      "from_repository": 1,
      "from_location": 23,
      "from_layer": 0,
      "to_repository": 1,
      "to_location": 4,
      "to_layer": 0,
    }, {
      "_id": "dsafdsaf32141314",
      "material": "dsafdsaf32141314",
      "date": "2017-04-06T04:57:36.801Z",
      "from_repository": 0,
      "from_location": 0,
      "from_layer": 0,
      "to_repository": 1,
      "to_location": 23,
      "to_layer": 0,
    }]

    let steps = migrations.map((m, i) => (
              <Step active={true} key={i}>
                <StepButton>
                  {humanise_date(m.date)}
                </StepButton>
                <StepContent>
                  <div style={{
                    padding: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <span>
                      <span style={{margin: 10}}>
                        {humanise_material_position(m.from_repository, m.from_location, m.from_layer)}
                      </span>
                      <span style={{margin: 10}}>
                        --->
                      </span>
                      <span style={{margin: 10}}>
                        {humanise_material_position(m.to_repository, m.to_location, m.to_layer)}
                      </span>
                    </span>
                    <span>
                      <FlatButton label="查看任务" onTouchTap={() => changeHash(`/task/${m._id}`)} />
                    </span>
                  </div>
                </StepContent>
              </Step>
    ))

    return (
      <CardText>
          <Stepper orientation="vertical">
            {steps}
          </Stepper>
      </CardText>
    )
  }
}
MaterialMigrations.propTypes = {
  style: React.PropTypes.object
}
MaterialMigrations.defaultProps = {
  style: {}
}

class MaterialMore extends Component {

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
      <CardText style={{height: 86, padding:"50px 0"}}>
        <CenterButtons buttons={buttons} />
      </CardText>
    )
  }
}
MaterialMore.propTypes = {
  style: React.PropTypes.object
}
MaterialMore.defaultProps = {
  style: {}
}
