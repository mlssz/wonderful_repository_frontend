 /* This is a powerful page card, it may be the frame of a page
  *
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 09.03.2016
 */
import React, { Component } from "react"
 
import {amberA400, pink500} from "material-ui/styles/colors"
import FlatButton from "material-ui/FlatButton"

import {BasicCard} from "./card/CommonCard.jsx"
import TableContainer,{MagicTable} from "./tables/TableContent.jsx"
import {Loading} from "./units/Loading.jsx"
import InfoDialog from "./tool/InfoDialog.jsx"
import {PowerA} from "./units/PowerNative.jsx"
import BetweenButtons from "./buttons/BetweenButtons.jsx"
import {RegCtlTextField} from "./textfield/InputContrlTextField.jsx"

import {hashChange} from "./lib/pageFun.js"
import {MergeObjects, ObjectSimpleCompare} from "./lib/util.js"
import {GetWithParams, DeleteParticipators, SendEmail} from "./lib/callToBack.js"

/* this dialog to send email
 *
 * @prop handleSend Function(err, body) sending email callback function
 */
class SendDialog extends Component {

  constructor(props){
    super(props)

    this._send = {
      Open: () => console.log("send Dialog")
    }

    this.bodyStyle = {
      overflowY: "scroll",
      overflowX: "hidden"
    }

    this.content ={
      value: "",
      isValid: false
    }
    this.datas = []
    this.Open = this.Open.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.callbacks = this.callbacks.bind(this)
  }

  Open(selected, datas){
    if(selected.length === 0){
      this.props.afterSend("No participator selected!")
      return
    }

    this.datas = selected.map((i) => {
      return datas[i]
    })

    let users = this.datas.map((data) => {
      return (
        <p style={{textIndent: "4em"}}>{data.name + "(" + data.email + ")"}</p>)
    })

    let InfoString = (
      <div >
        <p style={{color: amberA400, fontWeight: 900, margin:"0"}}>
          {"Please input the main content of email: "}</p>
        <RegCtlTextField 
          fullWidth={true}
          multiLine={true}
          rows={4}
          rowsMax={10}
          hintText="email main content..."
          floatingLabelText="Context"
          errString="You should input one world at least."
          reg={/^[ \t\s]*\S[\s\S]*[ \t\s]*$/} 
          {...this.callbacks()}
        />
               
        <p style={{color: amberA400, fontWeight: 900, margin:"25px 0 0 0"}}>
          {"Would you want to send email to: "}</p>
        {users}

      </div>
    )

    this._send.Open( "Send Email", InfoString)
  }

  callbacks(){
    return {
      "callback": (value) => {
        this.content = {
          "isValid": true,
          "value": value
        }
      },
      "errCallback": () => {
        this.content = {
          "isValid": false,
          "value": ""
        }
      }
    }  
  }

  handleClick(){
    if(!this.content.isValid){
      return 
    }

    let emails = this.datas.map((data) => {
      return data.email
    })

    this.props.beforeSend()
    SendEmail(emails,this.content.value, this.props.afterSend)
    this.datas = []
    this._send.Close()
  }

  render() {

    return (
      <InfoDialog bodyStyle={this.bodyStyle} ref={(c)=>{this._send = c}} anotherButton={
        <FlatButton label="Send" secondary={true} onTouchTap={this.handleClick}/>}
      />
    )
  }
}
SendDialog.propTypes = {
  style: React.PropTypes.object,
  beforeSend: React.PropTypes.func.isRequired,
  afterSend: React.PropTypes.func.isRequired
}
SendDialog.defaultProps = {
  style: {}
}

/* this dialog to check delete
 *
 * @prop handleDelete Function(err, body) the delete callback function
 */
class DeleteDialog extends Component {

  constructor(props){
    super(props)

    this._delete = {
      Open: () => console.log("delete Dialog")
    }

    this.datas = []
    this.Open = this.Open.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  Open(selected, datas){
    if(selected.length === 0){
      this.props.afterDelete("No participator selected!")
      return
    }

    this.datas = selected.map((i) => {
      return datas[i]
    })

    let users = this.datas.map((data) => {
      return (
        <p style={{textIndent: "4em"}}>{data.name + "(" + data.email + ")"}</p>)
    })

    let InfoString = (
      <div >
        <p style={{color: pink500, fontWeight: 900}}>{"Would you want to delete: "}</p>
        {users}
      </div>
    )

    this._delete.Open( "Delete", InfoString)
  }

  handleClick(){
    let emails = this.datas.map((data) => {
      return data.email
    })

    this.props.beforeDelete()
    DeleteParticipators(emails, this.props.afterDelete)
    this.datas = []
    this._delete.Close()
  }

  render() {

    return (
      <InfoDialog ref={(c)=>{this._delete = c}} anotherButton={
        <FlatButton label="Delete" secondary={true} onTouchTap={this.handleClick}/>}
      />
    )
  }
}
DeleteDialog.propTypes = {
  style: React.PropTypes.object,
  beforeDelete: React.PropTypes.func.isRequired,
  afterDelete: React.PropTypes.func.isRequired
}
DeleteDialog.defaultProps = {
  style: {}
}

export default class Participators extends Component {

