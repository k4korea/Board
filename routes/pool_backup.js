
var express = require('express');
var router = express.Router();
var sql = require("mssql");


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

function GetObj(obj)
{ 
    var str = "";
    if(obj == undefined) console.log( "obj : undefined " )
    for(key in obj) {
       str += key+"=" + obj[key] + "\n";
      //console.log( "Key=" + key + ", value =" + obj[key] ); // + obj[key] );
    }
  
    console.log(str);
    return;
}


var g_sql = {};


g_sql.g_conn = -1; 
g_sql.CreatePool = function (str) {
    
    console.log( "pool 엦서 찍음" + str)

    var pool = new sql.ConnectionPool( config );
    pool.connect(err => {

            if(err){
                console.log(err);
                return;
            }
            this.g_conn++;
            console.log( "글로벌접속2: " + this.g_conn);
            if(pool.connected){
               
               // console.log( "connected: " + pool.connected );
                const request = new sql.Request(pool);
                request.input("idx",sql.Int, 2);
                request.execute("select_board_test2", (err, result) =>
                    {
                        console.log(result);
                        
                    }
            
                );
               
            }
            /*
           
            */
    });
    pool.on('error', err => {
        console.log(err);

    })
    
    
}

module.exports = g_sql;
