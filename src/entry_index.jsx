import React from "react"
import ReactDOM from "react-dom"
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {
    Card
} from 'material-ui/Card'

import Mean from "./component/mean.js"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import injectTapEventPlugin from "react-tap-event-plugin"
import Putaway from "./component/Putaway.js"

injectTapEventPlugin()

let bodyStyle = {
    maxWidth: 1300,
    margin: "30px auto",
    padding: 24
}

class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            page: false,
            title: "入库",
        }
        this.changePage = this.changePage.bind(this)
        this.showMean = this.showMean.bind(this)
    }

    componentWillMount() {
        this.setState({
            page: <Putaway changePage={this.changePage}/>
        })
    }

    changePage(page, title) {
        this.setState({
            page,
            title,
            open: false,
        })
    }

    showMean() {
        this.setState({
            open: true
        })
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title={<span>{this.state.title}</span>} onLeftIconButtonTouchTap={this.showMean}/>
                    <Drawer
                        docked={false}
                        width={200}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}
                    >
                        <Mean changePage={this.changePage} changeShowCard={this.changeShowCard}/>
                    </Drawer>
                    <Card style={bodyStyle}>{this.state.page}</Card>
                </div>
            </MuiThemeProvider>
        )
    }

}

ReactDOM.render(<Body/>, document.getElementById("content"))