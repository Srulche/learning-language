const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User = require('./src/models/User')
const populateDataset = require('./populate.development')
const LanguageModel = require('./src/models/Language')
const LevelModel = require('./src/models/Level')
const SubscriptionModel = require('./src/models/Subscription')
const LessonModel = require('./src/models/Lesson')

dotenv.config()

const MONGO_URI =  process.env.NODE_ENV === 'production' ?  process.env.PRODUDCTION_MONGO_URI : process.env.DEVELOPMENT_MONGO_URI
const POPULATE_DB = process.env.POPULATE_DB



mongoose.connect(MONGO_URI).then(async () => {
    console.log("Connected texistingUsero MongoDB")

    try {
        if(process.env.NODE_ENV === 'development') {
            await User.deleteMany({})
            await LessonModel.deleteMany({})
            await LevelModel.deleteMany({})
            await LanguageModel.deleteMany({})
            await SubscriptionModel.deleteMany({})
        }
        if(POPULATE_DB) {
            console.log("Populating dataset")
            await populateDataset()
            console.log("Populated initial dataset") 
        }

    // admin user
     await User.create({
            name: "Ron1",
            email: "ron1@gmail.com",
            is_admin: true,
            password:"123456"
        })
    } catch(e) {
        console.log(e)
    }
})