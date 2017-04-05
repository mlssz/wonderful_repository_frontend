/* the  error 
 *
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 09.03.2016
 */
import React from "react"
import ReactDOM from "react-dom"
import { HashRouter, Route, IndexRoute} from "react-router-dom"
 
import {pink500} from "material-ui/styles/colors"
import PageCard from "./component/card/PageCard.jsx"
import PlaneString from  "./component/units/PlaneString.jsx"

import {GeekCardFoot} from "./component/AuthorAbout.jsx"

let headImage = require("./img/Head.jpg")

// a glue fucntion to glue django template and React.
window.ReactInit = function glue(params) {

  let __PageCard = (props) => (<PageCard {...props}
                          title={"Error"}
                          subtitle={params.string}
                          img={headImage}
                          foot={<GeekCardFoot />}/>)
  let __PlaneString = (props) => (<PlaneString {...props}
                          strings={[params.message]}
                          textStyle={{
                            color: pink500,
                            textShadow: "1px 1px 0 #eee"
                          }}
                          scale={2.5}/>)

  ReactDOM.render(
    <HashRouter>
      <Route path="/"  component={__PageCard} >
        <IndexRoute component={__PlaneString} />
      </Route>
    </HashRouter>,
    document.getElementById("root"))
}
