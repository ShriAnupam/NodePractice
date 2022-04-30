var http = require('http');
var url = require('url');

var server = http.createServer(function(req,res){

    var parseUrl = url.parse(req.url,true);
    
    var path = parseUrl.pathname;
    
    // Replace slashes from paths
    var trimmedPath = path.replace(/^\/+|\/+$/g,'');

    // Query String as Obbject
    var queryStringObject = parseUrl.query;

    // methods Calling
    var method = req.method.toLowerCase();
    
    // Get the headers as an objects
    var headers = req.headers;

    // Response to request
    res.end("Hello world \n");

    console.log('Request received on path: '+trimmedPath+'with this mehod : '+ method+' and with this query String Parameters:',queryStringObject);
    console.log(headers);

})
server.listen(3000,function(){
    console.log("the server is listening on port 3000 now")
})
