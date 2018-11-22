
var express = require('express');
var app = express();
const  sql = require('mssql');

  //pool.a = 2;
  /*
const config = {
    user: 'sa',
    password: 'rlaxodud#08',
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
*/

var pools = {};
//pools.pool1; // = {};
/*
pools.p1 = function(config) {
    console.log(config);
     const p_1  =   new sql.ConnectionPool(config);
}
*/

pools.insertSql = function ( queryString , bOpen, config){

      console.log(" insertSql.js open= " + bOpen + " db open \n\r ");

      if(bOpen == true ){
        //  console.log("insert mysql 시작 =>" + queryString);
        const  pool1  = new sql.ConnectionPool(config, err => {
        // ... error checks
              pool1.request() // or: new sql.Request(pool1)
              .query(queryString, (err, result) => {
                  // ... error checks

                  console.dir(result);
                  console.log(" \n\rpool 안에서 쿼리결과값 " + result);
                  console.log("\n\r <br>pool 안에서 쿼리 " + queryString);
                  return result;
              })

          })

          pool1.on('error', err => {
              // ... error handler
          })

      }
   //pool1.close();
};

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


module.exports = pools; //, pool, recordset};
