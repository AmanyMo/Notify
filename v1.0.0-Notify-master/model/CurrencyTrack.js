const mongoose=require('mongoose');
const CurrencySchema=new mongoose.Schema({
user_id:{
    required:true,
    type:String
},
from_currency:{
    required:true,
    type:String
},
to_currency:{
    required:true,
    type:String
},
current_price:{
    required:true,
    type:Number
}
});


module.exports=mongoose.model('CurrencyTrackingInfo',CurrencySchema);