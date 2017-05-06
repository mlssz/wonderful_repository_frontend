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
			<Drawer
				docked={false}
				open={this.props.visible}
				onRequestChange={()=>this.props.closeMean()}>
				<List>
					<ListItem
						primaryText="入库管理"
							initiallyOpen={false}
							primaryTogglesNestedList={true}
							nestedItems={[
								<ListItem
									  key={1}
									  primaryText="入库管理"
									  onClick={()=>this.handleClick("putawayManage")}
								/>,
								<ListItem
									  key={2}
									  primaryText="入库登记"
									  onClick={()=>this.handleClick("putaway")}
								/>
							]}
					/>
					<ListItem
						primaryText="移动管理"
							initiallyOpen={false}
							primaryTogglesNestedList={true}
							nestedItems={[
								<ListItem
									  key={1}
									  primaryText="移动管理"
									  onClick={()=>this.handleClick("moveManage")}
								/>,
								<ListItem
									  key={2}
									  primaryText="移动登记"
									  onClick={()=>this.handleClick("move")}
								/>
							]}
					/>
					<ListItem
						primaryText="出库管理"
							initiallyOpen={false}
							primaryTogglesNestedList={true}
							nestedItems={[
								<ListItem
									  key={1}
									  primaryText="出库管理"
									  onClick={()=>this.handleClick("outManage")}
								/>,
								<ListItem
									  key={2}
									  primaryText="出库登记"
									  onClick={()=>this.handleClick("out")}
								/>
							]}
					/>
					<ListItem
						primaryText="盘点管理"
							initiallyOpen={false}
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
						primaryText="统计与查询"
							initiallyOpen={false}
							primaryTogglesNestedList={true}
							nestedItems={[
								<ListItem
									  key={1}
									  primaryText="统计"
									  onClick={()=>this.handleClick("stat")}
								/>,
								<ListItem
									  key={2}
									  primaryText="货物类型统计"
									  onClick={()=>this.handleClick("stat_good_type")}
								/>,
								<ListItem
									  key={3}
									  primaryText="任务数量统计"
									  onClick={()=>this.handleClick("stat_task_number")}
								/>,
								<ListItem
									  key={4}
									  primaryText="入库时长统计"
									  onClick={()=>this.handleClick("stat_good_time")}
								/>,
								<ListItem
									  key={5}
									  primaryText="物品管理"
									  onClick={()=>this.handleClick("goodsManage")}
								/>
							]}
					/>
				</List>
        	</Drawer>
		)
	}
}