const express =require('express');
const bodyparser= require('body-parser');
const cors = require('cors')

const {mongoose}=require('./db.js');
const https = require('https');


const app=express()
app.use(bodyparser.json());

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Origin, Content-Type, Accept");
	if(req.method ==='OPTIONS'){
		res.header('Access-Control-Allow-Methods','PUT, POST , PATCH, DELETE')
		return res.status(200).json({});
	}
    next()
 });




app.use(cors())


app.post('/register',cors(), (req, res) => {
	//console.log(req.body.orderid,"wwwwwwwwwwwwwwwwwww")
	console.log(req.body.name,req.body.email,req.body.phone)
	return res.status(200).send('Inserted')
  
})
  




app.listen(3000,()=>{
	console.log("server is running on port 3000")
})