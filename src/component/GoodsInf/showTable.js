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
import TaskPage from "../SpecialPages/TaskPage.jsx"

export default class ShowTable extends React.Component {
  constructor(props) {
    super(props)
    this.showRow = this.showRow.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  showRow() {
    let goods = this.props.goods;
    return (
      goods.map((good, i) => <SelfTableRow good={good} onTouchTap={() => this.handleOnClick(good)} key={i} index={i}/>)
    )
  }

  handleOnClick(good) {
    this.props.changePage(TaskPage, "任务详情", good)
  }

  render() {
    return (
      <MuiThemeProvider>
            <Table>
              <TableBody displayRowCheckbox={false} selectable={false}>
                <TableRow>
                  <TableRowColumn style={{color:"gray",overflow:"visible"}}>#</TableRowColumn>
                  <TableRowColumn style={{color:"gray",overflow:"visible"}}>编号</TableRowColumn>
                  <TableRowColumn style={{color:"gray",overflow:"visible"}}>类型</TableRowColumn>
                  <TableRowColumn style={{color:"gray",overflow:"visible"}}>数量</TableRowColumn>
                  <TableRowColumn style={{color:"gray",overflow:"visible"}}>位置</TableRowColumn>
                  <TableRowColumn style={{color:"gray",overflow:"visible"}}>入库时间</TableRowColumn>
                  <TableRowColumn style={{color:"gray",overflow:"visible"}}>估计出库时间</TableRowColumn>
                  <TableRowColumn style={{color:"gray",overflow:"visible"}}>最经一次搬运</TableRowColumn>
                  <TableRowColumn style={{color:"gray",overflow:"visible"}}> </TableRowColumn>
                </TableRow>
                {this.showRow()}
              </TableBody>
            </Table>
          </MuiThemeProvider>
    )
  }

}
