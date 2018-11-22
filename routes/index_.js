
var express = require('express');

var router = express.Router();
var app = express();
var objDB = require("./DBConnect");
var InsertSQL = require("./InsertSQL");
var urlencode = require('urlencode');
var iconv  = require('iconv-lite');


var bodyParser     =         require("body-parser");
var app            =         express();

var pool           =   require("./pool");




function showObj(obj) {
  var str = "";
  if(obj == undefined) console.log( "obj : undefined " )
  for(key in obj) {
    // str += key+"=" + obj[key] + "\n";
    console.log( "Key=" + key + ", value =" + string(obj[key]) ); // + obj[key] );
  }

  console.log(str);
  return;
};

router.get('/', function (req, res, next) {
  var sqlstring = req.query.sqlstring;

  pool.RequestProc('');
res.send("퀄지작업");
res.end();

//  iconv.extendNodeEncodings();
  //sqlstring = new Buffer(sqlstring);
console.log( "스트링 :  " + sqlstring);
var result  ;
result = InsertSQL.insertSql(sqlstring, true, objDB.GetConfig() );
console.dir(result);
//  sqlstring = urlencode(sqlstring);
//  res.send( sqlstring);
var strReturn = "디비 오픈후 결과값 출력 \n\r <br>"
strReturn += sqlstring;
res.send(  strReturn);
  //console.log( "test:" + showObj(req.query) );
//  var sql_string ='select * from board where idx = 2';
  //sqlstring = "insert into board ( creator_id, title, content, regdate, modidate, passwd, hit ) 	select 'dedicate', '11아싸가오리', '그래 열심히 해보자', GETDATE(), GETDATE(), 'skdjfd', 0";

});


router.post('/', function (req, res) {
  var sqlstring = req.body.sqlstring;

  //var strContents = new Buffer(body);
//  console.log(iconv.decode(strContents, 'EUC-KR').toString());
  var strReturn = "디비 오픈후 결과값 출력 \n\r <br>"
  var dt = new Date();
  console.log( "포스트 스트링 :===>> " +
   dt.toString() + " " + sqlstring + "\n\r  ");
  var result  ;
  result = InsertSQL.insertSql(sqlstring, true, objDB.GetConfig() );
  console.dir(result);

res.send(sqlstring);

  //var iconvEuc = new Iconv('EUC-KR', 'UTF-8');
//  sqlstring = iconvEuc.convert(sqlstring);
//iconv.extendNodeEncodings();
//var strContents = new Buffer(body);
/*
sqlstring = new Buffer(sqlstring);
//sqlstring = iconv.decode(strContents, 'EUC-KR').toString()
console.log( "포스트 스트링 :==============>> " + sqlstring);
var result  ;
result = InsertSQL.insertSql(sqlstring, true, objDB.GetConfig() );
console.dir(result);
//  sqlstring = urlencode(sqlstring);
//  res.send( sqlstring);
var strReturn = "디비 오픈후 결과값 출력 \n\r <br>"
strReturn += sqlstring;
res.send(  strReturn);
  //console.log( "test:" + showObj(req.query) );
//  var sql_string ='select * from board where idx = 2';
  //sqlstring = "insert into board ( creator_id, title, content, regdate, modidate, passwd, hit ) 	select 'dedicate', '11아싸가오리', '그래 열심히 해보자', GETDATE(), GETDATE(), 'skdjfd', 0";
*/
});

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
module.exports = router;
