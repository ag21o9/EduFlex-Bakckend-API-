const express = require('express');
const cookie = require('cookie-parser');
const connectdb = require('./config/connect');
const env = require('dotenv').config();


connectdb();

const app = express();
const PORT = process.env.PORT || 3000; 


// app.set('view engine','ejs');
// app.use(express.static('public'))
// Ensuring Body-parser works properly
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookie());
app.use('/',require('./routes/userRoute'));
app.use('/courses',require('./routes/coursesRoute'));


// Express Error Handler
app.use((err,req,res,next)=>{
    res.json({error : "Internal Error Occured"});
    console.log(err.message)
})

app.listen(PORT,()=>{
    console.log("App Listening on Port " + PORT);
})