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
			<Drawer open={this.props.visible} >
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
					<ListItem
						primaryText="移动管理"
							initiallyOpen={true}
							primaryTogglesNestedList={true}
							nestedItems={[
								<ListItem
									  key={1}
									  primaryText="移动"
								/>
							]}
					/>
					<ListItem
						primaryText="出库管理"
							initiallyOpen={true}
							primaryTogglesNestedList={true}
							nestedItems={[
								<ListItem
									  key={1}
									  primaryText="出库"
								/>
							]}
					/>
					<ListItem
						primaryText="盘点管理"
							initiallyOpen={true}
							primaryTogglesNestedList={true}
							nestedItems={[
								<ListItem
									  key={1}
									  primaryText="盘点"
									  onClick={()=>this.handleClick("check")}
								/>
							]}
					/>
					<ListItem
						primaryText="统计"
							initiallyOpen={true}
							primaryTogglesNestedList={true}
							nestedItems={[
								<ListItem
									  key={1}
									  primaryText="统计"
								/>
							]}
					/>
				</List>
        	</Drawer>
		)
	}
}
