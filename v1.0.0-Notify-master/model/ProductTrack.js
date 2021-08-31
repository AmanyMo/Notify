const mongoose=require('mongoose');
const ProductSchema=new mongoose.Schema({
user_id:{
    required:true,
    type:String
},
product_link:{
    required:true,
    type:String
},
product_price:{
    required:true,
    type:Number
},
product_name:{
    required:true,
    type:String
},
product_currency:{
    required:true,
    type:String
},
product_image:{
    required:true,
    type:String 
}
});


module.exports=mongoose.model('ProductTrackingInfo',ProductSchema);