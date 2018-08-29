var isPro;
try{
    isPro = APP_ENV == 'pro'
}catch(err){
    isPro = false
}
function logger(condition, format, a, b, c, d, e, f) {
    if(isPro) return
    var args = [a, b, c, d, e, f]
    var argIndex = 0
    var msg = format.replace(/%s/g, ()=>args[argIndex++])

    if(condition == 'error') throw new Error(msg)   
    if(condition == 'log') console[condition](msg)
    // if(condition == 'frame') console['log'](msg)

}


export default logger

