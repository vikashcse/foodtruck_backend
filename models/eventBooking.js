const mongoose=require('mongoose')

const eventBooking = mongoose.model('eventBooking',{
	name:{type:String},
	email:{type:String},
	phone:{type:String},
	eventname:{type:String},
	msg:{type:String},
	amount:{type:String},

});

module.exports= {
	eventBooking
};