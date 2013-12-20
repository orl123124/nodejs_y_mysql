
var mysql = require('mysql');
var cadena = mysql.createConnection({
    'user':'root',
    'password':'8102005',
    'host':'localhost',
    'port':3306
});
  

cadena.query('USE db_node');	
cadena.query('select * from departamento', function(err,res,field){
    if(err){
        throw err;
        console.log('error');
    }
    console.log('numero de registros'+res.length);
    console.log(res);
    //cadena.close();


}); 