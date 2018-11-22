var sql = require("mssql");
var express = require('express');

//var Parmeter= {};

//Parameter.Input = {};
//Parameter.Output = {};



var E_ERR_REQUEST = 200;  
var S_OK = 1;
var request = {};
var Request = {
   
};

Request =   function Request (g_pool) {
    //Request.Init(g_pool);
  }
Request.prototype.Init = function( pool, callback )
{
    //console.log( "g_pool.connected = " + pool.connected );
   // console.log( "\n\r gpool = " + showObj(pool) );
    if(pool.connected){   
        request = new sql.Request(pool); 
        
        console.log("***   pool 의 Request 생성완료   ***\n\r");
        callback(S_OK);
        /*
        this.AddParam( 'idx', sql.Int,10, 14);
        //request.input( 'idx', sql.Int, 17);
        request.execute('select_board_test2', (err, result) =>
        {

            if( result.recordsets.length > 0)
                console.log("Init excute 디비 오픈 완료");                            
            else
                console.log("Init excute 디비 오픈 에러");                            
            
        });       
        */
    }     
    else{

        callback(E_ERR_REQUEST);
        console.log("*** pool 의 디비커넥션이 끊어 져서 Request 미생성 ***\n\r");
    }    
    
}

Request.prototype.ParamTypeLength = function( ParamValType, ParamVal ){

   // console.log ("debug ==> : typeof( ParamVal) = " , typeof( ParamValType));
   // console.log ("debug ==> : ParamVal.length = " , ParamVal.length );
   // console.log ("debug ==> : ParamVal Value = " , ParamVal );

    if( typeof( ParamValType) == "string" )
        return ParamVal.length;
        //return ParamValue.length;
    else
        return 0;
    /*
    if( typeof( ParamValType) == "string" ){
        if( is_alpha_numeric(ParamVal, " ") ){
            return ParamValue.length;
        }
        else
            return ParamValue.length / 2;
        
    }
    */

    // 0 ~ 1 사이의  sql.NVarChar 로 함.
    // 빈값의 데이터가 들어올시 Value = 0   ValueLength = 1이되어
    // 위같이 셋팅함.
    // 한번 에러나면 계속 그것이 실행될때까지 다른작업을 못함.
    // 다른 화면도 같은 클라이언트 생각하나봄.
}

Request.prototype.ParamType = function( ParamVal, ParamValLength ){
    
    if( typeof( ParamVal) == "string"){

        if( is_alpha_numeric(ParamVal, " ") )
        {
            if( ParamVal.length < 8000)
                return sql.VarChar;
            else 
                return sql.Text;
        }            
        else{
            if( ParamVal.length > 1 && ParamVal.length < 4000) {
                if( ParamValLength != null)
                    return sql.NVarChar(ParamVal.length);
                else if( ParamValLength <= 1)
                    return sql.NVarChar;                
                else
                    return sql.NVarChar;
            }
            else 
                return sql.NText;            
        }            
    }    
    else if( typeof( ParamVal) == "number" ){
        //console.log ( ParamVal.typeof);
        if( ! is_integer ( ParamVal) && is_double( ParamVal) )
            return sql.Float;
        else if( ParamVal > 0 && ParamVal <= 255 )
            return sql.TinyInt;        
        else if( ParamVal >= -32768 && ParamVal <= 32767 )
            return sql.SmallInt;        
        else if( ParamVal >= -2,147,483,648 && ParamVal <= 2147483647 )
            return sql.Int;        
        
    }   
      
   
 }


 function is_alpha_numeric(x, space)
 {
     if (space)
     {
         var reg = /^[a-z A-Z0-9]+$/;
         return reg.test(x);
     }
     else
     {
         var reg = /^[a-zA-Z0-9]+$/;
         return reg.test(x);
     }
 }
 
 
function is_double(x)
{
    var reg = /^[-|+]?\d+\.?\d*$/;
    return reg.test(x);
}
function is_integer(x)
{
    var reg = /^[-|+]?\d+$/;
    return reg.test(x);
}


Request.prototype.AddParam = function( ParamName, PramType,  ParamValue){
   // console.log("ParamName = " + ParamName);
   // console.log("ParamType = " + PramType);
   // console.log("ParamValue = " + ParamValue);
    request.input( ParamName,PramType, ParamValue);
}
Request.prototype.AddOutParam = function(ParamName, PramType,  ParamValue)
{
    request.output( ParamName, PramType, ParamValue);
}

Request.prototype.Execute = function ( strProcName, callback)
{
    request.execute(strProcName, (err, result) =>
    {
        //console.log("result : " + result);
        //console.log("err =", err);

        if(err != undefined){
            console.log("Execute err : " + err);
            return;
        }
        if(result == undefined ){
            console.log("*** Request 에서 excute 실행 Recordset 디비반환없슴*** \n\r");
            return;
        }
        if( result.recordsets.length > 0 ){
            console.log("*** Request 에서 excute 실행 Recordset 디비반환 *** \n\r");
            callback(result );          
        }
    });                
    request.on('error', err => {
        console.log("Request 에서 execute DATABASE ERROR :" + err);
    });
}
/*


//var nParamLength = 0;
property: function ([parameters]) {},
* generator(g_pool) {
    Init(g_pool);
  },
set Init(g_pool)
    {
        var request = new sql.Request(g_pool);  
    },
    AddParam (ParamName, PramType, ParmTypeLength, ParamValue)    {
        request.input( ParamName, PramType, ParamValue);
    },
    AddOutParam (ParamName, PramType, ParmTypeLength, ParamValue)    {
        request.output( ParamName, PramType, ParamValue);
    },
    Execute ( strProcName, Recordset)
    {
        request.execute(strProcName, (err, result) =>
        {
        // console.log("excute");                            
            console.log(result);         
            Recordset = result;                   
        });                
        request.on('error', err => {
            console.log("DATABASE ERROR :" + err);
        });
    },
    Close ()
    {

    }
    */


module.exports = Request;