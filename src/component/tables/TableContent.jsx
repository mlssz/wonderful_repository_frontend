import React, { Component  } from "react"

import {Table, TableBody, TableHeader, TableFooter, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table"

import BetweenButtons from "../buttons/BetweenButtons.jsx"

import {MergeObjects, ObjectSimpleCompare} from "../lib/util.js"

/* this function combine table rows 
 *
 * @prop keys Array<String> the data keys
 * @prop datas Array<String> every element of datas will be a row
 * @return TableRowElements
 */
function combineTableRows(keys, datas, style={}){
  return datas.map((data) => {

    let rows = keys.map((key) => {
      return <TableRowColumn style={style} tooltip={key}>{data[key]}</TableRowColumn>
    })

    return (
      <TableRow>
        {rows}
      </TableRow>
    )
  })
}

/* a info table , it show key/value data, like 
 *
 * -----------------------------------
 * |      table head                 |
 * -----------------------------------
 * |    key1        |     value1     |
 * -----------------------------------
 * |    key2        |     value2     |
 * -----------------------------------
 * |    key3        |     value3     |
 * -----------------------------------
 * |     ...        |       ...      |
 *
 * @prop  body Object{"key": String, "datas", String} the key/value data
 * @prop  TableName String 
 * @prop  style Object
 */
export class InfoTable extends Component {
  
  constructor(props) {
    super(props)
  }

  render() {
    let body = this.props.body
    let bodyElement = null

    if(body){
      bodyElement = combineTableRows(body["keys"], body["datas"])
    }

    return (
      <div style={this.props.style}>
      <Table
        fixedHeader={true}
        selectable={false}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn colSpan="2" tooltip="table name" style={{textAlign: "center"}}>
              {this.props.TableName}
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        //don"t show checkbox
        <TableBody displayRowCheckbox={false}
          showRowHover={false} >
          {bodyElement}
        </TableBody>
      </Table>
      </div>
    )
  }
}
InfoTable.propTypes = {
  //body : {keys:array(length=2), datas:array<object>}
  body: React.PropTypes.object.isRequired,
  TableName: React.PropTypes.string.isRequired,
  style: React.PropTypes.object
}
InfoTable.defaultProps = {
  style: {}
}

/* this is a Magic table , it used to show a table list 
 * and listen user click one row , and choose
 *
 * @prop headColumns Array<String> the array about column key name
 * @prop rowColumns Array<String> the keys of datas , used to be the value of tooltip of each RowColumn
 * @prop datas  Array<Object>  the datas, every element of datas will as a row
 * @prop handleRowClick Function(data) callback while the row clicked , and the data is the proptype of this row
 * @prop handleRowSelection Function(datas) callback while a row be selected 
 * @prop tableHeader String
 * @prop tableFooter String
 * @prop height Number the height of table
 *
 * fixedHeader, fixedFooter, stripedRows, showRowHover, selectable, multiSelectable, enableSelectAll, deselectOnClickaway, 
 * above proptype you can see http://www.material-ui.com/#/components/table
 */
export class MagicTable extends Component {
  
  constructor(props) {
    super(props)

    this.columnStyle = {textAlign: "center"}
    this.handleCellClick = this.handleCellClick.bind(this)
    this.handleRowSelection = this.handleRowSelection.bind(this)
  }

  handleCellClick(rowNumber, columnid){
    this.props.onRowClick(this.props.datas[rowNumber])
  }

  handleRowSelection(selectedRows){
    this.props.onRowSelection(selectedRows)
  }

  render() {
    let colSpan = this.props.rowColumns.length.toString()
    let datas = this.props.datas
    let rowColumns = this.props.rowColumns


    let tableHeadColumns = this.props.headColumns.map((elf, index) => {
      return <TableHeaderColumn style={this.columnStyle} tooltip={rowColumns[index]}>{elf}</TableHeaderColumn>
    })
    /*
     *let tableFootColumns = this.props.headColumns.map((elf, index) => {
     *  return <TableRowColumn tooltip={rowColumns[index]}>{elf}</TableRowColumn>
     *})
     */

    return (
      <div style={{padding:"0 16px", margin: "0 0 50px 0"}} >
      <Table 
        height={this.props.height+"px"} 
        fixedHeader={this.props.fixedHeader}
        fixedFooter={this.props.fixedFooter}
        selectable={this.props.selectable}
        multiSelectable={this.props.multiSelectable}
        onCellClick={this.handleCellClick}
        onRowSelection={this.handleRowSelection}
        >

        <TableHeader  
          enableSelectAll={this.props.enableSelectAll}
          >
          <TableRow>
            <TableHeaderColumn colSpan={colSpan} tooltip="page number" style={this.columnStyle}>
              {this.props.tableHeader}
            </TableHeaderColumn>
          </TableRow>
          <TableRow >{tableHeadColumns}</TableRow>
        </TableHeader>

        <TableBody  
          deselectOnClickaway={this.props.deselectOnClickaway}
          showRowHover={this.props.showRowHover}
          stripedRows={this.props.stripedRows}
          >
          {combineTableRows(rowColumns, datas, this.columnStyle)}
        </TableBody>

        <TableFooter>
         <TableRow>
           {tableHeadColumns}
         </TableRow>
         <TableRow>
           <TableRowColumn colSpan={colSpan} style={{textAlign: "center"}}>
            {this.props.tableFooter}
           </TableRowColumn>
         </TableRow>
        </TableFooter>
      </Table>
      </div>
    )
  }
}
MagicTable.propTypes = {
  fixedHeader: React.PropTypes.bool,
  fixedFooter: React.PropTypes.bool,
  stripedRows: React.PropTypes.bool,
  showRowHover: React.PropTypes.bool,
  selectable: React.PropTypes.bool,
  multiSelectable: React.PropTypes.bool,
  enableSelectAll: React.PropTypes.bool,
  deselectOnClickaway: React.PropTypes.bool,

  onRowClick: React.PropTypes.func,
  onRowSelection: React.PropTypes.func,

  headColumns: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  rowColumns: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  datas:  React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  tableHeader: React.PropTypes.string,
  tableFooter: React.PropTypes.string,
  height: React.PropTypes.number
}
MagicTable.defaultProps = {
  fixedHeader: true,
  fixedFooter: true,
  stripedRows: false,
  showRowHover: false,
  selectable: true,
  multiSelectable: false,
  enableSelectAll: false,
  deselectOnClickaway: true,

  onRowClick: (data) => {console.log(data)},
  onRowSelection: (data) => {console.log(data)},
  height: 300,
  tableHeader: "Table"
}


/* the container of table , it contains a table and two button (prew and next)
 * it will disable the button automutically
 * like :
 *  ----------------------
 *  |                    |
 *  |      table         |
 *  |                    |
 *  |                    |
 *  |  |prew|    |next|  |
 *  ----------------------
 *
 * its tableFooter is the information about pages ,likes "now_page/all_page" 
 *
 *  @prop buttonsClick Array<Function> the action about button(prew and next) click
 *  @prop children Object the React Table element
 *  @prop page Number(n >= 0) the number of now page, 0 <= page <= all_page-1
 *  @prop all_pages Number(n >= 1) the number of all pages
 *  @prop disabled Boolean disable two button
 *  
 *  other props , these transfer to the table element created by tableComponent
 */
export default class TableContainer extends Component {
  
  constructor(props) {
    super(props)

    this.defaultStyle = {width: "100%",  margin: "0 0", padding:"0 0"}
  }

  render() {
    let prewButton = { 
      "label": "Prew", "onTouchTap": this.props.buttonsClick[0], "type": 2, "disabled": this.props.disabled}
    let nextButton = {
      "label": "Next", "onTouchTap": this.props.buttonsClick[1], "type": 2 , "disabled": this.props.disabled}

    let divStyle = {}
    MergeObjects(divStyle, this.defaultStyle)
    MergeObjects(divStyle, this.props.style)

    //make tableFooter
    let page = this.props.page
    let all_pages = this.props.all_pages

    if(page <= 0){
      prewButton.disabled = true
    }

    if(page+1 >= all_pages){
      nextButton.disabled = true
    }
    
    return (
      <div style={divStyle}>
        {this.props.children}
        <BetweenButtons buttons={[prewButton, nextButton]} style={{padding: "16px", margin:"0 0"}}/>
      </div>
    )
  }
}
TableContainer.propTypes = {
  //headColumns is the name of the Columns , but rowColumns is the key name of the Column element
  buttonsClick: React.PropTypes.arrayOf(React.PropTypes.func).isRequired,
  children: React.PropTypes.element.isRequired,
  page: React.PropTypes.number.isRequired,
  all_pages: React.PropTypes.number.isRequired,
  style: React.PropTypes.object,
  disabled: React.PropTypes.bool
  //others transfer to tableComponent
}
TableContainer.defaultProps = {
}




