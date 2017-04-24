import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class PutAway extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>
                <p>请填写物资信息</p>
                <MuiThemeProvider>
                  <div>
                    <TextField
                        defaultValue=""
                        floatingLabelText="物资编号"
                    />
                    <TextField
                        defaultValue=""
                        floatingLabelText="物资类型"
                    />
                    <TextField
                        defaultValue=""
                        floatingLabelText="入库时间"
                    />
                    <TextField
                        defaultValue=""
                        floatingLabelText="估计出库时间"
                    />
                    <TextField
                        defaultValue=""
                        floatingLabelText="物资描述"
                    />
                  </div>
                </MuiThemeProvider>
      </div>
        )
    }

}