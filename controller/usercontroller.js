var usermodel = require('../model/usermodel')

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.register_user = async (req, res) => {

     try {

          var data = await usermodel.findOne({ email: req.body.email })

          if (data) {

               res.status(200).json({
                    status: 'user already registered'
               });
          }

          else {
               var b_pass = await bcrypt.hash(req.body.password, 10)

               req.body.password = b_pass;

               var data = await usermodel.create(req.body)

               res.status(200).json({
                    status: 'success',
                    data
               })
          }

     } catch (error) {

          res.status(200).json({
               status: 'error'
          })

     }

}

exports.login_user = async (req,res) => {

     var userlogin = await usermodel.find({email: req.body.email})

     if(userlogin.length == 1) {

          bcrypt.compare(req.body.password, userlogin[0].password, function(err, result){

             if(result == true)  
             {

               var token = jwt.sign({ id: userlogin[0].id }, 'radhe');

               res.status(200).json({
                    status: 'login successfully',
                    token
               })
             }
             else {
               res.status(200).json({
                    status: 'check your email and password'
               })

             }
          })
     }
     else{
          res.status(200).json({
               status:'check your email and password'
          })
     }

}

exports.get_user = async (req, res) => {

     var data = await usermodel.find()

     res.status(200).json({
          status:'success',
          data
     })
}