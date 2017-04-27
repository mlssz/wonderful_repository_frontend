import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import ShowTable from './showTable.js'
import Putaway from '../Putaway.js'

let model = {
	"_id": "dsafdsadsaf32413141kl2",
	"action": 500,
	"status": 0,
	"publish_time": "2017-04-06T04:57:36.801Z",
	"start_time": "2017-04-06T04:57:36.801Z",
	"end_time": "2017-04-06T04:57:36.801Z",
	"remark": "",
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
};

export default class PutAway extends React.Component {

	constructor(props) {
		super(props)
	}

	ensure() {
		alert('入库成功！！！');
		let good = model;
		let goods = (this.props.params.goods);
		let oriGoods = this.props.goods;
		for (let i in goods) {
			let good = model;
			good.action = goods[i].action;
			good.material.id = goods[i].code;
			good.material.location_update_time = (+new Date());
			good.start_time = (+new Date());
			good.publish_time = (+new Date());
			good.end_time = (+new Date());
			good.num = goods[i].num;
			good.material.type = goods[i].type;
			good.material.estimated_export_time = new Date() + 100000;
			good.material.to_repository = goods[i].action == 502 ? -1 : good.material.to_repository;
			good.material.from_repository = Math.floor(Math.random() * 5);
			oriGoods.unshift(good);
		}
		this.props.changePage(Putaway, "入库");
	}

	cancle() {
		this.props.changePage(Putaway, "入库");
	}

	render() {
		return (
			<div>
				<ShowTable goods={this.props.params.goods}/>
				<div style={{display:"flex",justifyContent:"space-around"}}>
				<RaisedButton label="取消" primary={true} onClick={this.cancle.bind(this)}/>
				<RaisedButton label="确认" primary={true} onClick={this.ensure.bind(this)}/>
				</div>
			</div>
		)
	}
}