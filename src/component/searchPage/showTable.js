import React from 'react';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn
} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class ShowTable extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<MuiThemeProvider>
				<Table>
				    <TableHeader
				    	displaySelectAll={false}>
				      <TableRow>
				        <TableHeaderColumn>#</TableHeaderColumn>
				        <TableHeaderColumn>操作</TableHeaderColumn>
				        <TableHeaderColumn>类型</TableHeaderColumn>
				        <TableHeaderColumn>起始位置</TableHeaderColumn>
				        <TableHeaderColumn>到达位置</TableHeaderColumn>
				        <TableHeaderColumn>执行状态</TableHeaderColumn>
				        <TableHeaderColumn>创建时间</TableHeaderColumn>
				        <TableHeaderColumn>更新时间</TableHeaderColumn>
				        <TableHeaderColumn>操作文员</TableHeaderColumn>
				      </TableRow>
				    </TableHeader>
				    <TableBody
				    	displayRowCheckbox={false}
				    	showRowHover={true}>
				      <TableRow>
				        <TableRowColumn>1</TableRowColumn>
				        <TableRowColumn>John Smith</TableRowColumn>
				        <TableRowColumn>Employed</TableRowColumn>
				      </TableRow>
				      <TableRow>
				        <TableRowColumn>2</TableRowColumn>
				        <TableRowColumn>Randal White</TableRowColumn>
				        <TableRowColumn>Unemployed</TableRowColumn>
				      </TableRow>
				      <TableRow>
				        <TableRowColumn>3</TableRowColumn>
				        <TableRowColumn>Stephanie Sanders</TableRowColumn>
				        <TableRowColumn>Employed</TableRowColumn>
				      </TableRow>
				      <TableRow>
				        <TableRowColumn>4</TableRowColumn>
				        <TableRowColumn>Steve Brown</TableRowColumn>
				        <TableRowColumn>Employed</TableRowColumn>
				      </TableRow>
				    </TableBody>
				</Table>
			</MuiThemeProvider>
		)
	}

}