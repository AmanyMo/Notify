const mongoose=require('mongoose');


const WebsiteSchema=new mongoose.Schema({
    website_name:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    logo:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('websites',WebsiteSchema,'websites');