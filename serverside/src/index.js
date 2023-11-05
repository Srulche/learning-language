const cors = require("cors")
const express = require('express')
const dotenv = require('dotenv')
const userRoute = require('./routes/userRoute')
dotenv.config()

const app = express()

app.use(cors())
// built=in bodyparser
app.use(express.json())


app.use("/user", userRoute)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
    require('../db')
})
