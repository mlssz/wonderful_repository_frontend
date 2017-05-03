import React from "react"
import ReactDOM from "react-dom"
import {
    HashRouter,
    Route
} from 'react-router-dom'

import injectTapEventPlugin from "react-tap-event-plugin"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import Mean from "./component/Mean.jsx"
import HashTable from "./component/HashTable.jsx"
import Login from './component/login/Login.jsx'
import {
    titleMap,
    changeHash
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

    logout() {
        sessionStorage.removeItem('loginState');
        localStorage.removeItem('loginState');
        changeHash('/')
    }

    render() {
        let loginState = localStorage.getItem('loginState') || sessionStorage.getItem('loginState');
        return (
            <MuiThemeProvider>
                {
                    !!loginState?
                    <div>
                        <AppBar
                            title={this.state.title}
                            onLeftIconButtonTouchTap={()=>this.contralMean(true)}
                            iconElementRight={<FlatButton label="退出登录" onTouchTap={this.logout}/>}/>
                        <HashTable/>
                        <Mean visible={this.state.meanVisible} closeMean={()=>this.contralMean(false)}/>
                    </div>
                    : <Login/>
                }
            </MuiThemeProvider>
        )
    }
}

ReactDOM.render(<Body/>, document.getElementById("content"));