import React from "react"
import ReactDOM from "react-dom"
import injectTapEventPlugin from "react-tap-event-plugin"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import AppBar from 'material-ui/AppBar';
import Mean from "./component/Mean.jsx"
import HashTable from "./component/HashTable.jsx"

injectTapEventPlugin();

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "title",
            meanVisible: false,
        }
        this.contralMean = this.contralMean.bind(this);
    }

    contralMean(state) {
        this.setState({
            meanVisible: state,
        })
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        title="Title"
                        onLeftIconButtonTouchTap={()=>this.contralMean(true)}/>
                    <HashTable/>
                    <Mean visible={this.state.meanVisible} closeMean={()=>this.contralMean(false)}/>
                </div>
            </MuiThemeProvider>
        )
    }
}

ReactDOM.render(<Body/>, document.getElementById("content"))