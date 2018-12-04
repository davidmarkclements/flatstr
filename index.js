'use strict'

if (!process.versions || !process.versions.node || parseInt(process.versions.node.split('.')[0]) >= 8) {
  try { 
    var flatstr = Function('s', 'return typeof s === "string" ? %FlattenString(s) : s')
  } catch (e) {
    try { 
      var v8 = require('v' + '8')
      v8.setFlagsFromString('--allow-natives-syntax')
      var flatstr = Function('s', 'return typeof s === "string" ? %FlattenString(s) : s')
      v8.setFlagsFromString('--no-allow-natives-syntax')
    } catch (e) {
      var flatstr = function flatstr(s) {
        Number(s)
        return s
      }
    }
  }
} else flatstr = function flatstr(s) {
  Number(s)
  return s
}

module.exports = flatstr