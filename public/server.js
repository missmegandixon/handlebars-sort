var Path = require('path');
var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.views({
    engines: {
        html: require('handlebars')
    },
    path: Path.join(__dirname, 'views')
});

server.route([
  {
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('index');
    }
  },
  {
    method:'GET',
    path:'/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  }
]);


server.start(function () {
    console.log('Server running at:', server.info.uri);
});
