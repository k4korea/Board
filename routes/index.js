
var express = require('express');

var router = express.Router();
var app = express();
var urlencode   = require('urlencode');
var iconv       = require('iconv-lite');
var pool        = require("./pool");
var sql         = require("mssql");
var Rq          = require("./poolParameter");
var bodyParser  = require("body-parser");




function showObj(obj) {
  var str = "";
  if(obj == undefined) console.log( "obj : undefined " )
  for(key in obj) {
    // str += key+"=" + obj[key] + "\n";
    console.log( "Key=" + key + ", value =" + obj[key] ); // + obj[key] );
  }

  console.log(str);
  return;
};


router.post('/', function (req, res) {


  console.log("bodyParser = " + bodyParser.sqlstring );
  //console.log(req);
    
  var sqlQuery = req.body.sqlstring;
  console.log("\n\r req.body.sqlstring :  " , sqlQuery);

  
  var recordset = {};  
  rq =  new Rq();
  rq.Init(pool.g_pool, function(ErrMsg){
    console.log("index.js ErrMsg= ",ErrMsg);
  })
  rq.AddParam ("sValue", sql.NText, sqlQuery);
  rq.Execute("batch_sql", function ( result)
  {

      //console.dir(result.recordset.columns);
      //console.dir(result.recordset);
      //console.log("[0] idx = " + result.recordset[0].idx);
      console.log("idx = " + result.recordset[0].title);
      //console.log("call back 함수 찍음. :" + 
        //      showObj(result.recordset));
      
      //res.send(result);
  //    res.send( "{aaaam:bbbbb,  [sdfdd:33333]}");
      console.log("디비에서 받아와서 보내고");

  });
  

//console.log("request proc 쪽에서 %s" , str);


  
  console.log(" index.js 에서 그냥 보내고");
  res.send("<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'></head><body> 222 외ㅐ그래test  abc</body></html>");
  //res.send("포스트 작업\n\r ");
  
  
});


