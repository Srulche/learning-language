const jwt = require('jsonwebtoken')
const {default: axios} = require('axios')
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


async function wait(timeout) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout)
    },)
}


// TODO: Fix translation api
async function translate(word, source, target) {
    const encodedParams = new URLSearchParams();
    encodedParams.set('q', word);
    encodedParams.set('target', target);
    encodedParams.set('source', source);
    
    const options = {
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': process.env.TRANSLATION_API_KEY,
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      data: encodedParams,
    };
    const response = await axios.request(options)
    
    return response.data.translations[0].translatedText
}

module.exports = {
    createResponse,
    decodeToken,
    createToken,
    translate,
    wait
}