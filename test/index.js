!function(root, name) {
  var common = typeof module != 'undefined' && !!module.exports
  var aok = common ? require('aok') : root.aok
  var api = common ? require('../src') : root[name]

  try {
    console.dir(api)
    console.dir(api())
  } catch(e) {}

  function test() {
    test[aok.apply(this, arguments).test ? 'passed' : 'failed'] += 1
  }
  test.passed = 0
  test.failed = 0

  function runner() {
    function run() { ++run.ran }
    run.ran = 0
    return run
  }

  test('get', function() {
    var app = api()
    if (app.state('anything') !== void 0) return false
    if (app.state('toString') !== void 0) return false
    return true
  })

  test('set-get', function() {
    var app = api()
    if (app.state('user', 47) !== 47) return false
    if (app.state('user') !== 47) return false
    return true
  })

  test('change', function() {
    var app = api()
    var f = runner()
    app.on('hoping', f)
    app.state('hoping', 'more')
    app.state('hoping', 'less')
    return 2 === f.ran
  })

  test('no-change', function() {
    var app = api()
    var f = runner()
    app.state('hoping', 'more')
    app.on('hoping', f)
    app.state('hoping', 'more')
    return 0 === f.ran
  })

  if (typeof document != 'undefined') {
    api().on('done', function() {
      document.documentElement.className = this.state('done')
    }).state('done', test.failed ? 'failed' : test.passed ? 'passed' : void 0)
  }
}(this, 'emoter');
