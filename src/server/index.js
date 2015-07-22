var http = require('http'),
    port = process.env.PORT || 8080,
    app = require('./app');


http.createServer(app()).listen(port, function () {
  console.log('Server listening on port ' + port);
});
