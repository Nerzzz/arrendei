const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    uid:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    cell:{
        type: String,
        required: true
    },
    posts:{
        type: Number,
        required: false,
        default: 0
    },
    image:{
        type: String,
        required: false,
        default: "/images/user-placeholder-image.png"
    }
})

module.exports = mongoose.model("User", userSchema)