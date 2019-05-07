var bench = require('fastbench')
var stream = require('fs').createWriteStream('/dev/null')
var flatstr = require('./')
var largeStr = JSON.stringify(require('./package.json'))
largeStr += largeStr
largeStr += largeStr

var run = bench([
  function unflattenedManySmallConcats(cb) {
    stream.write(makeStr('a', 200))
    setImmediate(cb)
  },
  function flattenedManySmallConcats(cb) {
    stream.write(flatstr(makeStr('a', 200)))
    setImmediate(cb)
  },
  function flattenedManySmallConcatsTwice(cb) {
    stream.write(flatstr(flatstr(makeStr('a', 200))))
    setImmediate(cb)
  },
  function flattenedManySmallConcatsTriple(cb) {
    stream.write(flatstr(flatstr(flatstr(makeStr('a', 200)))))
    setImmediate(cb)
  },
  function unflattenedSeveralLargeConcats(cb) {
    stream.write(makeStr(largeStr, 10))
    setImmediate(cb)
  },
  function flattenedSeveralLargeConcats(cb) {
    stream.write(flatstr(makeStr(largeStr, 10)))
    setImmediate(cb)
  },
  function flattenedSeveralLargeConcatsTwice(cb) {
    stream.write(flatstr(flatstr(makeStr(largeStr, 10))))
    setImmediate(cb)
  },
  function flattenedSeveralLargeConcatsTriple(cb) {
    stream.write(flatstr(flatstr(flatstr(makeStr(largeStr, 10)))))
    setImmediate(cb)
  },
  function unflattenedExponentialSmallConcats(cb) {
    stream.write(makeExpoStr('a', 12))
    setImmediate(cb)
  },
  function flattenedExponentialSmallConcats(cb) {
    stream.write(flatstr(makeExpoStr('a', 12)))
    setImmediate(cb)
  },
  function flattenedExponentialSmallConcatsTwice(cb) {
    stream.write(flatstr(flatstr(makeExpoStr('a', 12))))
    setImmediate(cb)
  },
  function flattenedExponentialSmallConcatsTriple(cb) {
    stream.write(flatstr(flatstr(flatstr(makeExpoStr('a', 12)))))
    setImmediate(cb)
  },
  function unflattenedExponentialLargeConcats(cb) {
    stream.write(makeExpoStr(largeStr, 7))
    setImmediate(cb)
  },
  function flattenedExponentialLargeConcats(cb) {
    stream.write(flatstr(makeExpoStr(largeStr, 7)))
    setImmediate(cb)
  },
  function flattenedExponentialLargeConcatsTwice(cb) {
    stream.write(flatstr(flatstr(makeExpoStr(largeStr, 7))))
    setImmediate(cb)
  },
  function flattenedExponentialLargeConcatsTriple(cb) {
    stream.write(flatstr(flatstr(flatstr(makeExpoStr(largeStr, 7)))))
    setImmediate(cb)
  }
], 10000)

run(run)


function makeStr(str, concats) {
  var s = ''
  while (concats--) {
    s += str
  }
  return s
}

function makeExpoStr(str, concats) {
  var s = str
  while (concats--) {
    s += s
  }
  return s
}
