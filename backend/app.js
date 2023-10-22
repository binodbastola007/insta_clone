const express = require("express");
const app = express();
const port = process.env.port || 5000;
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');

app.use(cors());
require('./models/model');
require('./models/post');
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require('./routes/user'));


mongoose.connect('mongodb://127.0.0.1:27017/DBname');

mongoose.connection.on("connected" , ()=> {
    console.log("Successfully connected to mongoose");
})
mongoose.connection.on("error" , ()=>{
    console.log("Not connected to mongodb");
})

// // serving the frontend
// app.use(express.static(path.join(__dirname,"./frontend/build")))
// app.get("*",(req,res)=>{
//     res.sendFile(
//      path.join(__dirname,'./frontend/bulid/index.html')
//      ,function(err){
//         res.status(500).send(err)
//      }
//      )
// })


app.listen(port, ()=> {
    console.log("Server is running on local machine on port:"+port);

})
