const express = require('express')
const router = express.Router();
const bodyparser= require('body-parser')
const ObjectId=require('mongoose').Types.ObjectId;
const cors = require('cors')
const https = require('https');
var PaytmChecksum = require("PaytmChecksum");
const Paytm = require('paytmchecksum');



const {eventBooking}=require('../models/eventBooking');
const {testform}=require('../models/test');

router.get('/',cors(),(req,res)=>{

  testform.find({}, function(err, testforms) {
    var formMap = {};

    testforms.forEach(function(form) {
      formMap[form._id] = form;
    });

    res.send(formMap);  
  });
});


router.post('/',cors(),(req,res)=>{
	console.log(req.body.name,req.body.email,req.body.phone,req.body.ename,req.body.msg,req.body.amount)
	var data = new eventBooking ({
		name:req.body.name,
		email:req.body.email,
		phone:req.body.phone,
		eventname:req.body.ename,
		msg:req.body.msg,
		amount:req.body.amount,

	})
	data.save((err,doc)=>{
		if(!err){res.send(doc);}
		else{console.log('Error:'+ JSON.stringify(err,undefined,2));}
	});
	
	
	
	
	
	if (!req.body.name||!req.body.ename || !req.body.email || !req.body.phone|| !req.body.amount) {
    res.status(400).send('Payment failed')
	console.log('step1')
  } else {
	  console.log('step2')
    var params = {};
    params['MID'] = 'Iqujtp38397883699577';
    params['WEBSITE'] = 'WEBSTAGING';
    params['CHANNEL_ID'] = 'WEB';
    params['INDUSTRY_TYPE_ID'] = 'Retail';
    params['ORDER_ID'] = 'ord_048';
    params['CUST_ID'] = 'vikash';
    params['TXN_AMOUNT'] = '200';
    params['CALLBACK_URL'] = 'http://localhost:3000/callback';
    params['EMAIL'] = '"vikashdevil@gmail.com"';
    params['MOBILE_NO'] = '8235188063';

	

var paytmChecksum = Paytm.generateSignature(params, "I0MuDY7kmAZ&gJIv");
paytmChecksum.then(function(result){
	console.log('step3')
	console.log("generateSignature Returns: " + result);
	var verifyChecksum =  PaytmChecksum.verifySignature(params, "I0MuDY7kmAZ&gJIv",result);
	console.log("verifySignature Returns: " + verifyChecksum);
}).catch(function(error){
	console.log(error);
});
  }
	
	
	
	
});


router.post('/paynow',cors(), (req, res) => {
	//console.log(req.body.orderid,"wwwwwwwwwwwwwwwwwww")
		console.log(req.body.name,req.body.email,req.body.phone,req.body.ename)
  if (!req.body.ename || !req.body.email || !req.body.phone) {
    res.status(400).send('Payment failed')
	console.log('step1')
  } else {
	  console.log('step2')
    var params = {};
    params['MID'] = 'Iqujtp38397883699577';
    params['WEBSITE'] = 'WEBSTAGING';
    params['CHANNEL_ID'] = 'WEB';
    params['INDUSTRY_TYPE_ID'] = 'Retail';
    params['ORDER_ID'] = 'TEST_' + new Date().getTime();
    params['CUST_ID'] = 'customer_001';
    params['TXN_AMOUNT'] = "3000.00";
    params['CALLBACK_URL'] = 'http://localhost:3000/callback';
    params['EMAIL'] = req.body.email;
    params['MOBILE_NO'] = req.body.phone.toString();

	

    PaytmChecksum.generateSignature(params, "I0MuDY7kmAZ&gJIv", function (err, checksum) {
		console.log('step3')
      var txn_url = "https://securegw-stage.paytm.in/order/process"; // for staging
      // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production



      res.writeHead(200, { 'Content-Type': 'text/html' });
	  res.header("Set-Cookie", "HttpOnly;Secure;SameSite=None");
      res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="https://securegw-stage.paytm.in/order/process" name="f1"><input type="text"></form><script type="text/javascript">document.f1.submit();</script></body></html>');
      res.end();
	  
    });
  }
	
})

router.delete('/delete',(req,res)=>{
	//console.log('delete',req.body)
		var data =  testform.findById(req.body._id)
		
	data.deleteOne((err,doc)=>{
		if(!err){res.send(doc);}
		else{console.log('Error:'+ JSON.stringify(err,undefined,2));}
	});
})

router.post('/edit',(req,res)=>{
	console.log(req.body)
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.end();

})


function redirct(orderid){
	console.log(orderid+'xxxxxxxxxxxxxxxxxxx')
	
}



module.exports=router;