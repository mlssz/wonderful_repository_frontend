import React from "react"
import ReactDOM from "react-dom"
import injectTapEventPlugin from "react-tap-event-plugin"
import { HashRouter, Route, IndexRoute} from "react-router-dom"

import App from "./App.jsx"
import HeadMenuListButton from "./HeadMenuListButton.jsx"
import HelpCard from "./Help.jsx"
import WelcomeString from "./Welcome.jsx"
import ChangePasswordCard from "./ChangePassword.jsx"
import {CoursesCard, CourseCard} from "./CoursesCard.jsx"
import {StudentsCard, StudentCard} from "./StudentsCard.jsx"

import {UserLogout} from "./lib/callToBack.js"
import {uriChange, windowSize} from "./lib/pageFun.js"

injectTapEventPlugin()

function logout(){
  UserLogout(()=>{
    uriChange("/")
  })
}

let menuList = [
  {"pkey": "students", "hash": "students"},
  {"pkey": "courses", "hash": "courses"},
  {"pkey": "-"},
  {"pkey": "change password", "hash": "change_password"},
  {"pkey": "logout", "click": logout},
  {"pkey": "-"},
  {"pkey":"Help", "hash": "help"}
]

let window_size = windowSize()

let AccountCardStyle = {
  width: 500,
  height: "100%",
  minHeight: "400px",
  margin: "50px auto"
}

let TableCardStyle = {
  width: 800,
  margin: "50px auto"
}

if(window_size.width <800){
  TableCardStyle.width = "100%"
  TableCardStyle.margin = "10px 0"
  AccountCardStyle.margin = "10px 0"
}else if(window_size.width < 500) {
  AccountCardStyle.width = "100%"
  AccountCardStyle.margin = "10px 0"
}


// a glue fucntion to glue django template and React.
window.ReactInit = function glue() {
  let __App = (props) => <App {...props} title="Student Info System" menuListButton={<HeadMenuListButton itemList={menuList}/>} />
  let __HelpCard = (props) => <HelpCard {...props} style={AccountCardStyle} />
  let __WelcomeString = (props) => <WelcomeString {...props} scale={3} webSiteName="Student Info System" />
  let __ChangePasswordCard = (props) => <ChangePasswordCard {...props} style={AccountCardStyle} />
  let __CoursesCard = (props) => <CoursesCard {...props} style={TableCardStyle}/>
  let __CourseCard = (props) => <CourseCard {...props} style={TableCardStyle}/>
  let __StudentsCard = (props) => <StudentsCard {...props} style={TableCardStyle}/>
  let __StudentCard = (props) => <StudentCard {...props} style={TableCardStyle}/>

  ReactDOM.render(
    <HashRouter>
      <Route path="/"  component={__App} >
        <IndexRoute component={__WelcomeString} />
        <Route path="courses" component={__CoursesCard} />
        <Route path="course/:id" component={__CourseCard} />
        <Route path="students" component={__StudentsCard} />
        <Route path="student/:id" component={__StudentCard} />
        <Route path="change_password" component={__ChangePasswordCard} />
        <Route path="help" component={__HelpCard} />
      </Route>
    </HashRouter>,
    document.getElementById("root"))
}

