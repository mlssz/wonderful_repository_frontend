import React from "react"
import ReactDOM from "react-dom"
import Mean from "./component/mean.js"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import injectTapEventPlugin from "react-tap-event-plugin"
import Putaway from "./component/Putaway.js"

injectTapEventPlugin()

let bodyStyle = {
  display: "flex",
  padding: 0,
  margin: 0,
  minHeight: "100%",
}
let leftStyle = {
  display: "inline-block",
  width: "200px",
  backgroundColor: "#EAEAEA",
  height: "100%",
}
let headStyle = {
  padding: 5,
  backgroundColor: "#EAEAEA",
  height: "20px",
  textAlign: "center",
  fontSize: "20px",
  lineHeight: "20px",
}
let rightStyle = {
  flex: 1,
}

class Body extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			page: <Putaway/>,
			title: "入库",
		}
		this.changePage = this.changePage.bind(this)
	}

	changePage(page, title) {
		this.setState({
			page,
			title
		})
	}

	render() {
		return (
      <MuiThemeProvider>
        <div className="body" style={bodyStyle}>
          <div style={leftStyle}>
            <div style={headStyle}>WonderFul</div>
            <Mean changePage={this.changePage}/>
          </div>
          <div style={rightStyle}>
            <div style={headStyle}>{this.state.title}</div>
            {this.state.page}
          </div>
        </div>
      </MuiThemeProvider>
    )
	}

}

ReactDOM.render(<Body/>, document.getElementById("content"))
