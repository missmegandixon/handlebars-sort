var Path = require('path');

server.views({
    engines: {
        html: require('handlebars')
    },
    path: Path.join(__dirname, 'views')
});
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('index');
    }
});


server.state('firstname', {
    ttl: null,
    isSecure: true,
    isHttpOnly: true,
    encoding: 'base64json',
    clearInvalid: false, // remove invalid cookies
    strictHeader: true // don't allow violations of RFC 6265
});

{
    config: {
        state: {
            parse: true, // parse and store in request.state
            failAction: 'error' // may also be 'ignore' or 'log'
        }
    }
}

<form onsubmit="myFunction()">
    What is your name? <input type="text" name="firstname" value"">
    <input type="submit" value="Submit">
  </form>

  <script>
    function myFunction(value) {
      return value;
    }
  </script>
