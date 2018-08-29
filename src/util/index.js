import functor from './functor.js'
import * as lang from './lang.js'
import * as base from './base.js'
import flatobj from './flatobj.js'
import * as intersection from './intersection.js'
import {parseText} from './parser.js'
import * as parser from './parser.js'
import di from './di.js'
import logger from './logger.js'
import deep from './deep.js'

var util = {
    ...lang,
    ...functor,
    ...base,
    ...parser,
    ...deep,
    ...intersection,
    flatobj,
    di,
    logger
}

export default util
export {
    logger,
    parseText
}