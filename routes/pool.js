
var express = require('express');
var router = express.Router();
var sql = require("mssql");


// 주석처리
//var http = require('http');

//

  const config = {
      user: 'sa',
      password: 'xxxxxxx',
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

var E_NOCONNECT = 100;
var E_DB_ERROR = 101;
var g_sql = {};


g_sql.g_conn = -1; 
g_sql.g_ReProc = -1;
g_sql.g_pool = {};
g_sql.CreatePool = function (str, callback) {

    if( str == "Init"){
        //console.log("*** pool  Init  커넥션 **  ");
        g_sql.g_pool = new sql.ConnectionPool( config );
        g_sql.g_pool.connect(err => {    
                if(err){
                    console.log(" ****** Pool.js 데이터 베이스가 오픈되지 않았습니다. ***** ")
                    console.log(err);
                    
                    callback( E_NOCONNECT);
                }
                g_sql.g_conn++;
                console.log( "글로벌접속2: " + this.g_conn);
                if(g_sql.g_pool.connected){                   
                   // console.log( "connected: " + pool.connected );
                    const request = new sql.Request(g_sql.g_pool);
                    request.input("idx",sql.Int, 2);
                    request.execute("select_board_test2", (err, result) =>
                        {
                            //console.log(result);   
                           
                           
                           
                            console.log("etst" );

                            console.log("**pool  Init  커넥션 OK***\n\r");
                        }                
                    );
                   
                }
        });
        g_sql.g_pool.on('error', err => {
            console.log(" ****** Pool.js 데이터 베이스 Error 입니다. ***** ")
            console.log(err);
            return E_DB_ERROR;
        })
    }
};

g_sql.RequestProc = 
        function (strProcName, objInput, objOutPut, recordset) {

            
    
    
    var request = new sql.Request(g_sql.g_pool);  
   // GetObj(objInput);
    return;
   // if(! objInput.hasOwnProperty('length'))
    if( objInput.length == undefined)
    {
       // console.log("objInput.length  " + objInput.length);
       // console.log("objInput.InputName  " + objInput.InputName);
       // console.log("objInput.Type  " + objInput.Type);
        request.input( objInput.InputName, objInput.Type, objInput.Value);
    }
    else if(objInput.length > 0 ){
        for( var i =0; i < objInput.length ; i++)
        {
            //request.input( objInput[i].InputName, objInput[i].Type, objInput[i].Value);
            //request.input( objInput[i].InputName, sql.Int, objInput[i].Value);
            console.log("objInput.length  " + objInput.length);
            console.log("objInput.InputName  " + objInput[i].InputName);
            console.log("objInput.Type  " + objInput[i].Type);
            request.input( objInput[i].InputName, objInput[i].Type, objInput[i].Value);
            
        }
        ;
    }
    
    /*

    if(! objOutPut.hasOwnProperty('length') )
    {
       // console.log("objInput.length  " + objInput.length);
       // console.log("objInput.InputName  " + objInput.InputName);
       // console.log("objInput.Type  " + objInput.Type);
        request.output( objOutPut.InputName, objOutPut.Type, objOutPut.Value);
    }
    else if(objOutPut.length > 0 ){
        for( var i =0; i < objOutPut.length; i++)
        {
            
            //request.input( objInput[i].InputName, objInput[i].Type, objInput[i].Value);
            //request.input( objInput[i].InputName, sql.Int, objInput[i].Value);
            console.log("objOutPut.length  " + objOutPut.Length);
            console.log("objOutPut.InputName  " + objOutPut.InputName);
            console.log("objOutPut.Type  " + objOutPut.Type);
            request.output( objOutPut[i].InputName, objOutPut[i].Type, objOutPut[i].Value);
        }
        
    }
*/
   request.execute(strProcName, (err, result) =>
        {
           // console.log("excute");                            
            console.log(result);                            
        }                
    );

    request.on('error', err => {
        console.log("DATABASE ERROR :" + err);
    })

    //console.log("request proc 쪽에서 %s" , str);
    g_sql.g_ReProc ++;
    console.log("request 쪽에서 g_conn : %d" , g_sql.g_conn);

    //delete request;
    
};
/*
var TypeInputParam = null;
var objInputParam = null;
var objInputParams = [];
var objInputProperty = {};
objInputProperty.InputName = null;
objInputProperty.Value = null;
objInputProperty.Type = null;


g_sql.AddParameter = 
function (InputName, Type, Value) {
    var tempProperty = new objInputProperty;
    if(objInputParam == null){
        tempProperty.InputName = InputName;
        tempProperty.Type       = Type;
        tempProperty.Value      = Value;
    }
    else if(objInputParam.length == undefined )
    {

    }
    else if(objInputParam.length > 0){

    }
}

*/
g_sql.GetInt    = sql.Int; 
g_sql.GetText   = sql.NVarChar; 
g_sql.GetBit    = sql.Bit; 
g_sql.GetBDate  = sql.DateTime; 
g_sql.GetBuffer = sql.VarBinary;
g_sql.GetTable  = sql.TVP;
//g_sql.GetInt = sql.Int; }
//g_sql.GetInt = "sql.Int";
/*
g_sql.GetText = function(){  return sql.NVarChar; }
g_sql.GetBit = function(){  return sql.Bit; }
g_sql.GetBDate = function(){  return sql.DateTime; }
g_sql.GetBuffer = function(){ return sql.VarBinary;}
g_sql.GetTable = function(){ return sql.TVP;}
*/

module.exports = g_sql;
