var express = require('express');
var bodyParser = require('body-parser');
 var mongoose = require('mongoose')
 var model = require('./schema.js')
var bcrypt = require('bcrypt');
var cors=require('cors');
var nodemailer=require('nodemailer');
  const saltRounds = 10;
  var email;
   var app = express();
// app.use(express.static(__dirname,{index:'index.html'}))
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
var url = "mongodb://127.0.0.1:27017/employee";
mongoose.connect(url)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connection Successful!");
});

// const multer = require('multer');
// var crypto=require('crypto');
// var mime=require('mime');
// var path=require('path');
// var DIR = './public/uploads/';

// const storage = multer.diskStorage({
//   destination: function(req, image, cb) {
//     cb(null,  DIR);
//   },
//   filename: function(req, image, cb) {
//     // cb(null, new Date().toISOString() + image.originalname);
    // crypto.pseudoRandomBytes(16, function (err, raw) {
    //   cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(image.mimetype));
    // });
var users = mongoose.Schema( {
    name: String,
    email: String,
    phno : String,
    dob: String,
    role :String,
    password:String
});
var User =module.exports= mongoose.model("collection",users);
/*
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html')
})*/


//password generator


const PasswordGenerator = require('strict-password-generator').default;
 
// FOR ADDING EMP 
app.post('/signup', function (req, res,next) {

 
const passwordGenerator = new PasswordGenerator();
 
const options = {
  upperCaseAlpha   : true,
  lowerCaseAlpha   : true,
  number           : true,
  specialCharacter : false,
  minimumLength    : 6,
  maximumLength    : 8
}
 
var password = passwordGenerator.generatePassword(options);
 
console.log(password); // example string : qa5859qoz8



 
 
 
    console.log("sign Test")
    var myData = new User(req.body);
    myData.password = password;
   var email = myData.email;

console.log(email)
    // // bcrypt.hash('secret key',saltRounds,function(err,hash){
    //     if(err) throw err;
    //     myData.password = hash;
    //     console.log(myData.password);
    myData.save(function(err,data){
        if(err) throw err;
        res.send(data);
        console.log(data);
})


var nodemail;
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: 'true',
    auth: {
        user: 'bhagchandanivishalkumar@gmail.com',
        pass: 'vishal21'
    },
    tls:{
        rejectUnauthorized: false
    }
});



let mailOptions = {
            from: 'bhagchandanivishalkumar@gmail.com', // sender address
            to: email, // list of receivers
            subject : password, // Subject line
            text:"your password is "+ myData.password, // plain text body
            
            
     
        };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("sent");
            console.log(info);
            res.send("true");
        }
    });



})



// app.post('/admin/add', function (req, res,next) {

 
//     const passwordGenerator = new PasswordGenerator();
     
//     const options = {
//       upperCaseAlpha   : true,
//       lowerCaseAlpha   : true,
//       number           : true,
//       specialCharacter : false,
//       minimumLength    : 6,
//       maximumLength    : 8
//     }
     
//     var password = passwordGenerator.generatePassword(options);
     
//     console.log(password); // example string : qa5859qoz8
    
    
    
     
     
     
//         console.log("sign Test")
//         var myData = new User(req.body);
//         myData.password = password;
//        var email = myData.email;
    
//     console.log(email)
//         // // bcrypt.hash('secret key',saltRounds,function(err,hash){
//         //     if(err) throw err;
//         //     myData.password = hash;
//         //     console.log(myData.password);
//         myData.save(function(err,data){
//             if(err) throw err;
//             res.send(data);
//             console.log(data);
//     })
    
    
//     var nodemail;
//     var transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 465,
//         secure: 'true',
//         auth: {
//             user: 'bhagchandanivishalkumar@gmail.com',
//             pass: 'vishal21'
//         },
//         tls:{
//             rejectUnauthorized: false
//         }
//     });
    
    
    
//     let mailOptions = {
//                 from: 'bhagchandanivishalkumar@gmail.com', // sender address
//                 to: email, // list of receivers
//                 subject : password, // Subject line
//                 text:"your password is "+ myData.password, // plain text body
                
                
         
//             };
    
//         transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log("sent");
//                 console.log(info);
//                 res.send("true");
//             }
//         });
    
    
    
//     })
    




// // 'use strict';
// const nodemailer = require('nodemailer');

// // Generate test SMTP service account from ethereal.email
// // Only needed if you don't have a real mail account for testing
// nodemailer.createTestAccount((err, account) => {
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: "yagnesyagne87@gmail.com", // generated ethereal user
//             pass: "yagi542@#" // generated ethereal password
//         }
//     });

//     // setup email data with unicode symbols
//     let mailOptions = {
//         from: "yagnesyagne87@gmail.com", // sender address
//         to: 'madinelalitha54@gmail.com ', // list of receivers
//         subject : 'Hello ✔', // Subject line
//         text: 'Hello world?', // plain text body
//         html: '<b>Hello world?</b>' // html body
//     };

