import convert,{ axios } from './convert.js'


const decorator = function (api, options){

    // console.log(api)
    let ret = Object.keys(api).reduce(function(pend,key){
        // console.log(api[key])
        pend[key] = convert(api[key], options)

        return pend

    },{})
    // console.log(ret)
    return ret
}

export default decorator
export { axios }