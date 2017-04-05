/* This file define functions which check inputed text
 *
 * Usage:
 *  import {Check_username} from './inputCheck.js'
 *	 
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 05.01.2016
 */


/* Function to check username 
 *
 * @param username String
 * 
 * @return check_result String  {'isValid': 0/1, 'error': String}
 */
export function Check_username(username){
  let result = {'isValid': 1}
  let item_re = /^[a-zA-Z][a-zA-Z0-9_]*$/

  if(username.length < 4){
    result['isValid'] = 0
    result['error'] = 'Your username length should be bigger than 4!'
  }else if(! item_re.test(username)){
    result['isValid'] = 0
    result['error'] = 'Only alphabet, number and \'_\' is valid! And number shouldn\'t be the first character'
  }

  return result
}

export function Check_password(password){
  let result = {'isValid': 1}

  if(password.length < 6){
    result['isValid'] = 0
    result['error'] = 'Your password length should be bigger than 6!'
  }

  return result
}
