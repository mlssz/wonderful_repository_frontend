import React from 'react';
import ShowTable from './searchPage/showTable.js'
import Picker from './searchPage/Picker.js'
import SelectPageNum from './searchPage/SelectPageNum.js'

export default class SearchPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Picker/>
				<ShowTable/>
				<SelectPageNum/>
			</div>
		)
	}
}