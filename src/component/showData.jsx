import React, {
  Component
} from "react"

import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table"

import {
  humanise_material_position,
  humanise_date
} from "../libs/humanise_map.js"

export const key_value_table = (kvmap) => {
  if(kvmap === undefined) return undefined

  return (
    <Table>
      <TableBody
          displayRowCheckbox={false}
          stripedRows={true}
          selectable={false}>
        {Object.keys(kvmap).filter(k => kvmap[k]).map((k, i) => (
           <TableRow key={i}>
             <TableRowColumn style={{overflow:"visible"}}>{k}</TableRowColumn>
             <TableRowColumn style={{overflow:"visible"}}>{kvmap[k]}</TableRowColumn>
           </TableRow>
         ))}
      </TableBody>
    </Table>
  )
}

export const migrationSteps = migrations => {
    let steps = migrations.map((m, i) => (
              <Step active={true} key={i}>
                <StepButton>
                  {humanise_date(m.date)}
                </StepButton>
                <StepContent>
                  <div>
                    <span>
                      <span style={{margin: 10}}>
                        {humanise_material_position(m.from_repository, m.from_location, m.from_layer)}
                      </span>
                      <span style={{margin: 10}}>
                        --->
                      </span>
                      <span style={{margin: 10}}>
                        {humanise_material_position(m.to_repository, m.to_location, m.to_layer)}
                      </span>
                    </span>
                  </div>
                </StepContent>
              </Step>
    ))

    return (
            <Stepper orientation="vertical">
              {steps}
            </Stepper>
      )
}
