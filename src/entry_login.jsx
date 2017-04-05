/* the page manager 
 *
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 09.03.2016
 */
import React from "react"
import ReactDOM from "react-dom"
import { Route, HashRouter} from "react-router-dom"
import injectTapEventPlugin from "react-tap-event-plugin"
 
import RootLoginBlock from "./component/RootLogin.jsx"

injectTapEventPlugin()

// a glue fucntion to glue django template and React.
window.ReactInit = function glue() {

  let __RootLoginBlock = (props) => <RootLoginBlock {...props} />

  ReactDOM.render(
    <HashRouter>
      <Route path="/"  component={__RootLoginBlock} />
    </HashRouter>,
    document.getElementById("root"))
}
