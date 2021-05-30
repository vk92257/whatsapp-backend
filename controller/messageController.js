import mongoose from 'mongoose'
import Message from '../model/messages.js'

export const sendNewMessage =  async (req,res)=>{

    try{
           const message = await Message.create(req.body);

           res.status(201).json({
               status: "success",
               message: 'message sent',
               details:message
           })
               
          
    }
    catch(e){
        console.log(e);
        res.status(400).json({
            status:"error",
            message:e
        });    
    }
} 

export const getAllMessage =  async (req,res)=>{

    try{
           const message = await Message.find();

        res.status(200).json({
               status: "success",
               message: 'message sent',
               details:message
           })
               
          
    }
    catch(e){
        console.log(e);
        res.status(400).json({
            status:"error",
            message:e
        });    
    }
} 