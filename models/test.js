const mongoose=require('mongoose')

const testform = mongoose.model('testform',{
	fname:{type:String},
	lname:{type:String},
	email:{type:String},
	phone:{type:String}
});

module.exports= {
	testform
};