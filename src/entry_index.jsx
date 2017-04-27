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

let goods = [];

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
            page: Putaway,
            title: "入库",
            params: {},
            goods: goods,
        }
        this.changePage = this.changePage.bind(this)
        this.showMean = this.showMean.bind(this)
    }

    changePage(page, title, params = {}) {
        this.setState({
            page,
            title,
            params,
            open: false,
        })
    }

    changeGoods(goods) {
        this.setState({
            goods
        })
    }

    showMean() {
        this.setState({
            open: true
        })
    }

    render() {
        let Page = this.state.page;
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
                    <Card style={bodyStyle}><Page goods={this.state.goods} changePage={this.changePage} params={this.state.params}/></Card>
                </div>
            </MuiThemeProvider>
        )
    }

}

ReactDOM.render(<Body/>, document.getElementById("content"))