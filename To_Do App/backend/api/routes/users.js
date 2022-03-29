var express = require('express');
var userModel = require('../models/user');
var adminModel = require('../models/admin');
var router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');


//storage for images

const Storage = multer.diskStorage({
  destination: function(req,file,callback){
    callback(null,"./public/Uploads/Images");
  },
  filename:function(req,file,callback){
    callback(null,file.fieldname+"_"+Date.now()+"_"+file.originalname);
  }
})

//Upload parameter for multer

var upload = multer({
  storage:Storage,
}).single("image");

// Email Validation

function checkEmail(req,res,next){
  var email=req.body.email;
  var checkexitemail=userModel.findOne({email:email});
  checkexitemail.exec((err,data)=>{
 if(err) throw err;
 if(data){
  return res.status(200).json({
    msg:"Email Already Exits",
    results:data
});
 }
 next();
  });
}

// User Registration

router.post('/users',upload, checkEmail, function(req, res, next) {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if(err){
      res.status(400).json({
            msg:"Something Wrong, Try Later!",
            results:err
        });
    }
    else{
      var userDetails = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        image: req.file.filename,
        role:'Employee'
      });
     
      userDetails.save().then(resResult=>{
        res.status(201).json({
            msg:"User Created Successfully",
            results:resResult,
            status:'success'
        });
    })
    .catch(err=>{
        res.json(err);
    });
    
  }
}); 
});

// User Login

router.post("/login",function(req,res,next){
  var email=req.body.email;
  userModel.find({email:email})
  .exec()
  .then(user=>{
      if(user.length<1){
          res.status(200).json({
            msg:"Incorrect Username and Password",
            UserData:'',
            status:'error'
          });
      }else{
          bcrypt.compare(req.body.password, user[0].password, function(err, result) {
             if(err){
              res.json({
                msg:"Incorrect Username and Password",
                UserData:'',
                status:'error'
              });
             }
             if(result){
              res.status(200).json({
                msg:"User Login Successfully",
                  UserData:user,
                  status:'success'
              });
             }else{
              res.json({
                msg:"Incorrect Username and Password",
                UserData:'',
                status:'error'
              });
             }
          });
      
  }
  })
  .catch(err=>{
      res.json({
          error:err
      });
  })
});
// User Dashboard

/* GET tasks listing. */

router.get('/users/:listId/tasks', (req, res, next)=> {
  adminModel.find({
    _UserID:req.params.listId
  }).then((tasks)=>{
    res.send(tasks);
  })
});


router.get('/users/:listId/taskss', (req, res, next)=> {
  adminModel.find({
    _UserID:req.params.listId,
    completed:false
  }).then((tasks)=>{
    res.send(tasks);
  })
});


router.get('/users/:listId/tasksss', (req, res, next)=> {
  adminModel.find({
    _UserID:req.params.listId,
    completed:true
  }).then((tasks)=>{
    res.send(tasks);
  })
});




module.exports = router;
