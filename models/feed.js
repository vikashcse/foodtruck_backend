const mongoose=require('mongoose')

const feed = mongoose.model('feed',{
	name:{type:String},
	email:{type:String},
	Query:{type:String}
});

module.exports= {
	feed
};