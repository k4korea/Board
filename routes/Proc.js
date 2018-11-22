
var express = require('express');

var router = express.Router();
var app = express();
var pool        = require("./pool");
var sql         = require("mssql");
var Rq          = require("./poolParameter");
var bodyParser  = require("body-parser");

var E_NOCONNECT = 10;

router.post('/', function (req, res, next) {
    
     
    
    var reqbody = req.body;

    var nCount2= 0;
    for( q1 in reqbody){
        console.log("q1=%s,   %s" + q1,  reqbody[q1] );
        console.log("name=%s , value=%s \n\r" , req.params[nCount2], reqbody[q1]);
        //console.log( ++nCount2)
    } 

    
    //console.dir(req);
    //console.log("req.url=" + req.url);  
    console.log( "req.params = " + req.params );
    //console.log( "req.params.idx = " + req.params.idx );   
    //console.log( "params dir = " + params );  //error 
    
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
    ErrMsg = rq.Init(pool.g_pool, function(ErrMsg){

        console.log("ErrMsg= ",ErrMsg);
      
        if(ErrMsg == E_NOCONNECT || ErrMsg == E_DB_ERROR  )
        {
            console.log("디비 접속실패로 인한 서비스 중지.")
            res.end()
        }
        else if( ErrMsg == E_ERR_REQUEST )
        {
            console.log(" Pool Request 생성실패 ");
            res.end()
        }
        else if( ErrMsg == S_OK )
        {
            console.log(" Pool Request new 생성성공   ");
        }
    } );
    
   console.log("debug : reqbody :" , reqbody);
    
    
    for( Param in reqbody)
    {
        if(Param == "sProcName") {
            sProcNameVal = reqbody[Param];            
            continue;       
        }

               
        if(  Param.substring(0, 4) == "out_")
        {
            var TempNameParam = Param.substring(4, Param.length);
                      
            rq.AddOutParam(TempNameParam,   rq.ParamType( reqbody[Param], 400 ), 
                                            reqbody[Param] );  
        }
        else{
            rq.AddParam(Param,  rq.ParamType( reqbody[Param], 
                                rq.ParamTypeLength( reqbody[Param], reqbody[Param] ) ),                                 
                                reqbody[Param] );  
                                /*
            console.log( " rq.AddParamValue =", reqbody[Param]);
            console.log(" typeof(reqbody[Param]=%s",typeof( reqbody[Param]) );
            console.log(" ParamType = %s",               
                            rq.ParamType( reqbody[Param], 
                                    rq.ParamTypeLength( reqbody[Param], reqbody[Param]  )
                                )
                        );
            */
        }
        console.log( "NO Error Print typeof(Param) " , Param );           
    }      
    
    rq.Execute(sProcNameVal, function ( result)   
    {
  
        //console.dir(result.recordset.columns);
      //  console.dir(result.recordset);
        //console.log("[0] idx = " + result.recordset[0].idx);
        //console.log("idx = " + result.recordset[0].title);
        //console.log("call back 함수 찍음. :" + 
          //      showObj(result.recordset));
       // result += " " +  result + " kkk\0"
        //res.send("<html><head></head><body> ㄱ batch_sqltest  abc</body></html>");
        //res.header("content-Type:text/xml;charset=EUC-KR");
        console.log(result);
        res.send( result);
        console.log("디비에서 받아와서 Recordset 보냄");
    });  
    
    console.log("Excute 아래 딴 보냄 (지나가는 루틴)");

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