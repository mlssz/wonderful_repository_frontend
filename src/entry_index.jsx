import React from "react"
import ReactDOM from "react-dom"
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Mean from "./component/mean.js"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import injectTapEventPlugin from "react-tap-event-plugin"
import Putaway from "./component/Putaway.js"

injectTapEventPlugin()

let bodyStyle = {
    display: "flex",
    padding: 0,
    margin: 0,
    minHeight: "100%",
}
let leftStyle = {
    display: "inline-block",
    width: "200px",
    backgroundColor: "#EAEAEA",
    height: "100%",
}
let headStyle = {
    padding: 5,
    backgroundColor: "#EAEAEA",
    height: "20px",
    textAlign: "center",
    fontSize: "20px",
    lineHeight: "20px",
}
let rightStyle = {
    flex: 1,
}

class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            page: <Putaway/>,
            title: "入库",
        }
        this.changePage = this.changePage.bind(this)
        this.showMean = this.showMean.bind(this)
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
                        <Mean changePage={this.changePage}/>
                    </Drawer>
                    <div className="body" style={bodyStyle}>
                        {this.state.page}
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }

}

ReactDOM.render(<Body/>, document.getElementById("content"))