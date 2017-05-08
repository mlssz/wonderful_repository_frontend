import React, {
  Component
} from "react"

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableFooter,
  TableRowColumn
} from "material-ui/Table"
import FlatButton from "material-ui/FlatButton"

import {
	parsetime,
} from '../libs/common.js'

export const key_value_table = (kvmap) => {
  if(kvmap === undefined) return undefined

  return (
    <Table>
      <TableBody
          displayRowCheckbox={false}
          stripedRows={true}
          selectable={false}>
        {Object.keys(kvmap).filter(k => kvmap[k] !== undefined).map((k, i) => (
           <TableRow key={i}>
             <TableRowColumn style={{overflow:"visible"}}>{k}</TableRowColumn>
             <TableRowColumn style={{overflow:"visible"}}>{kvmap[k]}</TableRowColumn>
           </TableRow>
         ))}
      </TableBody>
    </Table>
  )
}

// example:
//   headers [["tou","a"], ["ta", "b"], ["fu","c"]] rows [{a: 1, b: 2, c: 3}, {a:2, b: 3, c: 4}]
//   general_table(headers, rows) =>
//
//    | tou | ta | fu |
//    |  1  | 2  | 3  |
//    |  2  | 3  | 4  |
export const general_table = (headers, rows, onclick) => {

  return (
    <Table>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          {headers.map((h, i) => (
            <TableHeaderColumn key={i}>{h[0]}</TableHeaderColumn>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} stripedRows={true} selectable={false} >
        {rows.map((r, i) => (
           <TableRow key={i} onTouchTap={() => onclick && onclick(r, i, rows)}>
             {headers.map(h => (
               <TableRowColumn style={{overflow:"visible"}}>
                 {r[h[1]]}
               </TableRowColumn>
              ))}
           </TableRow>
         ))}
      </TableBody>
    </Table>
  )
}

export const printable_table = (tableName, className, headers, rows, onclick) => {
  let printTable = () => {
		let table2excel = new Table2Excel();
		let name = tableName + parsetime(new Date(), 2)
		table2excel.export(document.getElementsByClassName(className)[1], name)
  }

  return (
    <div style={{textAlign: "right"}}>
    <FlatButton label="打印" onTouchTap={printTable}/>
      <PagingTable
        tableprops={{className: className}}
        headers={headers.map((h, i) => (
              <TableHeaderColumn style={{fontWeight: "bold", color: "black"}}
                  key={i}>{h[0]}</TableHeaderColumn>
              ))}
        raws={rows.map((r, i) => (
            <TableRow key={i} onTouchTap={() => onclick && onclick(r, i, rows)}>
              {headers.map(h => (
                <TableRowColumn style={{overflow:"visible"}}>
                  {r[h[1]]}
                </TableRowColumn>
                ))}
            </TableRow>
          ))}
     />
    </div>
  )
}

class PagingTable extends Component {

  constructor(props){
    super(props)
    this.state = {
      page: 1
    }
  }

  render() {
    let page_num = Math.ceil(this.props.raws.length / this.props.limit)
    let start = (this.state.page - 1) * this.props.limit
    let end = this.state.page * 10

    return (
      <Table {...this.props.tableprops}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow style={{textAlign: "center", fontWeight: "bold", fontSize: 17}}>
            {this.props.headers}
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} stripedRows={false} selectable={false} >
          {this.props.raws.slice(start, end)}
        </TableBody>
        <TableFooter adjustForCheckbox={false} >
          <TableRow>
            <TableRowColumn style={{textAlign: "center"}}>
              <FlatButton label="上一页" onTouchTap={() => {
                  if(this.state.page > 1) this.setState({page: this.state.page-1})
                }}/>
            </TableRowColumn>
            <TableRowColumn style={{textAlign: "center"}}>
              {this.state.page} / {page_num}
            </TableRowColumn>
            <TableRowColumn style={{textAlign: "center"}}>
              <FlatButton label="下一页" onTouchTap={() => {
                  if(this.state.page < page_num) this.setState({page: this.state.page+1})
                }}/>
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
}
PagingTable.propTypes = {
  style: React.PropTypes.object,
  tableprops: React.PropTypes.object,
  headers: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
  raws: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
  limit: React.PropTypes.number,
}
PagingTable.defaultProps = {
  style: {},
  tableprops: {},
  limit: 10
}
