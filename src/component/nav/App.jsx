import React, { Component  } from "react"

import AppBar from "material-ui/AppBar"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import IconButton from "material-ui/IconButton"
import MyTheme from "../selfTheme.js"
import LeftNav from "material-ui/Drawer"
import FlatButton from "material-ui/FlatButton"
import NavigationClose from "material-ui/svg-icons/navigation/close"
import {CardTitle} from "material-ui/Card"

import CreateMenuList ,{HeadMenuListButton} from "./MenuList.jsx"

import {MergeObjects} from "../lib/util.js"
import {CloseWindow, hashChange} from "../lib/pageFun.js"

export class AppLeftNav extends Component {

  constructor(props){
    super(props)
    this.state = {open: false}

    this.buttonStyle = {
      position: "absolute",
      top: 16,
      left: 16,
      border: "1px solid white"
    }

    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle() {this.setState({open: !this.state.open})}

  render() {
    
    let buttonStyle = MergeObjects(MergeObjects({}, this.buttonStyle), this.props.style)

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(this.props.theme)}>
        <div className="body">
          <FlatButton 
              style={buttonStyle}
              label={this.props.label} 
              secondary={true} 
              onTouchTap={this.handleToggle}/>
          <LeftNav
              docked={false}
              width={this.props.navWidth}
              open={this.state.open}
              onRequestChange={open => this.setState({open})}
          >
            <CardTitle title={this.props.title} subtitle={this.props.subtitle}
                       titleColor={this.props.theme.palette.primary1Color} style={{margin:"0 0 10px 0"}}/>
            {CreateMenuList(this.props.menuList, ()=>this.setState({open: false}))}
          </LeftNav>
          {this.props.children}
        </div>
     </MuiThemeProvider>
    )
  }
}
AppLeftNav.propTypes = {
  style: React.PropTypes.object,
  menuList: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  label: React.PropTypes.string,
  theme: React.PropTypes.object,
  navWidth: React.PropTypes.number,
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string
}
AppLeftNav.defaultProps = {
  style: {},
  label: "Menu",
  theme: MyTheme,
  navWidth: 300,
  title: "title",
  subtitle: "subtitle"
}

/* the app bar while a menu list 
 *
 * @prop title String
 * @prop menuList Array<Object> the source which MenuItems created according to
 * @prop theme Object(Material-UI Theme)
 */
export default class App extends Component {
  constructor() {
    super()
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    CloseWindow()
  }

  render() {

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(this.props.theme)}>
        <div className="body" >
          <AppBar title={this.props.title}
            iconElementLeft={<IconButton onTouchTap={this.handleClose} ><NavigationClose /></IconButton>}
            iconElementRight={
              <HeadMenuListButton itemList={this.props.menuList} />
            }
          />
          {this.props.children}
        </div>
     </MuiThemeProvider>
    )
  }
}
App.propTypes = {
  title: React.PropTypes.string,
  menuList: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  theme: React.PropTypes.object
}
App.defaultProps = {
  title: "Title",
  theme: MyTheme
}
