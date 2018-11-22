var express = require('express');

var router = express.Router();
var app = express();

var sql = require("mssql");
var pool = require("./pool");

router.get('/', function (req, res, next) {
    var sqlstring = req.query.sqlstring;

    console.log("test 컨넥트 이전 파일입니다. ");
    //res.redirect("./work");
   //res.send("pool ");
   //res.send("pool connected " + pool.connected);
   // for(var i =0; i < 10000000; i++)
   // {
        

        if(pool.connected){
            console.log("test 컨넥트 이후 파일입니다. ");
            //pool.CreatePool();

            console.log( " test connected 안 pool.g_conn : " + pool.g_conn );
            const request = new sql.Request(pool);
            request.input("idx",sql.Int, 1);
            request.execute("select_board_test2", (err, result) =>
                {
                    console.log(result);
                    
                }
        
            );
            res.end();
        }
           
  //  }
   
   
   console.log( " pool.g_conn : " + pool.g_conn );

   
   res.end();
   
});



module.exports = router;
