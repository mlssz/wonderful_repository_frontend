import React from 'react'
import {
	HashRouter,
	Route
} from 'react-router-dom'
import PutAway from './PutAway.jsx'
import EnsureAction from './EnsureAction.jsx'

export default class HashTable extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<HashRouter hashType="noslash">
				<div>
					<Route exact path="/" component={PutAway}/>
					<Route path="/putaway" component={PutAway}/>
					<Route path="/putawayEnsure" component={EnsureAction}/>
				</div>
			</HashRouter>
		)
	}
}