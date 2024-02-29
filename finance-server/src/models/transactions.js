const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  amount: {
    type: Number,
    required: true,
    maxlength: 20,
  },
  type:{
    type: String,
    required: true,
  },
  date:{
    type: Date,
    required: true,
    trim:true,
  },
  category: {
    type: String,
    required: true,
    maxlength: 20,
  },
  description: {
    type: String,
    required: true,
    maxlength: 20,
  },
},{timestamps:true});

const transactions=new mongoose.model('Income',transactionSchema);
module.exports=transactions;