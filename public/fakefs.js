var files = {
  '/etc/resolv.conf': 'nameserver 8.8.8.8\nnameserver 8.8.4.4\n',
  '/etc/hosts': '127.0.0.1 localhost\n'
}

exports.readFile = function(path, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = null
  }
  if (typeof files[path] === 'string') {
    setTimeout(callback.bind(callback, null, files[path]), 0);
  } else {
    var e = new Error('ENOENT: '+path)
    e.code = 'ENOENT'
    setTimeout(callback.bind(callback, e), 0);
  }
}
