import mongoose from 'mongoose'
const WhatsappSchema = new mongoose.Schema({

    message:String,
    name:String,
    timeStamp : String,
    recieved : Boolean,
    
})

export default mongoose.model("messagecontent",WhatsappSchema)