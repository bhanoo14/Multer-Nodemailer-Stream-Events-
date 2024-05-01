const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const EventEmitter = require('events');
const fs = require('fs');

const app = express();

const event = new EventEmitter();

event.emit("sayHello")
event.on('sayHello', ()=>{
    console.log("Hello Bhaano Vishwakarma");
})


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        cb(null, file.filename + "-" + Date.now() + ".jpg")
    }
})

const uploader = multer({storage})


app.get('/', uploader.single("image"), mailHandler, (req, res)=>{
    res.send("Hello World I am Bhaanoo Vishwakarma")
    // file will be served here
})

function mailHandler(res){

    const authX = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: "151mc00003@gmail.com",
            pass: "edtb iplu pzpg uvao"
        }
    })

    const myMail = {
        from: "151mc00003@gmail.com",
        to: "bhanoolohar007@gmail.com",
        subject: "Testing NodeMailer service from Google Mail",
        message: "Hello Bhaanoo Vishwakarma I am just testing this mail Service"
    }

    authX.sendMail(myMail, (error, info)=>{
        if(error) throw error
        else{
            console.log("mail Sent successfully", info);
        }

    })
}

app.listen(3000, ()=>{
    console.log("Server is running @ Port: 3000");
})