router.get('/', function (req, res, next) {
  
  console.log("bodyParser = " + bodyParser.sqlstring );
  //console.log(req);
    
  var sqlQuery = req.body.sqlstring;
  console.log("\n\r req.body.sqlstring :  " , sqlQuery);

  
  var recordset = {};  
  rq =  new Rq();
  rq.Init(pool.g_pool)
  rq.AddParam ("sValue", sql.NVarChar, 4000, sqlQuery);
  //rq.AddParam ("idx", sql.Int, 10, 11);
  //rq.AddParam ("idx3", sql.Int, 10, 11);
  rq.Execute("batch_sql", function ( result)
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
      console.log("디비에서 받아와서 보내고");
  });

  
  console.log("그냥 보내고");
  //res.setHeader("Accept-Range","bytes");
  //res.setHeader("Accept-Range:bytes");
  //res.send("111122222 abc");
  /*


  var sqlstring = req.query.sqlstring;

  console.log( "db.g_conn=%d" + pool.g_conn );
  //console.log( "\n\r db.g_Reproc =" + pool.g_ReProc );
  // 윗줄은 ㅇ
  
  var recordset = {};
   
  rq =  new Rq();
  rq.Init(pool.g_pool)
  rq.AddParam ("idx", sql.Int, 10, 14);
  //rq.AddParam ("idx", sql.Int, 10, 11);
  //rq.AddParam ("idx3", sql.Int, 10, 11);
  rq.Execute("select_board_test3", function ( result)
  {

      //console.dir(result.recordset.columns);
      console.dir(result.recordset);
      //console.log("[0] idx = " + result.recordset[0].idx);
      console.log("idx = " + result.recordset[0].title);
      //console.log("call back 함수 찍음. :" + 
        //      showObj(result.recordset));
  });
  
  
   res.send("request test");
   return;
   */
   return;
   //var objOutputParam = null;
   var outRecordset = {};
   var objOutputParam = null;

   console.log( "objOutputParam = " + objOutputParam);
/*
   var objInputParam = {};
   
   objInputParam.InputName = 'idx';
   objInputParam.Type = pool.GetInt; // pool.GetInt() ;
   objInputParam.Value = 4;
 */

  /*
  // **** output
  var objOutputParam = {};  

  objOutputParam.InputName = 'idx';
  objOutputParam.Type = pool.GetInt; // pool.GetInt() ;
  objOutputParam.Value = 4;
  console.log( "obj Length " + objOutputParam.length);
  console.log( "obj " + objOutputParam.InputName);
  // **** output
*/

/* 변수한개일때
  //var objInputParam = {};
  var objInputParam;
  var objInputProperty = {};
  objInputProperty.InputName = 'idx';
  objInputProperty.Type = pool.GetInt;
  objInputProperty.Value = 4;
  //objInputProperty.InputName = 'idx';
  objInputParam = objInputProperty;
*/


var objInputParam = [];
var objInputProperty = {};

  

  objInputProperty.InputName = 'idx';
  objInputProperty.Type =  pool.GetInt; // pool.GetInt() ;
  objInputProperty.Value = 4;
  objInputParam[0] = objInputProperty;

  console.log( ' objInputParam[0].InputName=' + 
  objInputParam[0].InputName);
  console.log( ' objInputParam[0].Value=' + 
  objInputParam[0].Value);
  console.log( ' objInputParam[0].Type=' + 
  objInputParam[0].Type);

  console.log( '\n\r k1 objInputParam[0].Value=' + 
  objInputParam[0].Value);

  //var objInputProperty =  {};

  objInputProperty.InputName = 'idx2';
  objInputProperty.Type =  pool.GetInt; // pool.GetInt() ;
  objInputProperty.Value = 5;
  objInputParam[1] = objInputProperty;

  console.log( ' objInputParam[1].InputName=' + 
  objInputParam[1].InputName);
  console.log( ' objInputParam[1].Value=' + 
  objInputParam[1].Value);
  console.log( ' objInputParam[1].Type=' + 
  objInputParam[1].Type);

  console.log( '\n\r k1 objInputParam[1].Value=' + 
  objInputParam[1].Value);
  console.log( "객체일치여부");
  
  if( objInputParam[0] === objInputParam[1])
    console.log("객체같음");
  else
  console.log("객체다름");

  
 
  objInputParam[0].InputName = 'idx6';
  objInputParam[0].Type =  pool.GetInt; // pool.GetInt() ;
  objInputParam[0].Value = 6;

  objInputParam[1].InputName = 'idx7';
  objInputParam[1].Type =   pool.GetInt ;
  objInputParam[1].Value = 7;

  console.log( '\n\r k2 objInputParam[0].Value=' + 
    objInputParam[0].Value);

    showObj(objInputParam[0]);

  console.log( '\n\r k2 objInputParam[1].Value=' + 
    objInputParam[1].Value);
    showObj(objInputParam[0]);


  // objInputParam[2].InputName = 'idx3';
  // objInputParam[2].Type =  "sql.Int" ;
  // objInputParam[2].Value = 2;



  console.log( "objInputParam.length = " + objInputParam.length);
  console.log( "objInputParam.hasOwnProperty(length) = " 
  + objInputParam.hasOwnProperty('length') + "\n\r");

   //console.log(objInputParam.)

   pool.RequestProc('select_board_test2', 
        objInputParam, objOutputParam, outRecordset );
   
    //res.redirect("./work");
    //db.g_sql.CreatePool();
    console.log( "\n\r db.g_conn= 후" + pool.g_conn );
    console.log( "\n\r db.g_Reproc 후 ="+ pool.g_ReProc );


    res.send("  request.proc 호출");
    //res.redirect("./test");
  //  res.send("pool ");


});


module.exports = router;

/*

app.use(function (req, res) {
  var post_data = req.body;
  console.log(post_data);
})




var query ={
  {"procedurename" },
  { idx, nOUTPUT },
  { 0, 0 },
  { 0, 1}
};

var queryOut ={

  {recordset},
  {},
  {}
}
objSql.Input(query, queryOut );
*/
/*
function showObj(obj) {
  var str = "";
  if(obj == undefined) console.log( "obj : undefined " )
  for(key in obj) {
     str += key+"=" + obj[key] + "\n";
    //console.log( "Key=" + key + ", value =" + string(obj[key]) ); // + obj[key] );
  }

  console.log(str);
  return;
};

var jj = { };
jj.a="aa";

var sqlstring = ""; //res.sqlstring;
sqlstring = "insert into board ( creator_id, title, content, regdate, modidate, passwd, hit ) 	select 'dedicate', '아싸가오리', '그래 열심히 해보자', GETDATE(), GETDATE(), 'skdjfd', 0";

  //console.log(sqlstring);
  console.log( "objsql" + showObj(objSql ));
objSql.DBProcess(sqlstring);

router.get('/', function (req, res, next) {
  var sqlstring = ""; //res.sqlstring;
  sqlstring = "insert into board ( creator_id, title, content, regdate, modidate, passwd, hit ) 	select 'dedicate', '아싸가오리', '그래 열심히 해보자', GETDATE(), GETDATE(), 'skdjfd', 0";



  res.send("디비 오픈후 결과값 출력");
});
*/