const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User = require('./src/models/User')

dotenv.config()

const MONGO_URI = process.env.MONGO_URI


mongoose.connect(MONGO_URI).then(async () => {
    console.log("Connected to MongoDB")

    try {
        const existingUser = await User.create({
                name: "Ron1",
                email: "ron1@gmail.com",
                password:"123456"
            })

        console.log(existingUser)    
    } catch(e) {
        console.log(e)
    }
})