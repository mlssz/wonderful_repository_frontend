import React from "react"
import TaskForm from './TaskForm.jsx'
import {
	Step,
	Stepper,
	StepLabel,
} from 'material-ui/Stepper';
import Selecter from './Selecter.jsx'

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
				<Stepper activeStep={this.state.stepIndex} style={{width:'60%',margin:'0 auto'}}>
			        <Step>
			          <StepLabel>填写入库单</StepLabel>
			        </Step>
			        <Step>
			          <StepLabel>完成入库</StepLabel>
			        </Step>
		      	</Stepper>
		      	<TaskForm/>
	    	</div>
		)
	}
}