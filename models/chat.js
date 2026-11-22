//we do not have to estanlish connection on mongoosh for that model because we will require that file inside index.js file 
//Main task will happen on index.js file we make that model for chat only
const mongoose = require("mongoose");
// so before making model we need to create scehma 
// this is the chat schma but main task we did in index.js file by using that schmea (insert the data)
//because if we not insert the data then in shell whatsapp db won't be shown
const chatSchema = new mongoose.Schema({ // here is our chat schema 
    from : { // message sender
        type: String,
        required: true,
    },
    to : { // reciver
        type: String,
    },
    msg:{
        type:String,
        maxLength: 50,
    },
    created_at: {
        type:Date,
    }
})

const Chat = mongoose.model("Chat",chatSchema);

module.exports = Chat;
// this is for define structure 