import React from "react"
import TaskForm from './TaskForm.jsx'
import {
	Step,
	Stepper,
	StepLabel,
} from 'material-ui/Stepper';
import Paper from 'material-ui/Paper'
import Selecter from './Selecter.jsx'
import {
	paperStyle
} from '../../libs/common.js'

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
			<Paper style={paperStyle} zDepth={1}>
			<div>
		      	<TaskForm/>
	    	</div>
	    	</Paper>
		)
	}
}