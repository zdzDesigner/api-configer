import { isObject } from './lang.js'


/**
 * [deep json递归器]
 * @param  {[type]}   val [description]
 * @param  {Function} cb  [description]
 * @return {[type]}       [description]
 */
function deep(val, cb){
    if(Array.isArray(val)){
        return val.map((item)=>deep(item, cb))
    }else if(isObject(val)){
        return Object.keys(val)
                .reduce((pend, key)=>{
                    pend[key] = deep(val[key], cb)
                    return pend
                },{})
    }else{
        return cb(val)
    }
}

export default {
    deep
}