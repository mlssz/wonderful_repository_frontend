/* This component defined many controler components input time field
 *
 * Usage:
 *	   import XXXCtlTextField from "./component/InputContrlTextField.jsx"
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 09.03.2016
 */
import React, {
  Component
} from "react"

import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'
import transitions from 'material-ui/styles/transitions'
import muiThemeable from 'material-ui/styles/muiThemeable'


/* base datetime input contrler
 * @prop style Object
 * @prop timeprops Object props for TimePicker
 * @prop dateprops Object props for DatePicker
 * @prop errString String the error info [default: "Your input is wrong!" ]
 * @prop errCallback Function if input is error , call it
 * @prop callback Function(value) if input is true, call it
 * @prop judgeFunc Function(vlaue) fuction for judge whether the value is valid
 */
class _BaseCtlDateTimePickField extends Component {

  constructor(props) {
    super(props)
    this.state = {
      "isError": 0,
      "value": this.props.value ? new Date(this.props.value) : undefined,
      "errValue": ""
    }

    this.errorColor = this.props.muiTheme.textField.errorColor
    this.errorStyle = {
        position: 'abstract',
        bottom: 2,
        fontSize: 12,
        lineHeight: '12px',
        color: this.errorColor,
        transition: transitions.easeOut(),
    }

    this.ctlJudge_and_changeText = this.ctlJudge_and_changeText.bind(this)
    this.handleOnDateChange = this.handleOnDateChange.bind(this)
    this.handleOnTimeChange = this.handleOnTimeChange.bind(this)
    this.handleOnDateDismiss = this.handleOnDateDismiss.bind(this)
  }

  //TODO: this.state.value is not needed to put in state , for while it change ,nothing should be change
  //      so, we can put it in this.value
  /* this component "s  core, it change errorText and call resove or reject
   * @param value  Object
   * @param resove Function(String)
   * @param reject Function(String)
   */
  ctlJudge_and_changeText(value, resove, reject) {
    let JudgeFunc = this.props.judgeFunc

    if (JudgeFunc(value)) {
      this.setState({
        errValue: ""
      })
      resove && resove(value)
    } else {
      this.setState({
        errValue: this.props.errString
      })
      reject && reject(value)
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value && nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value
      })
    }
  }

  combineDateAndTime(date, time) {
    return new Date(Math.floor(date / 86400000) * 86400000 + Math.floor(time % 86400000))
  }

  handleOnDateChange(_, date) {
    if (!this.state.value) {
      return this.handleOnDateDismiss(date)
    }

    date = this.combineDateAndTime(date, this.state.value)
    this.handleOnDateDismiss(date)
  }

  handleOnTimeChange(_, time) {
    if (!this.state.value) {
      return this.handleOnDateDismiss(time)
    }

    time = this.combineDateAndTime(this.state.value, time)
    this.handleOnDateDismiss(time)
  }

  handleOnDateDismiss(date) {
    this.ctlJudge_and_changeText(
      date || this.state.value,
      (value) => {
        if (value === this.state.value) {
          return
        }

        this.setState({
          "value": value,
          "isError": 0
        })
        this.props.callback(value)
      },
      (value) => {
        if (this.state.isError === 1) {
          return
        }

        this.setState({
          "isError": 1
        })
        this.props.errCallback(value)
      }
    )
  }

  render() {
    let divStyle = Object.assign({}, {
      height: 48
    }, this.props.style)

    const errorTextElement = this.state.errValue && (
      <div style={this.errorStyle}>
        {this.state.errValue}
      </div>
    )

    let dateprops = Object.assign({}, {
      textFieldStyle:{width: 100}
    }, this.props.dateprops)

    let timeprops = Object.assign({}, {
      textFieldStyle:{width: 64},
      format: "24hr"
    }, this.props.timeprops)

    return (
      <div style={divStyle}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "bottom",
        }}>
        <DatePicker {...dateprops}
                    defaultDate={this.state.value}
                    errorText={this.state.errValue ? " " : ""}
                    onChange={this.handleOnDateChange}
                    onDismiss={this.handleOnDateDismiss}
                    style={{display: "inline-block"}}
        />
        <TimePicker   {...timeprops}
                      defaultTime={this.state.value}
                      errorText={this.state.errValue ? " " : ""}
                      onChange={this.handleOnTimeChange}
                      onDismiss={this.handleOnDateDismiss}
                      style={{display: "inline-block"}}
          />
      </div>
      {errorTextElement}
      </div>
    )
  }
}
_BaseCtlDateTimePickField.propTypes = {
  style: React.PropTypes.object,
  timeprops: React.PropTypes.object,
  dateprops: React.PropTypes.object,
  judgeFunc: React.PropTypes.func.isRequired,
  errString: React.PropTypes.string,
  errCallback: React.PropTypes.func,
  callback: React.PropTypes.func
}
_BaseCtlDateTimePickField.defaultProps = {
  style: {},
  timeprops: {},
  dateprops: {},
  judgeFunc: (value) => value,
  errString: "Your input is wrong!",
  errCallback: () => console.log("error value"),
  callback: () => console.log("true value")
}
export const BaseCtlDateTimePickField = muiThemeable()(_BaseCtlDateTimePickField)
