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
import Move from './Move.js'
import GoodsInf from './GoodsInf.jsx'

export default class Mean extends React.Component {

  constructor(props) {
    super(props)
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
                      onClick={()=>this.props.changePage(Putaway,"入库")}
                    />,
                    <ListItem
                      key={2}
                      primaryText="移动"
                      onClick={()=>this.props.changePage(Move,"移动",{type:0})}
                    />,
                    <ListItem
                      key={3}
                      primaryText="出库"
                      onClick={()=>this.props.changePage(Move,"出库",{type:1})}
                    />,
                    <ListItem
                      key={4}
                      primaryText="异常"
                    />,
                    <ListItem
                      key={5}
                      primaryText="盘点"
                      onClick={()=>this.props.changePage(CheckPage, "盘点")}
                    />,
                    <ListItem
                      key={6}
                      primaryText="任务查询"
                      onClick={()=>this.props.changePage(SearchPage,"任务查询")}
                    />,
                    <ListItem
                      key={7}
                      primaryText="物品查询"
                      onClick={()=>this.props.changePage(GoodsInf,"物品查询")}
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