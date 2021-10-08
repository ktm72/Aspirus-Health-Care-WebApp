const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const ProductSchema = new Schema({      
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    imgUrl: {
        type: String,
        required: false
    },
    
});

const Product = mongoose.model("product",ProductSchema) 
module.exports = Product