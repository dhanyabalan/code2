
const nodemailer = require('nodemailer');
  const express = require('express');
  const bodyParser = require('body-parser');
  const multer = require('multer');
  const app = express()
  app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(bodyParser.json())


var to;
var subject;
var body;

var Storage=multer.diskStorage({
    destination:function(req,mail,callback){
        callback(null,"./email");
    }
})
var upload = multer({
    storage: Storage
}).single("email");

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/sendemail',(req,res) => {
    upload(req,res,function(err){
        if(err){
            console.log(err)
            return res.end("Something went wrong!");
        }else{
            to = req.body.to
            subject = req.body.subject
            body = req.body.subject
           

            console.log(to)
            console.log(subject)
            console.log(body)
            console.log(req.mail)
           // console.log(req.files)
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'divyabalan1341994@gmail.com',
        pass: '4991431divya'
    }
    
      
});
  
let mailDetails = {
    from: 'divyabalan1341994@gmail.com',
    to: to,
    subject: 'code competition2',
    text: 'your mail successffully sent',
   
};
  
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
        
    }
});

        }
})
})


app.listen(5000,() => {
    console.log("App started on Port 5000")
})