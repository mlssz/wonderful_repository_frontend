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
    let random = Math.floor(Math.random() * 100);
    return (
      goods.map((good, i) => <SelfTableRow good={good} onClick={() => this.handleOnClick(good)} key={i+good._id+random} index={i}/>)
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
                  <TableRowColumn style={{color:"gray",overflow:"visible"}}>操作</TableRowColumn>
                  <TableRowColumn style={{color:"gray",overflow:"visible"}}>编号</TableRowColumn>
                  <TableRowColumn style={{color:"gray",overflow:"visible"}}>类型</TableRowColumn>
                  <TableRowColumn style={{color:"gray",overflow:"visible"}}>起始位置</TableRowColumn>
                  <TableRowColumn style={{color:"gray",overflow:"visible"}}>到达位置</TableRowColumn>
                  <TableRowColumn style={{color:"gray",overflow:"visible"}}>执行状态</TableRowColumn>
                  <TableRowColumn style={{color:"gray",overflow:"visible"}}>创建时间</TableRowColumn>
                  <TableRowColumn style={{color:"gray",overflow:"visible"}}>更新时间</TableRowColumn>
                  <TableRowColumn style={{color:"gray",overflow:"visible"}}>操作文员</TableRowColumn>
                </TableRow>
                {this.showRow()}
              </TableBody>
            </Table>
          </MuiThemeProvider>
    )
  }

}