import React from 'react'
import Drawer from 'material-ui/Drawer'
import {
	List,
	ListItem
} from 'material-ui/List'
import {
	changeHash
} from '../libs/common.js'

export default class ReactClassName extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(hash) {
		changeHash(hash);
		this.props.closeMean();
	}

	render() {
		return (
			<Drawer open={this.props.visible}>
				<List>

					<ListItem
						primaryText="入库管理"
							initiallyOpen={true}
							primaryTogglesNestedList={true}
							nestedItems={[
								<ListItem
									  key={1}
									  primaryText="入库"
									  onClick={()=>this.handleClick("putaway")}
								/>
							]}
					/>

				</List>
        	</Drawer>
		)
	}
}