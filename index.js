const express = require ("express"); // here requiring express 
const app = express(); // and withthat express we created app
const mongoose = require("mongoose"); // requiring mongoose
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");//requiring methodOverride package

app.set("views", path.join(__dirname, "views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "public")));//here we make connection that public folder where has css file ...(linking)
app.use(express.urlencoded({ extended: true}));//for access the data which came from req.boby
app.use(methodOverride("_method"));//after requiring methodOverride we need to use that package also 

main() .then(()=> {
    console.log("connection successful"); // connection from mongoose 
})
.catch(err => console.log(err)); // here just paste that systex from mongoose it's help connect with the server 

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp'); // now db is cerated 
}

//Index Route
app.get("/chats",async (req ,res)=>{
    let chats = await Chat.find();// that helps to find all data from chat model
    console.log(chats);
    res.render("index.ejs",{ chats });
});

//New Route
app.get("/chats/new", (req,res) => {
    res.render("new.ejs");//here in new.ejs file we created a from 
});

//Create Route
app.post("/chats",(req,res)=>{ 
    let {from, to, msg}= req.body; // so when post req came we need to acess our from data
    let newChat = new Chat ({ // cretae new chat object
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });

    newChat.save() // here saving that chat 
    .then((res)=>{ // here we use then so no need to add await function (then means we using asincronus function coz js know then meaning asincronus function is happening )
        console.log("chat was saved");
    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats"); //here we redircet /chats(same page)
})

//Edit Route
app.get("/chats/:id/edit", async (req,res) =>{
    let {id} = req.params; // so for that parameter we have get id 
    let chat = await Chat.findById(id);//(and by bases of that id we find chat in db) and this is findbyid so we are searching in our db 
    // and it's asincronous function so here we not using .then so we need to here use await 
    res.render("edit.ejs",{chat});
});

//Update Route
 app.put("/chats/:id", async (req,res) =>{ // async use here because of await
     let {id} = req.params;//Here at first we extract our id 
     let { msg : newMsg} = req.body;//Here we extract msg from our body
     // here at first with the help of id we find our document and update simple
     let updateChat = await Chat.findByIdAndUpdate( // this is for our updated chat || findByIdAndUpdate it's our asincronous function so use await
        id,
        {msg:newMsg},
        {runValidators: true, new : true}
     );
     console.log(updateChat);// here we simply print our updateChat
     res.redirect("/chats");
 });

 //Destroy Route
   app.delete("/chats/:id", async (req,res)=>{ // and obiously here async function needed because we deal with db
     let {id} = req.params; // same here we extract id first
     let deletedChat = await Chat.findByIdAndDelete(id); // Here we want first find that id and delete so use findByIdAndDelete function
     console.log(deletedChat);
     res.redirect("/chats");
   });

let chat1 = new Chat({ // first make that schma in chat.js...then we use it here (insert data)
    from: "neha",
    to:"priya",
    msg: "Send me your exam sheet",
    created_at: new Date()
});

chat1.save().then((res)=>{
    console.log(res);
});

app.get("/",(req,res) => { // we also created basic rout
    res.send("root is working");
});

app.listen(8080,() => {
    console.log("Server is listening on port 8080");
});