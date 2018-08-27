import { isObject } from './lang.js'

export default function (data,callback){
    function loop(data, keys, key){
        var once = true
        key && keys.push(key)
        Object.keys(data).forEach(function(item){

            if(isObject(data[item])){
                loop(data[item],keys,item)    
                keys.pop()
            }else{
                if(once){
                    // console.log(keys,data)
                    callback(keys,data)
                    once = false
                }
            }

        })    
    }
    loop(data,[])
    
}