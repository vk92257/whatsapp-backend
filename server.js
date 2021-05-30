import dotenv from 'dotenv';
dotenv.config()
import express from "express";
import mongoose from 'mongoose';
import messageRoute from './route/messagesRoute.js'
import Pusher from 'pusher'
import cors from 'cors'
const app = express();

app.use(cors())
app.use(express.json())

//app configration

const pusher = new Pusher({
    appId: "1211171",
    key: "55d84ac3c86ba3931144",
    secret: "0c860dcc15eac53cfdd9",
    cluster: "ap2",
    useTLS: true
  });


// const pusher = new Pusher({
//     appId: process.env.PUSHER_APP_ID,
//     key:process.env.PUSHER_KEY ,
//     secret: process.env.PUSHER_SECERET,
//     cluster: process.env.PUSHER_CLUSTER,
//     useTLS: process.env.PUSHER_USETLS
//   });


  const db = mongoose.connection;
  db.once("open",()=>{
      console.log('db is connected');
  const msgCollection = db.collection("messagecontents")
  const changeStream = msgCollection.watch();

    changeStream.on("change",change=>{
        console.log(change);

         if (change.operationType === "insert") {
             const messageDetails = change.fullDocument;
             pusher.trigger("messages",'inserted',{
                 name:messageDetails.name,
                 message: messageDetails.message,
                 timeStamp:messageDetails.timeStamp,
                 recieved: messageDetails.recieved
             });
         } else {
             console.log('error triggering Pusheer');
         }
    })
    
    })



// connecting to the database

const dbUserName = process.env.DB_USER_NAME;
const dbPassword = process.env.DB_PASSWORD;

// mongodb+srv://Vivek:<password>@cluster0.y8bzx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const DB = `mongodb+srv://${dbUserName}:${dbPassword}@cluster0.y8bzx.mongodb.net/WhatsappDataBase?retryWrites=true&w=majority`;
mongoose.connect(DB).then((con) => {
    console.log('connection is established');
  });


app.get("/",(req,res)=>{
    res.status(200).json({
        status:"succes",
        message:"hello this  "
    })
})



    app.use('/api/v1/messages',messageRoute)
   

let Port = process.env.PORT
app.listen( Port , ()=>{
    console.log(`App is Running  ${Port}`);
})