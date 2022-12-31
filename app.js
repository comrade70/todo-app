const express = require("express");
const dotenv = require("dotenv")

dotenv.config();
const mongoose = require("mongoose");

//initialize app with express
const app = express();

//connection to mongo db
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB); 
        console.log("connected to mongoDB!")
    }   catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected")
})


//middleware
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs');

//routes
app.use(require("./routes/index"));
app.use(require("./routes/todo"))


//server configuration
app.listen(3000, () => {
    connect() 
    console.log("Connected to server");
});
