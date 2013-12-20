//socket.io --intercambio de datos  cliente /server
//mysql --access to db

var http = require('http'),
    fs = require('fs'), //file system para leer un archivo
    mysql = require('mysql') ,
    Port_=8080;

var cadena = mysql.createConnection({
    'user':'root',
    'password':'8102005',
    'host':'localhost',
    'port':3306
});

cadena.query('USE db_node');

var server = http.createServer(function (req, res) {   
    fs.readFile('index.html', function (err, data) {
        if (err) { throw err; console.log('error en fs.readerfile'); }

        res.writeHead(200, { 'Content-Type': 'text/html','Content-length': data.length  });
        res.write(data);         
        res.end();
    });
}).listen(Port_);

//intercambio de datos --Socket.io
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket){

    cadena.query('select id,  descripcion from departamento', select__);
    function select__(err, res, field) {
            if (err) { cadena.end(); console.log('error en query'); return; }              
            socket.emit('departamento', res);                 
    }
    
    //escucha el evento del cliente --provincia--
    socket.on('provincia',cl_serv);
    function cl_serv(data){
       var id = data.id;
       cadena.query('select id,descripcion from departamento where id=?',[id],cliente_server);
        function cliente_server(err,res,field){
            if (err) { cadena.end(); console.log('error en query'); return; }  
            socket.emit('prov_cleinte_serv',res);console.log('mi data'+id);   
        }
    }

  

});
console.log('iniciado server port :'+ Port_);