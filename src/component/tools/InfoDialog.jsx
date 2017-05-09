import React, { Component  } from "react"

import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"

export default class InfoDialog extends Component {
  
  constructor(props) {
    super(props)
    this.state = {"open": false}

    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)

    this.title = "info"
    this.info = "info"
  }

  Open(title, info, onClose=console.log) {
    this.title = title
    this.info = info
    this.onClose = onClose
    this.handleDialogOpen()
  }

  Close(){
    this.handleDialogClose()
  }

  handleDialogOpen() {
    this.setState({"open": true})
  }

  handleDialogClose() {
    this.setState({"open": false})
    this.onClose && this.onClose()
  }

  render() {
    let actions = [
      <FlatButton label={this.props.defaultLabel} primary={true} keyboardFocused={true} onTouchTap={this.handleDialogClose} />
    ]

    if(this.props.anotherButton){
      actions.push(this.props.anotherButton)
    }

    return (
      <Dialog 
        {...this.props}
        title={this.title}
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleDialogClose}>
        {this.info}
      </Dialog>
    )
  }
}
InfoDialog.propTypes = {
  anotherButton: React.PropTypes.element,
  defaultLabel: React.PropTypes.string,
}
InfoDialog.defaultProps = {
  defaultLabel: "Cancel"
}
