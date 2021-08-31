const mongoose=require('mongoose');
const feedback=new mongoose.Schema({
userEmail:{
    required:true,
    type:String
},
userName:{
    required:true,
    type:String
},

feedback:{
    required:true,
    type:String
},
rating:{
    type:Number
}
});

module.exports=mongoose.model('feedback',feedback)