//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//         // Preview only available when sending through an Ethereal account
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//         // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//     });
// });

var users1 = mongoose.Schema( {
    email: String,
    pswd: String
});
var User1 = mongoose.model("collects",users1);



app.post('/login', function (request, response,next) {
    var myDataa = new User1(request.body);
    myDataa.save(function(err,data){
        if(err) throw err;
        response.send(data);        
        console.log(data);
    })
})




// var a = {
    //     name: req.body.name,
    //     email: req.body.email,
    //     phno : req.body.phno,
    //     dob : req.body.dob,
    //     role : req.body.role
    // }
//     console.log(a)
//     model.save(a, function (err, data) {
//         if (err) console.log(err)
//         else
//             console.log(data)
//         res.send("Hey! you've successfully inserted a document")
//     })
// })
//values retrieved i mean login 
app.post("/view", function (req, res) {
     var email = req.body.email;
    var pswd = req.body.pswd;
    
    console.log(JSON.stringify(req.body))
    var a = {
        email: email,
        password: pswd
    }
    User.findOne(a, function(err, data) {
        if (err) {
            console.log(err)
            alert('sorry')
        }
        else {
            if(this.email=="" || this.pswd=="")
            {
                console.log(err)
            alert('sorry')
            }
            console.log(data)
            res.json(data.role);

 
           /* console.log("hello",data.role)
            res.json({"role":data.role})
*/
        }
    })
})


app.post("/search", function (req, res) {
    var email = req.body.email;
  
   
   console.log(JSON.stringify(req.body))
   var a = {
       email: email,
   }
   User.findOne(a, function(err, data) {
       if (err) {
           console.log(err)
       }
       else {
           console.log(data)
           res.json(data);


          /* console.log("hello",data.role)
           res.json({"role":data.role})
*/
       }
   })
})



//SEARCH EMPLOYEE BY EMAIL

app.post("/emp/search", function (req, res) {
    var name = req.body.name;
//    var pswd = req.body.pswd;
   
   console.log(JSON.stringify(req.body))
   var a = {
       name : name,
    //    password: pswd
   }
   User.findOne(a, function(err, data) {
       if (err) {
           console.log(err)
       }
       else {
           console.log(data)
           res.json(data)


          /* console.log("hello",data.role)
           res.json({"role":data.role})
*/
       }
   })
})



//update status pending
// app.post('/signup', function (req, res,next) {
    
//     console.log("sign Test")
//     var myData = new User(req.body);





app.post('/delete/:email', function (req, res) {
    //res.send("delete");
    console.log(req.body.email);
    User.remove({"email" : req.body.email}, function (err, data) {
       console.log("delete");
        if (err) {
            res.send("Heyy! someting went wrong");
        }
        else {
            console.log(data);
            res.json({msg:"Heyy! you've deleted one record",data:data});
        
        }
    })
})

app.get('/api' , function(req, res){
    console.log("Hey");
    res.send("Hello");
    })                                                                          




    // var userupd = mongoose.Schema( {
    //     name: String,
    //     email: String,
    //     phno : String,
    //     dob: String,
    //     role :String,
    //     password:String
    // });
    // var emp = mongoose.model("employee",userupd);


//pending

//     app.post('/update/:email',function(req,res,next){
//         console.log(req.body)
// User.getUserByEmail(req.params.email,function(err,user){
// if(err)
// {
//     res.json({"error":error});
// }
// else if(!user){
//     res.json({msg:"employee not found"});

// }
//     else{
//             User.update({email:req.params.email}),
//           {
//             name: req.body.name,
//             email: req.body.email,
//             phno : req.body.phno,
//             dob: req.body.dob,
//             role :req.body.role,
//             password:req.body.password
//           },
//           function(err,result){
//               console.log(result);
//             if(err){
//               res.json(err);}
//             else if(result.n==1){
//               res.json({success:true,msg:"Updated"}); 
//             }
//             else{
//               res.json(result);
//             }
//           }
//         }    
//     })
// })
app.post('/update',function(req,res,next){
    User.update({email:req.body.email},{$set:{phno:req.body.phno,name:req.body.name,address:req.body.address}},function(err,data){
        if(err){
            console.log("error");
        }
        else{
            res.send(data);
        }
    })
})

app.post('/updateemployee',function(req,res,next){
    User.update({email:req.body.email},{$set:{phno:req.body.phno,name:req.body.name,address:req.body.address}},function(err,data){
        if(err){
            console.log("error");
        }
        else{
            res.send(data);
        }
    })
// })
// app.post('/status',function(req,res)){

// }

app.post('/updateadmin',function(req,res,next){
    User.update({email:req.body.email},{$set:{phno:req.body.phno,role:req.body.role}},function(err,data){
        if(err){
            console.log("error");
            console.log(data);
        }
        else{
            res.send(data);
            console.log(data);
        }
    })
})
})
app.listen(2000, function () {
    console.log("Listening at 2000");
});