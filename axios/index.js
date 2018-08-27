import convert,{ axios } from './convert.js'


const decorator = function (api){

    // console.log(api)
    let ret = Object.keys(api).reduce(function(pend,key){
        // console.log(api[key])
        pend[key] = convert(api[key])

        return pend

    },{})
    // console.log(ret)
    return ret
}

export default decorator
export { axios }