var mongoose = require('mongoose');

//schema

var user_Schema = new mongoose.Schema({
     name:{
          type:String
     },
     email:{
          type:String
     },
     password:{
          type:String
     }
})

module.exports = mongoose.model('user',user_Schema)