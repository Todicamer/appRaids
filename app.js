var http = require('http');
var url = require("url");
var fs = require("fs");
var express = require("express");

//para que soporte openshift XD!

var server_port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'



const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const options = {
    contentType: 'text/html',
  };
var app=express();
app.use(express.static('public'));
app.get('/',function(req, res){
    res.setHeader("Content-Type", "text/html");
    fs.readFile("mainpage.html", function(err, data)
    {
        if(err){
            res.writeHead(400);
            res.write('Sitio no encontrado, le pelaste choco');
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            JSDOM.fromFile("mainpage.html",options).then(dom => {
                //dom.window.inputNivelRaid.value='4';
                console.log("mainp");
              });
            
            
            res.end();
        }

    });
}).post('/generar', function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('generado');
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Pagina no encontrada, le pelaste');
})
app.listen(server_port, server_ip_address, function(){
    console.log("Listening on " + server_ip_address + ", server_port " + server_port)
  });
//app.listen(8080);

function call_jsdom(source, callback) {
    jsdom.env(source,[ 'jquery-1.7.1.min.js' ],
        function(errors, window) {
            process.nextTick(
                function () {
                    if (errors) {
                        throw new Error("There were errors: "+errors);
                    }
                    callback(window);
                }
            );
        }
    );
}
