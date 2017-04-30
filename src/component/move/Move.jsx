import React from "react"
import TaskForm from './TaskForm.jsx'
import {
	Step,
	Stepper,
	StepLabel,
} from 'material-ui/Stepper';

export default class Move extends React.Component {
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
				<Stepper activeStep={this.state.stepIndex} style={{width:'60%',margin:'0 auto'}}>
			        <Step>
			          <StepLabel>填写移动单</StepLabel>
			        </Step>
			        <Step>
			          <StepLabel>完成移动</StepLabel>
			        </Step>
		      	</Stepper>
		      	<TaskForm/>
	    	</div>
		)
	}
}