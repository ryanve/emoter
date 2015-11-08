!function(root, name, make) {
  if (typeof module != 'undefined' && module.exports) module.exports = make(require)
  else root[name] = make(function(id) { return root[id] })
}(this, 'emoter', function(require) {

  var skate = require('skate')
  var energy = require('energy')

  function api() {
    return ensure(this instanceof api ? this : new api)
  }

  function ensure(o) {
    if (!o.state || !o.state.emit) (o.state = skate()).emit = proxy(o)
    return energy.to(o)
  }

  function proxy(o) {
    return function() {
      return o.emit.apply(o, arguments)
    }
  }

  return api
});
