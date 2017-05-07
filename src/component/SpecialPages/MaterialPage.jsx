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
import Paper from 'material-ui/Paper'

import {Loading} from "../tools/Loading.jsx"

import {changeHash, paperStyle} from "../../libs/common.js"
import {getGoodById, getMigrationsById} from "../../libs/callToBack.js"
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
      <Paper style={paperStyle}>
      <Tabs>
        {tabs.map((t, i) => (
           <Tab label={t.label} value={i.toString()} key={i}>
            <t.component style={this.tabStyle} mid={this.props.match.params.id}/>
           </Tab>
         ))}
      </Tabs>
      </Paper>
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
    this.state = {
      "loading": true,
      "material": null
    }
  }

  componentWillMount(){
    getGoodById(this.props.mid)
      .then(material => this.setState({
        "loading": false,
        "material": material
      }))
      .catch(console.log)
  }

  render() {
    if (this.state.loading) {
      return (<div><Loading style={{margin: 150}}/></div>)
    }

    let material = this.state.material
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
    this.state = {
      "loading": true,
      "migrations": null
    }
  }

  componentWillMount(){
    getMigrationsById(this.props.mid)
      .then(migrations => this.setState({
        "loading": false,
        "migrations": migrations
      }))
      .catch(console.log)
  }

  render() {
    if (this.state.loading) {
      return (<div><Loading style={{margin: 150}}/></div>)
    }

    const migrations = this.state.migrations
    console.log(migrations)

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
                      <FlatButton label="查看任务" onTouchTap={() => changeHash(`/task/migration_${m._id}`)} />
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
