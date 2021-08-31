const mongoose=require('mongoose');
const messages=new mongoose.Schema({
userEmail:{
    required:true,
    type:String
},
message:{
    required:true,
    type:String
}
});


module.exports=mongoose.model('message',messages);