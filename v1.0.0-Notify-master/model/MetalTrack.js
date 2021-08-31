const mongoose=require('mongoose');
const MetalSchema=new mongoose.Schema({
user_id:{
    required:true,
    type:String
},
weight:{
    required:true,
    type:String
},
metal_type:{
    required:true,
    type:String
},
currency:{
    required:true,
    type:String
},
current_price:{
    required:true,
    type:Number
}
});


module.exports=mongoose.model('MetalTrackinginfo',MetalSchema);