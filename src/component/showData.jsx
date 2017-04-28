import React, {
  Component
} from "react"

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table"

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

