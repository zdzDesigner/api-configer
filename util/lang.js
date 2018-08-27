import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'
import isBoolean from 'lodash/isBoolean'
import isUndefined from 'lodash/isUndefined'
import isNil from 'lodash/isNil'



const isType = (type, obj) => Object.prototype.toString.call(obj) == `[object ${type}]`
const isObject = (val)=> isType('Object', val)
const isFunction = (val)=> isType('Function', val)


/**
 * [CTS 获取类型字符]
 * @param {[type]} constructor [Class]
 * String => 'String'
 * Number => 'Number'
 * ...Class => 'Class'
 * OR Function.name
 */
function CTS(constructor){
    constructor = constructor || ''
    return ['Number', 'String', 'Boolean', 
            'Object', 'Array'].filter((type)=>{
        return ~ constructor.toString().indexOf(type)    
    })[0]
}





export {
    isUndefined,
    isType,
    isObject,
    isFunction,
    isNil,
    CTS
}
