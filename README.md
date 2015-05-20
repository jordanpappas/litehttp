# litehttp - Simple! #
When nothin else is lite enough.

```
$ mkdir mysite && cd mysite
$ npm i litehttp
```
put an index.html file in ./public and
```javascript
var server = require('litehttp');
server.listen(3000);
console.log('listening on 3000');
```
