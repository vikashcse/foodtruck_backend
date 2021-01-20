const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/foodtruck', {useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
	if(!err)
		console.log('Data base Connected...')
	else
		console.log("Error :"+ JSON.stringify(err,undefined,2));
});

module.exports=mongoose