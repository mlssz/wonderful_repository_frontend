import React from "react"
import ReactDOM from "react-dom"
import {
    HashRouter,
    Route
} from 'react-router-dom'

import injectTapEventPlugin from "react-tap-event-plugin"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

import Mean from "./component/Mean.jsx"
import HashTable from "./component/HashTable.jsx"
import Login from './component/login/Login.jsx'
import {
    titleMap
} from "./libs/common.js"
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

    componentWillMount() {
        this.setState({
            title: titleMap[window.location.hash]
        })
        window.onhashchange = () => {
            this.setState({
                title: titleMap[window.location.hash] || 'title'
            })
        }
    }

    contralMean(state) {
        this.setState({
            meanVisible: state,
        })
    }

    render() {
        let paperStyle = {
            width: "80%",
            minWidth: 840,
            margin: "20 auto",
        };
        let loginState = localStorage.getItem('loginState') || sessionStorage.getItem('loginState');
        return (
            <MuiThemeProvider>
                {
                    !!loginState?
                    <div>
                        <AppBar
                            title={this.state.title}
                            onLeftIconButtonTouchTap={()=>this.contralMean(true)}/>
                        <Paper style={paperStyle} zDepth={1}>
                            <HashTable/>
                        </Paper>
                        <Mean visible={this.state.meanVisible} closeMean={()=>this.contralMean(false)}/>
                    </div>
                    : <Login/>
                }
            </MuiThemeProvider>
        )
    }
}

ReactDOM.render(<Body/>, document.getElementById("content"));