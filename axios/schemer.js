import util from '../../util'

let {isType, isObject, isFunction, 
     CTS, deep, isNil} = util
/**
 * [schemer 验证、重写、输出]
 * @param  {[type]} schema [数据模型]
 * @param  {[type]} real   [api返回数据]
 * @return {[type]}        [void]
 * TDDO::校验schema和真实数据，有差异记录、重写期望值
 *     
 */
export default schemer
export {
    isMatch,
    compiler,
    creater,
    looper,
    schemer
}
/**
 * [schemer 调起looper, 打印日志]
 * @param  {[type]} schema [description]
 * @param  {[type]} real   [description]
 * @param  {[type]} api    ['url']
 * @return {[type]}        [void]
 * 
 */
function schemer(schema, real, api){
    let message = []
    looper(schema, real, null , message)
    if(message.length){
        // console.warn()
        console.group(`接口：${api}`)
        message.forEach((item)=>console.warn(item))
        console.groupEnd();
        
    }
    
}

function looper(schema, real, link, message){
    link = link || []
    Object.keys(schema).forEach(function(key){
        
        var schemaVal= schema[key]
        var realVal= real[key]
        link.push(key)

        if(Array.isArray(schemaVal)){
            let schemaTpl = schemaVal[0]
            !Array.isArray(realVal)    
            && (real[key] = creater(link, message, schemaVal))
            
            schemaTpl && real[key].forEach(function(item,index){
                // console.log({item})
                
                link.push(`&&[${index}]`)
                
                if(isObject(schemaTpl)){
                    looper(schemaTpl, item, link, message)
                }else{
                    real[key][index] = creater(link, message, schemaTpl, item)
                }
                link.pop()
            })
            

        }else if(isObject(schemaVal)){

            !isObject(realVal)
            && (real[key] = creater(link, message, schemaVal))

            looper(schemaVal, real[key], link, message)    
            
        }else{
            real[key] = creater(link, message, schemaVal, realVal)
        }
        link.pop()
    })
}



/**
 * [creater 数据生成器]
 * @param  {[type]} link    [description]
 * @param  {[type]} message [description]
 * @param  {[type]} type    [description]
 * @param  {[type]} val     [description]
 * @return {[type]}         [new-data]
 * TODO::收集不匹配提示
 */
function creater(link, message, schema, val){
    let res
    if(val && isMatch(schema, val)){
        res = val
    }else{
        let schemaType = compiler(schema, false, val)
        let schemaTypeStr = compiler(schema, true)
        
        if(Array.isArray(schema)){
            res = []
        }else if(isObject(schema)){
            res = {}
        }else{
            res = schemaType
        }
        
        let realType = isFunction(val) ? 'undefined': val
        let keyname = link.join('.').replace(/\.&&/g,'')
        let expecter = JSON.stringify(schemaTypeStr)
        let resulter = JSON.stringify(realType)
        let reseter = JSON.stringify(res)
        let msg = `字段 ${keyname} : 期望值 ${expecter}, 返回值 ${resulter} => 重写为：${reseter}`
        
        message.push(msg)
        
        // console.log(JSON.stringify(res))
    }
    return res
}


/**
 * [compiler 简单编译]
 * @param  {[type]} data    [数据源Data]
 * @param  {[type]} toType [转换为类型字符]
 * @return {[type]}        [new 数据Data]
 * 简单类型转换
 */
function compiler(schema, toType, real){
    return deep(schema, function(item){
        let res;
        switch(true){
            case item === Number:
                res = toType ? 'Number': isNaN(real) ? 0: +real
            break;
            case item === String:
                res = toType ? 'String': isNil(real) ? '':`${real}`
            break;
            case item === Boolean:
                res = toType ? 'Boolean':false
            break;
            case !!~['string','number','boolean'].indexOf(typeof real):
                res = real
            break;
            default:
                res = real && real.toString()
            break;
        }
        return res
    })
    
}


/**
 * [isMatch 是否匹配类型]
 * @param  {[Class]} type [构造函数类型]
 * @param  {[string、number、boolean]} val  [属性值]
 * @return {[Boolean]}
 */
function isMatch(type, val){
    return isType(CTS(type), val)
}