  constructor(props){
    super(props)
    this.state = {
      table: {
        pages: 0,
        page: -1,
        items: [ ],
        items_num: 0
      },
      isLoading: true, 
    }

    this.callUrl =  "/api/participators/"
    this._dialog = {}
    this._delete = {}
    this._send = {}
    this.selected = []

    this.componentDidMount = this.componentDidMount.bind(this)
    this.handlePrewClick = this.handlePrewClick.bind(this)
    this.handleNextClick = this.handleNextClick.bind(this)
    this.getParticipators = this.getParticipators.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this)
    this.handleRowSelection = this.handleRowSelection.bind(this)
    this.handleFunctionButtonClick = this.handleFunctionButtonClick.bind(this)
  }


  getParticipators(items, page, type){
    this.setState({
      isLoading: true
    })
    GetWithParams(this.callUrl, {"items":items, "page":page,"type":type},(err, data)=> {
      this.setState({
        isLoading: false
      })

      if(err){
        this._dialog.Open("Error", err.toString())
        return 
      }

      if(data["status"] === 1){
        this._dialog.Open("Error", data["message"])
      }else{
        //this.setState({
          //table: {
            //pages: data["message"].pages,
            //page: data["message"].page,
            //items: data["message"].items,
            //items_num: data["message"].items_num
          //}})
        this.state.table = {
            pages: data["message"].pages,
            page: data["message"].page,
            items: data["message"].items,
            items_num: data["message"].items_num
          }
        this.forceUpdate()
      }
    })
  }


  //while the father of this component change state
  //this components style while change(the reference change),
  //so we should judge has the style been changed
  shouldComponentUpdate(nextProps, nextState){    
    if(
      this.state.table.page === nextState.table.page &&
      this.state.isLoading === nextState.isLoading &&
      this.props.onRowClick === nextProps.onRowClick &&
      ObjectSimpleCompare(this.props.style, nextProps.style)
    ){
      return false
    }else{
      return true
    }
  }

  handleFunctionButtonClick(buttonName){
    let handleDeleteOk = () => {
      this.getParticipators(10, this.state.table.page, 2)
    }
    let handleSendMailOk = () => {
      this._dialog.Open("OK", "Send Email Successfully!")
    }

    let handleOk = buttonName === "Delete" ? handleDeleteOk : handleSendMailOk

    return (err, body) => {
      this.setState({isLoading: false})
      this.selected = []
      if(err){
        this._dialog.Open("Error", err.toString())
        return 
      }

      if(body["status"] === 1){
        this._dialog.Open("Error", body["message"])
      }else{
        handleOk()
      }
    }
  }

  componentDidMount(){
    this.getParticipators(10, 0, 2)
  }

  handlePrewClick(){
    this.getParticipators(10, this.state.table.page-1, 2)
  }
  handleNextClick(){
    this.getParticipators(10, this.state.table.page+1, 2)
  }

  handleRowClick(data){
    this.props.onRowClick(data)
  }
  handleRowSelection(data){
    this.selected = []

    if(data === "all"){
      for(let i=0;i<this.state.table.items_num;i++) this.selected.push(i);
    }else if(data !== "none"){
      this.selected = data
    }

    console.log(this.selected)
  }

  
  render() {

    let table = this.state.table
    let BCstyle = {
      margin: "150px auto" ,
      width: "600px",
      background: "white"
    }

    let loading = (
      <Loading style={{
        height: 778,
      }} size={2}/>
    )

    let magicTableContainer = (
          <MagicTable 
           tableHeader={"all participters"} 
           tableFooter={"Page "+(table.page+1)+"/"+table.pages}
           height={500}
           rowColumns={["name","email"]}
           headColumns={["Name", "Email"]}
           datas={table.items}
           selectable={!this.state.isLoading}
           showRowHover={true}
           multiSelectable={true}
           enableSelectAll={true}
           deselectOnClickaway={false}
           onRowClick={this.handleRowClick}
           onRowSelection={this.handleRowSelection}
         />
    )

    let buttons = [
      {"label": "Delete", 
        "onTouchTap": () => this._delete.Open(this.selected, table.items),
        "disabled": this.state.isLoading ,
        "type": 1, "btype": 1}, 
      {"label": "Send Email", 
        "onTouchTap": () => this._send.Open(this.selected, table.items),
        "disabled": this.state.isLoading ,
        "type": 2, "btype": 1}, 
    ]

    let child = this.state.isLoading ?  loading : magicTableContainer

    BCstyle = MergeObjects(MergeObjects({}, BCstyle), this.props.style)

    return (
        <BasicCard title={"Participators"} subtitle={"so many lovely participters."} style={BCstyle} >
          <InfoDialog ref={(c)=>{this._dialog = c}} />
          <DeleteDialog ref={(c)=>{this._delete = c}} 
            afterDelete={this.handleFunctionButtonClick("Delete")} 
            beforeDelete={() => this.setState({isLoading: true})}/>
          <SendDialog ref={(c)=>{this._send = c}} 
            afterSend={this.handleFunctionButtonClick("Email")} 
            beforeSend={() => this.setState({isLoading: true})}/>
          <BetweenButtons buttons={buttons} style={{padding: "0 16px 0 0", margin: "0 0 0 350px"}}/>
          <TableContainer 
            page={table.page} 
            all_pages={table.pages} 
            buttonsClick={[this.handlePrewClick, this.handleNextClick]}
            disabled={this.state.isLoading}
            >
          {child}
          </TableContainer>
        </BasicCard>
    )
  }
}
Participators.propTypes = {
  style: React.PropTypes.object,
  onRowClick: React.PropTypes.func
}
Participators.defaultProps = {
  style: {},
  onRowClick: console.log
}
