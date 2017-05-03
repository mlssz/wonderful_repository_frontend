import React from 'react'
import {
	HashRouter,
	Route
} from 'react-router-dom'
import CheckPage from "./checkPage.jsx"
import PutAway from './in/PutAway.jsx'
import EnsureAction from './in/EnsureAction.jsx'
import Manage from './in/Manage.jsx'

import Move from './move/Move.jsx'
import MoveEnsure from './move/EnsureAction.jsx'
import MoveManage from './move/Manage.jsx'

import Out from './out/out.jsx'
import OutEnsure from './out/EnsureAction.jsx'
import OutManage from './out/Manage.jsx'

import Stat from './stat/Stat.jsx'
import MaterialPage from "./SpecialPages/MaterialPage.jsx"
import TaskPage from "./SpecialPages/TaskPage.jsx"
import StaffPage from "./SpecialPages/StaffPage.jsx"

import GoodsManage from './goods/Manage.jsx'

export default class HashTable extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<HashRouter hashType="noslash">
				<div>
					<Route exact path="/" component={Stat}/>
					<Route path="/putawayManage" component={Manage}/>
					<Route path="/putaway" component={PutAway}/>
					<Route path="/putawayEnsure" component={EnsureAction}/>
          			<Route path="/check" component={CheckPage} />
					<Route path='/move' component={Move}/>
					<Route path='/moveEnsure' component={MoveEnsure}/>
					<Route path='/moveManage' component={MoveManage}/>
					<Route path='/out' component={Out}/>
					<Route path='/outEnsure' component={OutEnsure}/>
					<Route path='/outManage' component={OutManage}/>
					<Route path='/stat' component={Stat}/>
					<Route path='/material/:id' component={MaterialPage} />
					<Route path='/task/:id' component={TaskPage} />
					<Route path='/staff/:id' component={StaffPage} />
					<Route path='/goodsManage' component={GoodsManage}/>
				</div>
			</HashRouter>
		)
	}
}