const mongoose = require('mongoose');

const customersSchema = new mongoose.Schema({
    name:{type:String , required:true },
    image:{type:String, required:false}
});


const Customers = mongoose.model("customer", customersSchema);


module.exports = Customers;
