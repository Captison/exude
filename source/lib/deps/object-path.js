import op from 'object-path'
import { del, insert, set } from 'object-path-immutable'


export default
{
    // general
    get: (...args) => op.get(...args),
    has: (...args) => op.has(...args),
    // mutables
    del: (...args) => op.del(...args),
    ins: (...args) => op.insert(...args),
    set: (...args) => op.set(...args),
    // immutables
    delim: (...args) => del(...args),
    insim: (...args) => insert(...args),
    setim: (...args) => set(...args)
}
