var express = require('express');
var router = express.Router();

router.get('/:id', function(req,res,next){
    var id= req.params.id;
    if(id == 'dev1'){
    res.render('boolstore')
    }
    else{
        res.end('invalid');
    }
});

module.exports = router;