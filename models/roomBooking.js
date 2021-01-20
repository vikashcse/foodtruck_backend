const mongoose=require('mongoose')

const roomBooking = mongoose.model('roomBooking',{
	name:{type:String},
	email:{type:String},
	phone:{type:String},
	eventname:{type:String},
	msg:{type:String},
	amount:{type:String}
});

module.exports= {
	roomBooking
};