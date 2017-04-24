import React from "react"
import {
    List,
    ListItem
} from "material-ui/List"
import FontIcon from "material-ui/FontIcon"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import SearchPage from "./SearchPage.js"
import Putaway from "./Putaway.js"
import CheckPage from "./checkPage.jsx"

export default class Mean extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            page: <Putaway/>,
            title: "入库",
        }
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
                <List>
                <ListItem
                    primaryText="物资"
                    initiallyOpen={false}
                    primaryTogglesNestedList={true}
                    nestedItems={[
                    <ListItem
                      key={1}
                      primaryText="入库"
                      onClick={()=>this.props.changePage(<Putaway/>,"入库")}
                    />,
                    <ListItem
                      key={2}
                      primaryText="移动"
                    />,
                    <ListItem
                      key={3}
                      primaryText="出库"
                    />,
                    <ListItem
                      key={4}
                      primaryText="异常"
                    />,
                    <ListItem
                      key={5}
                      primaryText="盘点"
                      onClick={()=>this.props.changePage(<CheckPage/>, "盘点")}
                    />,
                    <ListItem
                      key={6}
                      primaryText="信息查询"
                      onClick={()=>this.props.changePage(<SearchPage/>,"信息查询")}
                    />,
                    <ListItem
                      key={7}
                      primaryText="出库统计"
                    />,
                  ]}
                />                
                <ListItem
                    primaryText="人员"
                    initiallyOpen={false}
                    primaryTogglesNestedList={true}
                    nestedItems={[
                    <ListItem
                      key={1}
                      primaryText="管理"
                    />,
                    <ListItem
                      key={2}
                      primaryText="查看任务记录"
                    />
                  ]}
                />
                </List>
            </MuiThemeProvider>
        )
    }
}