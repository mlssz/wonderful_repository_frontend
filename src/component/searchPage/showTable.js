import React from "react"
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import SelfTableRow from "./TableRow.js"

export default class ShowTable extends React.Component {
    constructor(props) {
        super(props)
        this.showRow = this.showRow.bind(this);
    }

    showRow() {
        let goods = this.props.goods;
        return (
            goods.map((good, i) => <SelfTableRow good={good} key={i} index={i}/>)
        )
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
                        {this.showRow()}
                  </TableBody>
                </Table>
            </MuiThemeProvider>
        )
    }

}