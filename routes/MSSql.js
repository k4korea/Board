
var express = require('express');
var app = express();
const  sql = require('mssql');
  var pool = {};
const config = {
    user: 'sa',
    password: 'xxxxxx',
    server: '127.0.0.1', // You can use 'localhost\\instance' to connect to named instance
    database: 'K4Project',

    pool: {
           max: 3,
           min: 0,
           idleTimeoutMillis: 30000
       },
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
};
//var pool;

var m_bOpen = true;
var recordset = {};


//DBProcess( strProcedure, strInput, strOutput )


function DBProcess(){
  console.log("open= " +m_bOpen);
  if(m_bOpen == true){
    pool = new sql.ConnectionPool(config, err => {

        pool.request() // or: new sql.Request(pool2)
        .input('idx', sql.Int, 10)
        .output('nOUTPUT', sql.Int, 0)
        .execute('select_board_test', (err, result, returnValue) => {
            // ... error checks
            //console.log( "pool error " + showObj( pool) );
          //  console.log( "pool error " + typeof( pool) );
          //console.log( "pool recordset " + showObj( result.recordset ) );
          //console.log( "pool error " + result[0]);
          console.dir(result);
        })
    });
  }
};
DBProcess();
//console.log( "pool error " +  pool  );


function showObj(obj) {
	var str = "";
  if(obj == undefined) console.log( "obj : undefined " )
	for(key in obj) {
		// str += key+"=" + obj[key] + "\n";
    console.log( "Key=" + key + ", value =" + string(obj[key]) ); // + obj[key] );
	}

	console.log(str);
	return;
}


module.exports = {recordset} ; //, pool, recordset};
