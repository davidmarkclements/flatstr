# flatstr

Flattens the underlying C structures of a concatenated JavaScript string

## About

If you're doing lots of string concatanation and then writing that
string somewhere, you may find that passing your string through 
`flatstr` vastly improves performance. We've used it the fast logger [pino](http://npm.im/pino)'s extreme mode go achieve 60% performance gains (from 250ms down to 100ms per 10000 ops). 

## Usage

```js
var flatstr = require('flatstr')
flatstr(someHeavilyConcatenatedString)
```

## Acknowledgements

* Sponsored by nearForm

## License

MIT
