const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')

dotenv.config()

const createResponse = (data, status, error = null) => {
    return {
        data,
        status,
        error
    }
}



const createToken = (body) => {
    return jwt.sign(body, process.env.SECRET, {
        expiresIn: "2d"
    })
}

const decodeToken = (token) => {
    return jwt.decode(token)
}

module.exports = {
    createResponse,
    decodeToken,
    createToken
}