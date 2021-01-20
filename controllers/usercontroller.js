const express = require('express')
const router = express.Router();
const bodyparser= require('body-parser')
const ObjectId=require('mongoose').Types.ObjectId;
const cors = require('cors')

const {feed}=require('../models/feed');


router.post('/',cors(),(req,res)=>{
	console.log(req.body.name,req.body.email,req.body.Query)
	var newfeed = new feed ({
		name:req.body.name,
		email:req.body.email,
		Query:req.body.Query
	})
	newfeed.save((err,doc)=>{
		if(!err){res.send(doc);}
		else{console.log('Error:'+ JSON.stringify(err,undefined,2));}
	});
});

module.exports=router;