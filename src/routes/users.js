const express = require('express');

const router = express.Router();

router.get('/users',(req,res)=>{
    res.end("hello")
})

module.exports = router

