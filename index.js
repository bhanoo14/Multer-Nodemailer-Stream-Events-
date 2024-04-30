const fs = require('fs')
const multer = require('multer')
const formidable = require('formidable')
const nodeMailer = require('nodemailer')
const formidable = require('formidable');
const express = require('express');
const EventEmitter = require('events')
const app = express()

const event = new EventEmitter()

event.on('sayMyName', () => {
    console.log("I am your event Your Name is Bhanoo Vishwakarma");
})

app.get('/sayMyName', (req, res) => {
    event.emit("sayMyName")
    res.send("I am Listening your Event on sayMyName route")
})


// Sending Mail to client Using NodeMailer
const mailHandlerX = (res) => {

    const auth = nodeMailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: "151mc00003@gmail.com",
            pass: "edtb iplu pzpg uvao"
        }
    });

    const myMail = {
        from: "151mc00003@gmail.com",
        to: "bhanoolohar007@gmail.com",
        subject: "this for Testing of Node Mailer",
        message: "Hello Bhaanoo Vishwakarma I am just doing testing of node mailer"
    }

    auth.sendMail(myMail, (error, info) => {
        if(error){
            throw error
        }
        else {
            console.log("Mail has sent to the client", info);
        }
    })
}

app.get('/sendMail', (req, res) => {
    mailHandlerX(res);
    res.send("Mail Has sent to the client")
})


// Multer Practices
const storageX = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function (req, file, cb){
        cb(null, file.filename + "-" + Date.now() + ".jpg")
    }
})

const fileUpload = multer({ storageX })

app.get('/', fileUpload.single("image"), (req, res) => {
    res.send("File uploaded Successfully")
})

// File Stream or Reading very big file into chunkssssss
app.get('/', (req, res) => {
    res.set({ 'Content-type' : "text/plain" })

    xstream = fs.createReadStream("./example.txt", 'utf-8')

    xstream.on( "data", (Chunck) => {
        res.write(Chunck)
    })

    xstream.on( "end", () => {
        res.end()
    })

    xstream.on( "error", (error) => {
        res.send().status(400)
        console.log("Something went wrog", error)
    })

    xstream.pipe(res)
})
app.get('/', (req, res) => {
    res.set({ 'Content-type' : "text/plain" })

    xstream = fs.createReadStream("./example.txt", 'utf-8')

    xstream.on( "data", (Chunck) => {
        res.write(Chunck)
    })

    xstream.on( "end", () => {
        res.end()
    })

    xstream.on( "error", (error) => {
        res.send().status(400)
        console.log("Something went wrog", error)
    })

    xstream.pipe(res)
})

app.listen(3000, () => {
    console.log("Sevrer is running at PORT: 3000");
})
