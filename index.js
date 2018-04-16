'use strict'

try { 
  var flatstr = Function('s', 'return %FlattenString(s)')
} catch (e) {
  try { 
    var v8 = require('v' + '8')
    v8.setFlagsFromString('--allow-natives-syntax')
    var flatstr = Function('s', 'return %FlattenString(s)')
    v8.setFlagsFromString('--no-allow-natives-syntax')
  } catch (e) {
    var flatstr = function flatstr(s) {
      Number(s)
      return s
    }
  }
}

module.exports = flatstr