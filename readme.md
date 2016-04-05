# flatstr

Flattens the underlying C structures of a concatenated JavaScript string

## About

If you're doing lots of string concatenation and then writing that
string somewhere, you may find that passing your string through 
`flatstr` vastly improves performance. We've used it the fast logger [pino](http://npm.im/pino)'s extreme mode to achieve 60% performance gains (from 250ms down to 100ms per 10000 ops) - the actual gains flatstr itself yields
are 50% (150ms down to 100ms).

## Usage

```js
var flatstr = require('flatstr')
flatstr(someHeavilyConcatenatedString)
```

## Acknowledgements

* Sponsored by nearForm

## License

MIT
