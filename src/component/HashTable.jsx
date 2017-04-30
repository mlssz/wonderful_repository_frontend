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

export default class HashTable extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<HashRouter hashType="noslash">
				<div>
					<Route exact path="/" component={Manage}/>
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
				</div>
			</HashRouter>
		)
	}
}