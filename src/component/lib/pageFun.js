/* This file defined Some function to change url hash
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 04.01.2016
 */


export function CloseWindow() {
  if(navigator.userAgent.indexOf('Firefox') > 0 || 
     navigator.userAgent.indexOf('Chrome') > 0) {
    window.location.href = 'about:blank'
  }else{
    window.close()
  }
}

export function hashChange(hash) {
  window.location.hash = hash
}

export function uriChange(new_uri){
  let host = window.location.host
  let protocol = window.location.protocol
  let new_location = protocol + "//" + host + new_uri

  window.location = new_location
}

/* a function to get the width of window and the height of window
 *
 * @return window_size {'height': number, 'width': number}
 */
export function windowSize(){
  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

/* listen window size change 
 *
 * @callback Func(window_size)
 */
export function onWindowResize(callback){
  window.addEventListener('resize', () => { 
    callback(windowSize())
  })

  callback(windowSize())
}


/* a function to get params from a url string
 *
 * @param origin_search_string String "?aaa=bbb&ccc=ddd"
 *
 * @return result {'aaa':'bbb', 'ccc'='ddd'}
 */
export function parseParams(origin_search_string){
  let result = {}

  if(origin_search_string.length < 4 ||
     origin_search_string.indexOf('=') === -1){
       return result
  }

  let search_array = origin_search_string.slice(1).split('&')
  let search_dict = search_array.forEach((elf) => {
    let eq_index = elf.indexOf('=')

    result[elf.slice(0,eq_index)] = elf.slice(eq_index+1)
  })

  return result 
}
