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
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'

import TaskPage from './TaskPage.jsx'

import {
  humanise_material_var,
  humanise_date,
  humanise_material_position,
} from "../../libs/humanise_map.js"
import {
  key_value_table,
} from "../showData.jsx"

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

const migrationSteps = (migrations, changePage)=> {
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
                      <FlatButton label="查看任务" onTouchTap={() => changePage(TaskPage, "Task", m._id)} />
                    </span>
                  </div>
                </StepContent>
              </Step>
    ))

    return (
            <Stepper orientation="vertical">
              {steps}
            </Stepper>
      )
}

export default class MaterialPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      "state": 1
    }

  }

  render() {
    let material = this.props.params
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
      <div>
        <CardHeader
            title={<p style={{fontSize:26}}> <span>物资id</span> : <span>{material.id}</span></p>}
            subtitle={<p style={{fontSize:26}}> <span>物资类型</span> : <span>{material.type}</span> </p>} />

        <CardText>
          <CardHeader title={<p style={inheadStyle}>基本信息</p>}/>
          <CardText>
            {key_value_table(material_kvmap)}
          </CardText>
          <Divider />

          <CardHeader title={<p  style={inheadStyle}>时间</p>}/>
          <CardText>
            {key_value_table(time_kvmap)}
          </CardText>

          <Divider />
          <CardHeader title={<p  style={inheadStyle}>移动记录</p>}/>
          <CardText>
            {migrationSteps(migrations, this.props.changePage)}
          </CardText>
        </CardText>
      </div>
    )
  }
}
MaterialPage.propTypes = {
  style: React.PropTypes.object
}
MaterialPage.defaultProps = {
  style: {}
}
