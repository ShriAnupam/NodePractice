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

        // Choose the handler this request should go to. If one is not found
        // console.log(router);
        var chooseHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notfound;

        // Construct the data object to send to the handler
        var data = {
            'trimmedPath':trimmedPath,
            'queryStringObject':queryStringObject,
            'method':method,
            'headers':headers,
            'payload':buffer
        };
        // Route the request to the handler specified in the route
        chooseHandler(data,function (statusCode,payload) {
            // use the status code called bck by thr handler or default 404
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            
            // use the payload calledback by the handler or default empty object
            payload = typeof(payload) == 'object' ? payload : {};

            // COnvert the payload to a string
            var payloadString = JSON.stringify(payload);

            // Return the Response
            res.writeHead(statusCode);

            // Response to request Send the Request
            // res.end("Hello world \n");
            res.end(payloadString);

            // Log the Request path method and Quesrystring
            console.log('Request received on path: '+trimmedPath+'with this mehod : '+ method+' and with this query String Parameters:',queryStringObject);
            // Log the headers
            console.log(headers);
            // Log the buffer value
            console.log('Payload Data:',buffer);
            // Log payload and StatusCode
            console.log('Returning this response',statusCode,payload);
        })
    })
    
})
// Server listen on Port 3000
server.listen(3000,function(){
    console.log("the server is listening on port 3000 now")
})


// Define the handlers
var handlers = {};
handlers.sample = function(data,callback){
    // callback a http status code and a payload object
    callback(406,{'name':'sample handler'});
};
handlers.notfound = function (data,callback) {
    callback(404,);
    
};
// Define a request router
var router = {
    'sample' : handlers.sample
}