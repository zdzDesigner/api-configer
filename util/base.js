import Vue from 'vue'


const merge = Vue.util.mergeOptions
const urlTpl = function(){}



/**
 * [mergeMulti description]
 * mergeMulti({},{name:'zdz'},{age:33})
 */
function mergeMulti(data,...args){
    data = data ||{}
    return args.reduce(function(pending,item){
        return merge(pending,item)
    },data)
}

/**
 * [hasCnStr 是否存在中文字符串]
 * @param  {[String]} text  [这是一个测试字符串，just a test。]
 * @return {[Boolean]}      [true]
 */
function hasCnStr (text) {
  const cn_pattern = new RegExp("[\u4E00-\u9FA5]+")
  return cn_pattern.test(text)
}

/**
 * [textTruncate 按最大长度截断文字]
 * @param  {[String]} text   [这是一个测试字符串，just a test。]
 * @param  {[Number]} maxlen [3]
 * @return {[Stirng]}       []
 */
function textTruncate (text, maxlen){
  if (text && text.length > maxlen) {
    return text.substring(0, maxlen) + '...'
  } else {
    return text || ''
  }
}





export {
    merge,
    mergeMulti,
    hasCnStr,
    textTruncate,
    urlTpl
}