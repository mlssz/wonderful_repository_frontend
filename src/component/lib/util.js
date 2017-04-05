/* This file defines some tools usually used
 *
 * Usage: 
 *	   import {...} from 'util.js'
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 12.03.2016
 */
 
/* filter keys while merge Object
 *
 * @param mergeTo Object  default {}
 * @param mergeFrom Object
 */
export function FilterKeyMerge(mergeTo={} , mergeFrom, filterlist=[]){
  return MergeObjects(mergeTo, mergeFrom, (mf, key) => {
    for(let v of filterlist){
      if(v === key){
        return false
      }
    }

    return true
  })
}

/* merge two objects
 *
 * @param mergeTo Object default {}
 * @param mergeFrom Object 
 * @param judgeFunc Function(mergeFrom, key) default () => true
 */
export function MergeObjects(
  mergeTo={} ,
  mergeFrom, 
  judgeFunc=()=>true ){

  for(let key in mergeFrom) {
    if(judgeFunc(mergeFrom, key)) mergeTo[key] = mergeFrom[key]
  }

  return mergeTo
}


/* only compare the first layer in object
 *
 * @param o1 Object 
 * @param o2 Object
 * o1 o2 should not be undefined
 */
export function ObjectSimpleCompare(o1, o2){
  let result = true

  if(Object.keys(o1).length === Object.keys(o2).length){
    for(let key in o1){
      if(o1[key] !== o2[key]){
        result = false
        break
      }
    }
  }else{
    result = false
  }

  return result
}
