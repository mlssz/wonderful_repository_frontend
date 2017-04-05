import React, { Component  } from "react"

export default class WelcomeString extends Component {
  
  constructor(props){
    super(props)
    this.textStyle={
      textAlign: "center",
      fontWeight: 600,
      fontSize: 12,
      color: "#dcdcdc",
      textShadow: "1px 1px 0 #eee"
    }
  }

  render() {
    this.textStyle["fontSize"] = this.textStyle["fontSize"] * this.props.scale

    return (
      <div style={{margin: "200px auto"}}>
        <p style={this.textStyle}>Welcome To {this.props.webSiteName}</p>
      </div>
    )
  }
}
WelcomeString.propTypes = {
  scale: React.PropTypes.number,
  webSiteName: React.PropTypes.string
}
WelcomeString.defaultProps = {
  scale: 1,
  webSiteName: "my site"
}
