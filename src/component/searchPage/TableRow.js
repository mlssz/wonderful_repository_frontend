import React from "react"
import {
	TableRow,
	TableRowColumn
} from "material-ui/Table"

export default class SelfTableRow extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
      <TableRow>
        <TableRowColumn>1</TableRowColumn>
        <TableRowColumn>John Smith</TableRowColumn>
        <TableRowColumn>Employed</TableRowColumn>
      </TableRow>
		)
	}

}
