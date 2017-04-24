import React, { Component } from "react"
import ReactDOM from "react-dom"

import {Card, CardActions, CardHeader, CardTitle, CardText} from "material-ui/Card"
import FlatButton from "material-ui/FlatButton"
import Toggle from "material-ui/Toggle"


export default class CheckPage extends Component {

  constructor(props){
    super(props)
    this.state = {
      expanded: false,
    }
    this.handleExpandChange = this.handleExpandChange.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleExpand = this.handleExpand.bind(this)
    this.handleReduce = this.handleReduce.bind(this)
  }

  handleExpandChange(expanded) {
    this.setState({expanded: expanded})
  }

  handleToggle(event, toggle) {
    this.setState({expanded: toggle})
  }

  handleExpand() {
    this.setState({expanded: true})
  }

  handleReduce() {
    this.setState({expanded: false})
  }

  render() {
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
            title="URL Avatar"
            subtitle="Subtitle"
            actAsExpander={true}
            showExpandableButton={true}
        />
        <CardText>
          <Toggle
              toggled={this.state.expanded}
              onToggle={this.handleToggle}
              labelPosition="right"
              label="This toggle controls the expanded state of the component."
          />
        </CardText>
        <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
        <CardText expandable={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions>
          <FlatButton label="Expand" onTouchTap={this.handleExpand} />
          <FlatButton label="Reduce" onTouchTap={this.handleReduce} />
        </CardActions>
      </Card>
    )
  }
}
CheckPage.propTypes = {
  style: React.PropTypes.object
}
CheckPage.defaultProps = {
  style: {}
}
