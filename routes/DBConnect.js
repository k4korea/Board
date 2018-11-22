
var express = require('express');
var app = express();
const  sql = require('mssql');

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
var SqlSimple = {};
SqlSimple.m_bOpen = false;
SqlSimple.GetConfig = function()
{

  return config;
};

SqlSimple.DBOpen = function( )
{
  if( this.m_bOpen == false )
  {
        sql.connect(config).then(pool => {
            // Query

            return pool.request()
            //.input('input_parameter', sql.Int, 1)
            .query('select 1 as nOK')
        }).then(result => {
            //console.log( showObj( result.recordset[0] ));
            if(result.recordset[0].nOK == "1"){
              console.log("접속하였습니다 ");
              this.m_bOpen = true;
              console.log("open= " +this.m_bOpen);
            }
            else
              console.log("접속에 실패 하였습니다 ");


        }).then(result => {
            console.dir(result)
        }).catch(err => {
            console.log("프로시져에러" + err)
        })

        sql.on('error', err => {
            // ... error handler
        });
  }


};



module.exports = SqlSimple; //{recordset} ; //, pool, recordset};
