# flatstr

Flattens the underlying C structures of a concatenated JavaScript string

## About

If you're doing lots of string concatenation and then writing that
string somewhere, you may find that passing your string through
`flatstr` vastly improves performance.

## Usage

```js
var flatstr = require('flatstr')
flatstr(someHeavilyConcatenatedString)
```

## Benchmarks

Benchmarks test flat vs non-flat strings being written to
an `fs.WriteStream`.

```
unflattenedManySmallConcats*10000: 204.155ms
flattenedManySmallConcats*10000: 159.666ms
flattenedManySmallConcatsTwice*10000: 163.746ms
flattenedManySmallConcatsTriple*10000: 160.908ms

unflattenedSeveralLargeConcats*10000: 451.027ms
flattenedSeveralLargeConcats*10000: 344.129ms
flattenedSeveralLargeConcatsTwice*10000: 350.910ms
flattenedSeveralLargeConcatsTriple*10000: 341.492ms

unflattenedExponentialSmallConcats*10000: 475.649ms
flattenedExponentialSmallConcats*10000: 190.150ms
flattenedExponentialSmallConcatsTwice*10000: 190.556ms
flattenedExponentialSmallConcatsTriple*10000: 188.864ms

unflattenedExponentialLargeConcats*10000: 4268.143ms
flattenedExponentialLargeConcats*10000: 3121.345ms
flattenedExponentialLargeConcatsTwice*10000: 3109.011ms
flattenedExponentialLargeConcatsTriple*10000: 3128.649ms
```

In each case, flattened strings win,
here's the performance gains from using `flatstr`.

```
ManySmallConcats: 22%
SeveralLargeConcats: 24%
ExponentialSmallConcats: 60%
ExponentialLargeConcats: 29%
```

As shown above, even applying `flatstr` multiple time there're benefits!
In fact comparing the unflattened string with the triple flattened ones the results become:

```
ManySmallConcats: 21%
SeveralLargeConcats: 24%
ExponentialSmallConcats: 60%
ExponentialLargeConcats: 27%

```

## How does it work

In the v8 C++ layer, JavaScript strings can be represented in two ways.

1. As an array
2. As a tree

When JavaScript strings are concatenated, tree structures are used
to represent them. For the concat operation, this is cheaper than
reallocating a larger array. However, performing other operations
on the tree structures can become costly (particularly where lots of
concatenation has occurred).

V8 has a a method called `String::Flatten`which converts the tree into a C array. This method is typically called before operations that walk through the bytes of the string (for instance, when testing against a regular expression). It may also be called if a string is accessed many times over,
as an optimization on the string. However, strings aren't always flattened. One example is when we pass a string into a `WriteStream`, at some point the string will be converted to a buffer, and this may be expensive if the underlying representation is a tree.

`String::Flatten` is not exposed as a JavaScript function, but it can be triggered as a side effect.

There are several ways to indirectly call `String::Flatten` (see `alt-benchmark.js`), 
but coercion to a number appears to be (one of) the cheapest.

However since Node 10 the V8 version has stopped using Flatten in all 
places identified. Thus the code has been updated to seamlessly 
use the native runtime function `%FlattenString` without having to use 
the `--allow-natives-syntax` flag directly. 

One final note: calling flatstr too much can in fact negatively effect performance. For instance, don't call it every time you concat (if that
was performant, v8 wouldn't be using trees in the first place). The best
place to use flatstr is just prior to passing it to an API that eventually
runs non-v8 code (such as `fs.WriteStream`, or perhaps `xhr` or DOM apis in the browser).


## Acknowledgements

* Sponsored by nearForm

## License

MIT
