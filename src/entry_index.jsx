/* the page manager 
 *
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 09.03.2016
 */
import React from "react"
import ReactDOM from "react-dom"
import injectTapEventPlugin from "react-tap-event-plugin"
 
import PageCard from "./component/card/PageCard.jsx"
import {GeekCardFoot} from "./component/AuthorAbout.jsx"

injectTapEventPlugin()

let headImage = require("./img/Head.jpg")

// a glue fucntion to glue django template and React.
window.ReactInit = function glue() {

  let __PageCard = (props) => (<PageCard {...props}
                          title={"Sign Up!"}
                          subtitle={"2016“龙驰杯”浙江·高校·Hackathon !"}
                          img={headImage}
                          foot={<GeekCardFoot />}/>)

  ReactDOM.render(
    <__PageCard />,
    document.getElementById("root"))
}
