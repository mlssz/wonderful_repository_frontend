import React from "react"
import ReactDOM from "react-dom"
import injectTapEventPlugin from "react-tap-event-plugin"
import IconMenu from "material-ui/IconMenu"
import MenuItem from "material-ui/MenuItem"
import IconButton from "material-ui/IconButton/IconButton"
import FontIcon from "material-ui/FontIcon"

import App from "./component/nav/App.jsx"
import {HeadMenuListButton} from "./component/nav/MenuList.jsx"
import {LenCtlTextField} from "./component/textfield/InputContrlTextField.jsx"

injectTapEventPlugin()

let menuList = [
  {"pkey": "students", "hash": "students"},
  {"pkey": "courses", "hash": "courses"},
  {"pkey": "-"},
  {"pkey": "change password", "hash": "change_password"},
  {"pkey": "-"},
  {"pkey":"Help", "hash": "help"}
]

// a glue fucntion to glue django template and React.
window.ReactInit = function glue() {
  ReactDOM.render(
    <App style={{width: 100}} menuListButton={<HeadMenuListButton itemList={menuList}/>} >
      <LenCtlTextField hintText="Hint Text" floatingLabelText="Floating Label Text" minl={6} maxl={10}
        errString="Length of field text must between 6 and 10!"/>
    </App>, 
                  document.getElementById("root"))
  //ReactDOM.render(<Main />, document.getElementById("container"));
}

