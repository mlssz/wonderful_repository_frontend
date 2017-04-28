import React from 'react'
import {
	HashRouter,
	Route
} from 'react-router-dom'
import PutAway from './PutAway.js'

export default class HashTable extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<HashRouter>
				<Route exact path="/" component={PutAway}/>
				<Route path="/putaway" component={PutAway}/>
			</HashRouter>
		)
	}
}