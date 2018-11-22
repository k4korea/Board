
var express = require('express');

var router = express.Router();
var app = express();
var pool        = require("./pool");
var sql         = require("mssql");
var Rq          = require("./poolParameter");
var bodyParser  = require("body-parser");

var E_NOCONNECT = 10;

router.get('/', function (req, res, next) {
    
     
    
    var reqbody = req.body;

    var nCount2= 0;
    for( q1 in reqbody){
        //console.log("q1=%s,   %s" + q1,  reqbody[q1] );
        console.log("name=%s , value=%s \n\r" , req.params[nCount2], reqbody[q1]);
        //console.log( ++nCount2)
    } 

    
  
    console.log( "req.params = " + req.params );
    
    console.dir(reqbody);
    /*
    console.log( "=============" );
    
    var nCount2= 0;
    for( q1 in reqbody){
        //console.log("q1=%s,   %s" + q1,  reqbody[q1] );
        //console.log("q1value=" + reqbody[q1]);
        console.log( ++nCount2)
    } 
    
    console.log( "=============" );        
  */
    var E_ERR_REQUEST = 200;  
    var E_NOCONNECT = 100;
    var E_DB_ERROR = 101;
    var S_OK = 1;
    var ErrMsg = 0;
    var recordset = {};  
    var sProcNameVal = "";
    rq =  new Rq();

    var request = new sql.Request(pool.g_pool);  

    //console.log("debug : pool.g_pool :" , pool.g_pool); 
   //console.log("debug : request :" , request);


        
        var  strProcName = "proc_test2";
        request.input( "test",sql.Int,4 );
        request.input( "test2",sql.NVarChar(1),'1' );
        request.execute(strProcName, (err, result) =>
        {
            console.log(result);
            res.send( result);
            console.log("디비에서 받아와서 Recordset 보냄");
            return;
        });  


      
   // }
    
    console.log("Excute 아래 딴 보냄 (지나가는 루틴)");
    //res.send( "Send 받음");
});




module.exports = router;


/*

  //var reqbodyParser = req.bodyParser;
  console.log("bodyParser = " + bodyParser.sqlstring );
  //console.log(req);    
  var sqlQuery = req.body.sqlstring;
  console.log("\n\r req.body.sqlstring :  " , sqlQuery);
  var sqlQuery2 = req.body.idx;
  console.log("\n\r req.body.sqlstring :  " , sqlQuery2);
  var sqlQuery3 = req.body.idx2;
  console.log("\n\r req.body.sqlstring :  " , sqlQuery3);

  // console.log( "reqbody[Param] = ",  reqbody[Param] );        
        //console.log( "\n\r rq.ParamType ", rq.ParamType( "rkskk" )  );
        //console.log( "\n\r rq.ParamTypeLength =", rq.ParamTypeLength( "가나" )  );
        //console.log( "rq.ParamType2 ", rq.ParamType( 2 )  );
     
        console.log( "param =" , Param);
        console.log( "rq.ParamType( reqbody[Param] =" , rq.ParamType( reqbody[Param]));
        console.log( "rq.ParamTypeLength( reqbody[Param] ) =" , rq.ParamTypeLength( reqbody[Param] ));
        console.log( "reqbody[Param] =" , reqbody[Param] );
        rq.AddParam (Param, rq.ParamType( reqbody[Param] ), 
          //                  rq.ParamTypeLength( reqbody[Param] ), 
            //                reqbody[Param]);
         
      //    console.log( "Param] =" , Param );
*/