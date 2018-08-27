import logger from './logger.js'
import { isUndefined } from './lang.js'

function parseURL(url){
  let parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9._\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
  let result = parse_url.exec(url)
  return ['url', 'scheme', 'slash','host', 
          'port', 'path', 'query', 'hash']
         .reduce((obj, field, index)=>{
            let ret = result[index]
            if ('path' == field) {
              ret = ret ? ('/' + ret):''
            }
            obj[field] = ret
            return obj
         },{})
}


/**
 * [parseText 编译标示符]
 * @param  {[type]} rawURL [/talkinggenius/?page={page}&size={size}&templateId={templateId:}]
 * @param  {[type]} obj    [{page:10,size:20}]
 * @return {[type]}        [/talkinggenius/?page=10&size=20]
 */
function parseText(rawURL,obj){
    let url = compilerText(rawURL,obj)
    let ourl= parseURL(url)
    // console.log(ourl.host,ourl.path,validURLQuery(ourl.query))
    let urlArr = [ourl.host,ourl.path]
    let query = validURLQuery(ourl.query)
    if(query) urlArr = urlArr.concat(['?',validURLQuery(ourl.query)])

    return urlArr.join('')

}

/**
 * [compiler 编译文本]
 * @param  {[type]} text [v1classes{userid}audio-upload]
 * @param  {[type]} obj  [{userid:aaa}]
 * @return {[type]}      [v1classesaaaaudio-upload]
 */
function compilerText(raw, obj){
  
    obj = obj || {}
    let ripe = raw.replace(/(\{.*?\})/g,function(...arg){
        let key = arg[0].replace(/[\{|\}]/g,'').trim(),
            pair, defaulter , val
        
        pair = key.split(':') 
        key = pair[0]
        defaulter = pair[1]
        val = obj[key]
        val =  !isUndefined(val) ? val : defaulter

        if(isUndefined(val)) {
          logger('error',`在${raw}中,参数${key}未赋值`)
        }

        // if(isUndefined(val)) {
        //   val = isUndefined(defaulter) ? `{${keyArr[0]}}` : defaulter
        // }
        
        return val
    })
    return ripe
}

/**
 * [validURLQuery 有效 url query]
 * @param  {[type]} query [url]
 * @return {[type]}       [valid query]
 */
function validURLQuery(query){
  return query && query.split('&').filter((item)=>{
    let arr = item.split('=')
    if(arr[1]) return true
  }).join('&')
}


let compilerURL = parseText

export  {
  parseURL,
  compilerText,
  validURLQuery,
  parseText,
  compilerURL
}