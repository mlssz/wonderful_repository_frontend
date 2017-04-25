import React from "react"
import ReactDOM from "react-dom"
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {
    Card
} from 'material-ui/Card'

import Mean from "./component/mean.js"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import injectTapEventPlugin from "react-tap-event-plugin"
import Putaway from "./component/Putaway.js"

let goods = [{
    "_id": "dsafdsadsaf32413141kl2",
    "action": 500,
    "status": 1,
    "publish_time": "2017-04-06T04:57:36.801Z",
    "start_time": "2017-04-06T04:57:36.801Z",
    "end_time": "2017-04-06T04:57:36.801Z",
    "remark": "",
    "staff": {
        "name": "因幡帝",
        "account": "inaba_tewi",
        "passwd": "123456",
        "sex": 0,
        "age": 222,
        "permission": 1,
        "signup_time": 1491451593158,
        "last_login_time": 1491451593158
    },
    "material": {
        "id": 1491451593158,
        "type": "tester",
        "description": "wonderful repository",
        "import_time": "2017-04-06T04:57:36.801Z",
        "estimated_export_time": "2017-04-06T04:57:36.801Z",
        "height": 1,
        "width": 1,
        "length": 2,
        "status": 300,
        "from_repository": 2,
        "from_location": 0,
        "from_layer": 0,
        "to_repository": 12,
        "to_location": 1,
        "to_layer": 0,
        "last_migrations": "1234",
        "location_update_time": "2017-04-06T04:57:36.801Z"
    }
}, {
    "_id": "dsafdsadsaf32413141kl2",
    "action": 500,
    "status": 1,
    "publish_time": "2017-04-06T04:57:36.801Z",
    "start_time": "2017-04-06T04:57:36.801Z",
    "end_time": "2017-04-06T04:57:36.801Z",
    "remark": "",
    "staff": {
        "name": "因幡帝",
        "account": "inaba_tewi",
        "passwd": "123456",
        "sex": 0,
        "age": 222,
        "permission": 1,
        "signup_time": 1491451593158,
        "last_login_time": 1491451593158
    },
    "material": {
        "id": 1491451593158,
        "type": "tester",
        "description": "wonderful repository",
        "import_time": "2017-04-06T04:57:36.801Z",
        "estimated_export_time": "2017-04-06T04:57:36.801Z",
        "height": 1,
        "width": 1,
        "length": 2,
        "status": 300,
        "from_repository": 2,
        "from_location": 0,
        "from_layer": 0,
        "to_repository": 12,
        "to_location": 1,
        "to_layer": 0,
        "last_migrations": "1234",
        "location_update_time": "2017-04-06T04:57:36.801Z"
    }
}, {
    "_id": "dsafdsadsaf32413141kl2",
    "action": 501,
    "status": 1,
    "publish_time": "2017-04-06T04:57:36.801Z",
    "start_time": "2017-04-06T04:57:36.801Z",
    "end_time": "2017-04-06T04:57:36.801Z",
    "remark": "",
    "staff": {
        "name": "因幡帝",
        "account": "inaba_tewi",
        "passwd": "123456",
        "sex": 0,
        "age": 222,
        "permission": 1,
        "signup_time": 1491451593158,
        "last_login_time": 1491451593158
    },
    "material": {
        "id": 1491451593158,
        "type": "tester",
        "description": "wonderful repository",
        "import_time": "2017-04-06T04:57:36.801Z",
        "estimated_export_time": "2017-04-06T04:57:36.801Z",
        "height": 1,
        "width": 1,
        "length": 2,
        "status": 300,
        "from_repository": 2,
        "from_location": 0,
        "from_layer": 0,
        "to_repository": 12,
        "to_location": 1,
        "to_layer": 0,
        "last_migrations": "1234",
        "location_update_time": "2017-04-06T04:57:36.801Z"
    }
}, {
    "_id": "dsafdsadsaf32413141kl2",
    "action": 500,
    "status": 1,
    "publish_time": "2017-04-06T04:57:36.801Z",
    "start_time": "2017-04-06T04:57:36.801Z",
    "end_time": "2017-04-06T04:57:36.801Z",
    "remark": "",
    "staff": {
        "name": "因幡帝",
        "account": "inaba_tewi",
        "passwd": "123456",
        "sex": 0,
        "age": 222,
        "permission": 1,
        "signup_time": 1491451593158,
        "last_login_time": 1491451593158
    },
    "material": {
        "id": 1491451593158,
        "type": "tester",
        "description": "wonderful repository",
        "import_time": "2017-04-06T04:57:36.801Z",
        "estimated_export_time": "2017-04-06T04:57:36.801Z",
        "height": 1,
        "width": 1,
        "length": 2,
        "status": 300,
        "from_repository": 2,
        "from_location": 0,
        "from_layer": 0,
        "to_repository": 12,
        "to_location": 1,
        "to_layer": 0,
        "last_migrations": "1234",
        "location_update_time": "2017-04-06T04:57:36.801Z"
    }
}, {
    "_id": "dsafdsadsaf32413141kl2",
    "action": 501,
    "status": 1,
    "publish_time": "2017-04-06T04:57:36.801Z",
    "start_time": "2017-04-06T04:57:36.801Z",
    "end_time": "2017-04-06T04:57:36.801Z",
    "remark": "",
    "staff": {
        "name": "因幡帝",
        "account": "inaba_tewi",
        "passwd": "123456",
        "sex": 0,
        "age": 222,
        "permission": 1,
        "signup_time": 1491451593158,
        "last_login_time": 1491451593158
    },
    "material": {
        "id": 1491451593158,
        "type": "tester",
        "description": "wonderful repository",
        "import_time": "2017-04-06T04:57:36.801Z",
        "estimated_export_time": "2017-04-06T04:57:36.801Z",
        "height": 1,
        "width": 1,
        "length": 2,
        "status": 300,
        "from_repository": 2,
        "from_location": 0,
        "from_layer": 0,
        "to_repository": 12,
        "to_location": 1,
        "to_layer": 0,
        "last_migrations": "1234",
        "location_update_time": "2017-04-06T04:57:36.801Z"
    }
}, {
    "_id": "dsafdsadsaf32413141kl2",
    "action": 500,
    "status": 1,
    "publish_time": "2017-04-06T04:57:36.801Z",
    "start_time": "2017-04-06T04:57:36.801Z",
    "end_time": "2017-04-06T04:57:36.801Z",
    "remark": "",
    "staff": {
        "name": "因幡帝",
        "account": "inaba_tewi",
        "passwd": "123456",
        "sex": 0,
        "age": 222,
        "permission": 1,
        "signup_time": 1491451593158,
        "last_login_time": 1491451593158
    },
    "material": {
        "id": 1491451593158,
        "type": "tester",
        "description": "wonderful repository",
        "import_time": "2017-04-06T04:57:36.801Z",
        "estimated_export_time": "2017-04-06T04:57:36.801Z",
        "height": 1,
        "width": 1,
        "length": 2,
        "status": 300,
        "from_repository": 2,
        "from_location": 0,
        "from_layer": 0,
        "to_repository": 12,
        "to_location": 1,
        "to_layer": 0,
        "last_migrations": "1234",
        "location_update_time": "2017-04-06T04:57:36.801Z"
    }
}, {
    "_id": "dsafdsadsaf32413141kl2",
    "action": 502,
    "status": 1,
    "publish_time": "2017-04-06T04:57:36.801Z",
    "start_time": "2017-04-06T04:57:36.801Z",
    "end_time": "2017-04-06T04:57:36.801Z",
    "remark": "",
    "staff": {
        "name": "因幡帝",
        "account": "inaba_tewi",
        "passwd": "123456",
        "sex": 0,
        "age": 222,
        "permission": 1,
        "signup_time": 1491451593158,
        "last_login_time": 1491451593158
    },
    "material": {
        "id": 1491451593158,
        "type": "tester",
        "description": "wonderful repository",
        "import_time": "2017-04-06T04:57:36.801Z",
        "estimated_export_time": "2017-04-06T04:57:36.801Z",
        "height": 1,
        "width": 1,
        "length": 2,
        "status": 300,
        "from_repository": 2,
        "from_location": 0,
        "from_layer": 0,
        "to_repository": 12,
        "to_location": 1,
        "to_layer": 0,
        "last_migrations": "1234",
        "location_update_time": "2017-04-06T04:57:36.801Z"
    }
}];

injectTapEventPlugin()

let bodyStyle = {
    maxWidth: 1300,
    margin: "30px auto",
    padding: 24
}

class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            page: Putaway,
            title: "入库",
            params: {},
            goods: goods,
        }
        this.changePage = this.changePage.bind(this)
        this.showMean = this.showMean.bind(this)
    }

    changePage(page, title, params) {
        this.setState({
            page,
            title,
            params,
            open: false,
        })
    }

    changeGoods(goods) {
        this.setState({
            goods
        })
    }

    showMean() {
        this.setState({
            open: true
        })
    }

    render() {
        let Page = this.state.page;
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title={<span>{this.state.title}</span>} onLeftIconButtonTouchTap={this.showMean}/>
                    <Drawer
                        docked={false}
                        width={200}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}
                    >
                        <Mean changePage={this.changePage} changeShowCard={this.changeShowCard}/>
                    </Drawer>
                    <Card style={bodyStyle}><Page goods={this.state.goods} changePage={this.changePage} params={this.state.params}/></Card>
                </div>
            </MuiThemeProvider>
        )
    }

}

ReactDOM.render(<Body/>, document.getElementById("content"))