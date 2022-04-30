/*
 *   Primary file for the API
 *
*/ 

// Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

// The server should respond to all request with a string
var server = http.createServer(function(req,res){

    // Get the URL and parse it
    var parseUrl = url.parse(req.url,true);
    
    // Get the path
    var path = parseUrl.pathname;
    
    // Replace slashes from paths
    var trimmedPath = path.replace(/^\/+|\/+$/g,'');

    // Query String as an Object
    var queryStringObject = parseUrl.query;

    // Get the HTTP method
    var method = req.method.toLowerCase();
    
    // Get the headers as an objects
    var headers = req.headers;

    // Get the payload, if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    // Read chunk of DATA from request
    req.on('data',function (data) {
        buffer += decoder.write(data);
    })
    // using end. set a call back function on it 
    req.on('end',function () {
        buffer+= decoder.end();
        // Response to request Send the Request
        res.end("Hello world \n");

        // Log the Request path method and Quesrystring
        console.log('Request received on path: '+trimmedPath+'with this mehod : '+ method+' and with this query String Parameters:',queryStringObject);
        // Log the headers
        console.log(headers);
        // Log the buffer value
        console.log('Payload Data:',buffer);

    })
    
})
server.listen(3000,function(){
    console.log("the server is listening on port 3000 now")
})
