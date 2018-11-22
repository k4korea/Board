var express = require('express');

var router = express.Router();
var app = express();
var pool = require("./pool");

router.get('/', function (req, res, next) {
    var sqlstring = req.query.sqlstring;

    console.log(pool.connected);
    //res.redirect("./work");
   //res.send("pool ");

   res.send("pool connected " + pool.connected);
});



module.exports = router;
