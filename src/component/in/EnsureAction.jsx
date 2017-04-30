import React from 'react'
import {
	Step,
	Stepper,
	StepLabel,
} from 'material-ui/Stepper';

import EnsureTable from './EnsureTable.jsx'

export default class EnsureAction extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stepIndex: 1,
		};
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
		      <EnsureTable/>
	    	</div>
		)
	}
}