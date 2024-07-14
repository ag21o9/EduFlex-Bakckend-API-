const mongoose = require('mongoose');

const connectdb = async ()=>{
    try{
        const connection = await mongoose.connect("mongodb://localhost:27017/eduflex");
    }
    catch{
        console.log("Some Error Occured");
    }
}

module.exports = connectdb;