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
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn style={{color:"gray"}}>#</TableRowColumn>
                            <TableRowColumn style={{color:"gray"}}>操作</TableRowColumn>
                            <TableRowColumn style={{color:"gray"}}>编号</TableRowColumn>
                            <TableRowColumn style={{color:"gray"}}>类型</TableRowColumn>
                            <TableRowColumn style={{color:"gray"}}>起始位置</TableRowColumn>
                            <TableRowColumn style={{color:"gray"}}>到达位置</TableRowColumn>
                            <TableRowColumn style={{color:"gray"}}>执行状态</TableRowColumn>
                            <TableRowColumn style={{color:"gray"}}>创建时间</TableRowColumn>
                            <TableRowColumn style={{color:"gray"}}>更新时间</TableRowColumn>
                            <TableRowColumn style={{color:"gray"}}>操作文员</TableRowColumn>
                        </TableRow>
                        {this.showRow()}
                    </TableBody>
                </Table>
            </MuiThemeProvider>
        )
    }

}