# emoter
#### JavaScript event emitter for state changes
<b>emoter</b> uses [energy](https://github.com/ryanve/energy) and [skate](https://github.com/ryanve/skate) to emit events for state changes

```sh
npm install emoter --save
```

#### Create an emoter instance

```js
var emoter = require('emoter')
var app = emoter()
```

### Methods
#### `.state`
- `app.state(state)` // get
- `app.state(state, value)` // set (triggers listeners if change)

#### `.on`
- `app.on(state, listener)` listen to <var>state</var> changes

#### `.off`
- `app.off(state, listener)` remove <var>listener</var>
- `app.off(state)` remove all <var>state</var> listeners
- `app.off()` remove all listeners

#### `.once`
- `app.on(state, listener)` listen for the next <var>state</var> change

#### `.emit`
- `app.emit(state)` manually trigger <var>state</var> listeners

#### Example

```js
var emoter = require('emoter')
var app = emoter()

app.on('user', function() {
  console.log(this.state('user'))
})

app.state('user', 47) // logs 47
app.state('user', 81) // logs 81

app.on('loading', function() {
  if (this.state('loading')) console.log('loading')
}).on('loaded', function() {
  if (this.state('loaded')) console.log('loaded')
})

app.load = function() {
  this.state('loading', true)
  // ...
  this.state('loading', false)
  this.state('loaded', true)
}

app.load()
```

## Compatibility
Works in web browsers <b>and</b> node

## License
MIT
