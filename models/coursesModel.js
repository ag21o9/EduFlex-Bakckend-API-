const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "users"
    },
    coursename : {
        type : String,
        required : true
    },
    courselink : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model("courses",courseSchema);