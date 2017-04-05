/* This file defines functions about ajax call to back end
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 05.01.2016
 */
import {FilterKeyMerge} from './util.js'

let request = require('superagent')

/* a simple get cookief function
 *
 * @param name String
 *
 * @return cookieValue String
 */
export function getCookie(name) {
    let cookieValue = null;

    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

/* root login function 
 * 
 * @param password String 
 * @callback Func(err, data)
 *
 */
export function RootLogin(password, callback){

  request
    .post('/api/login/')
    .send({'username': 'root', 'password': password })
    .set('Accept', 'application/json')
    .end((err, res) => {
      callback(err, res.body)
    })
}

/* login function 
 * 
 * @param username String
 * @param password String 
 * @callback Func(err, data)
 *
 */
export function UserLogin(username, password, callback){
  let csrftoken = getCookie('csrftoken')

  request
    .post('/api/login/')
    .send({ 'username': username, 'password': password })
    .set('X-CSRFToken',csrftoken)
    .set('Accept', 'application/json')
    .end((err, res) => {
      callback(err, res.body)
    })
}

/* sign up function 
 *
 * @param username String
 * @param password String
 * @callback Func(err, data)
 *
 */
export function UserSignUp(username, password, callback){
  let csrftoken = getCookie('csrftoken')

  request
    .post('/user/api/signup/')
    .send({ 'username': username, 'password': password })
    .set('X-CSRFToken',csrftoken)
    .set('Accept', 'application/json')
    .end((err, res) => {
      callback(err, res.body)
    })
}

/* logout function
 *
 * @callback Func(err, data)
 */
export function UserLogout(callback){

  request
    .delete('/api/login/')
    .set('Accept', 'application/json')
    .end((err, res) => {
      callback(err, res.body)
    })
}


/* change password function 
 *
 * @param password String new password
 * @callback Func(err, data)
 */
export function UserChangePassword(password, callback){

  request
    .put('/api/root/')
    .send({ 'password': password })
    .set('Accept', 'application/json')
    .end((err, res) => {
      callback(err, res.body)
    })
}

function createQueryFactory(){
  let query_params_num = 0
  let query = '?'

  return (key, value) => {
    if(query_params_num != 0) {
      query += '&' 
    }

    query += key + '=' + value
    query_params_num += 1
    return query
  }
}


/* GET request with querys
 *
 * @param url String the url to request
 * @param querys Object {'page':string, 'items':string, 'type': default 2}
 * @callback Func(err, data)
 */
export function GetWithParams(url,querys,callback){
  let queryFactory = createQueryFactory()
  let queryString = ''

  for(let key in querys){
    queryString = queryFactory(key, querys[key])
  }

  if(queryString.length > 0){
    url += queryString  
  }

  request
    .get(url)
    .set('Accept', 'application/json')
    .end((err, res) => {
      callback(err, res.body)
    })
}

/* post participator info
 *
 * @param data Object participator data
 * @callback Func(err, data)
 */
export function PostParticipator(data,callback){
  let url = '/api/participator/'
  var formData = new FormData();
  
  for(let key in data){
    if(data[key]) formData.append(key, data[key])
  }

  request
    .post(url)
    .send(formData)
    .set('Accept', 'application/json')
    .end((err, res) => {
      callback(err, res.body)
    })
}

/* delete some participators 
 *
 * @param datas Array<String> participators' emails if delete all , datas === all
 * @callback Func(err, data)
 */
export function DeleteParticipators(datas, callback) {
  let url = '/api/participators/'
  
  request
    .delete(url)
    .send({email: datas})
    .set('Accept', 'application/json')
    .end((err, res) => {
      callback(err, res.body)
    })
}

/* send emails to participators 
 *
 * @param emails Array<String> participators' emails 
 * @param content String main content of email
 * @callback Func(err, data)
 */
export function SendEmail(emails, content, callback) {
  let url = '/api/email/participators/'

  request
    .post(url)
    .send({email: emails, content: content})
    .set('Accept', 'application/json')
    .end((err, res) => {
      callback(err, res.body)
    })
  
}


export function GetParticipatorsCSV(callback){
  let url = '/api/participators/download/'

  request
    .get(url)
    .set('Accept', 'application/json')
    .end((err, res) => {
      callback(err, res.body)
    })
}

export function GetSwitch(callback) {
  let url = '/api/switch/signup/'

  request
    .get(url)
    .set('Accept', 'application/json')
    .end( (err, res) => {
      callback(err, res.body)
    })
}


export function PatchSwitch(status, callback) {
  let url = '/api/switch/signup'

  request
    .patch(url)
    .send({'toggle': status})
    .set('Accept', 'application/json')
    .end( (err, res) => {
      callback(err, res.body)
    })
}
