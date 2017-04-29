import React from "react"
import TaskForm from './TaskForm.jsx'
import {
	Step,
	Stepper,
	StepLabel,
} from 'material-ui/Stepper';
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export default class ReactClassName extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stepIndex: 0,
		};
	}

	setStep(stepIndex) {
		this.setState({
			stepIndex
		})
	}

	render() {
		return (
			<div>
				<Stepper activeStep={this.state.stepIndex} style={{width:'80%',margin:'0 auto'}}>
	        <Step>
	          <StepLabel>填写入库表单</StepLabel>
	        </Step>
	        <Step>
	          <StepLabel>确认入库表单</StepLabel>
	        </Step>
	        <Step>
	          <StepLabel>完成入库</StepLabel>
	        </Step>
	      </Stepper> 
	      <TaskForm />
	    </div>
		)
	}
}