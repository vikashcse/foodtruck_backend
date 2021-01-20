const express = require('express')
const router = express.Router();
const bodyparser= require('body-parser')
const ObjectId=require('mongoose').Types.ObjectId;
const cors = require('cors')

const {roomBooking}=require('../models/roomBooking');

router.get('/',cors(),(req,res)=>{
	res.send("bookroom")
});


router.post('/',cors(),(req,res)=>{
	console.log(req.body.name,req.body.email,req.body.Query)
	var newRoomBooking = new roomBooking ({
		name:req.body.name,
		email:req.body.email,
		Query:req.body.Query
	})
	newRoomBooking.save((err,doc)=>{
		if(!err){res.send(doc);

		}
		else{console.log('Error:'+ JSON.stringify(err,undefined,2));}
	});
});

module.exports=router;