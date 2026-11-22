// so chat.js created first ..first structure then insert data chat.js creates the structure/model → init.js uses that model to insert data → MongoDB stores the data.
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");// insert data based on (chat.js file schema) which i have designed..It uses the Chat model to insert actual data into MongoDB.

main()
 .then(()=> {
    console.log("connection successful"); 
})
.catch(err => console.log(err)); 

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');  
}

let allChats = [
    {
        from: "neha",
        to: "pritam",
        msg: "Send me notes",
        created_at: new Date(),
    },

      {
        from: "rohit",
        to: "piku",
        msg: "Send me notes book",
        created_at: new Date(),
    },

      {
        from: "anita",
        to: "pri",
        msg: "Send me link",
        created_at: new Date(),
    },

      {
        from: "ruhi",
        to: "sam",
        msg: "Send me notes format",
        created_at: new Date(),
    },
];


Chat.insertMany(allChats);
