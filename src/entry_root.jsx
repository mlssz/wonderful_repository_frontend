/* the page manager 
 *
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 09.03.2016
 */
import React from "react"
import ReactDOM from "react-dom"
import { HashRouter, Route, IndexRoute } from "react-router-dom"
import injectTapEventPlugin from "react-tap-event-plugin"
 
import GhostTheme from "./component/ghostTheme.js"
import App, {AppLeftNav} from "./component/nav/App.jsx"
import ChangePasswordCard from "./component/ChangePassword.jsx"
import GhostPageFrame,{ControlPageFrame} from "./component/GhostPageFrame.jsx"
import {SendAllCard} from "./component/TipCard.jsx"

import {UserLogout} from "./component/lib/callToBack.js"
import {uriChange,windowSize} from "./component/lib/pageFun.js"

injectTapEventPlugin()

function logout(){
  UserLogout(()=>{
    uriChange("/")
  })
}

let menuList = [
  {"pkey": "Participators", "hash": "participators"},
  {"pkey":"Send Email All", "hash": "sendall"},
  {"pkey":"Control", "hash": "control"},
  {"pkey": "-"},
  {"pkey": "Change Password", "hash": "change_password"},
  {"pkey": "Logout", "click": logout},
  {"pkey": "-"}
]

let wsize = windowSize()

// a glue fucntion to glue django template and React.
window.ReactInit = function glue() {

  let __App = (props) => (<AppLeftNav {...props} title={"SignUp Sys"} subtitle={"ghost page"}
                          menuList={menuList}
                          theme={GhostTheme}/>)
  let __ChangePasswordCard = (props) => <ChangePasswordCard {...props}/>
  let __GhostPageFrame = (props) => <GhostPageFrame {...props} windowSize={wsize} />
  let __ControlPageFrame = (props) => <ControlPageFrame {...props} />
  let __SendAllCard = (props) => <SendAllCard {...props} />

  ReactDOM.render(
    <HashRouter >
      <Route path="/"  component={__App} >
        <IndexRoute component={__GhostPageFrame} />
        <Route path="participators" component={__GhostPageFrame} />
        <Route path="change_password" component={__ChangePasswordCard} />
        <Route path="control" component={__ControlPageFrame} />
        <Route path="sendall" component={__SendAllCard} />
      </Route>
    </HashRouter>,
    document.getElementById("root"))
}
