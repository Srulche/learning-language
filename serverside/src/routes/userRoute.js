
const express = require('express'), router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/authMiddaleware')
const { createResponse } = require('../utils')


router.post("/sign-up", async (req, res) => {
    try {
        const newUser = await userController.signUp(req.body)
        return res.status(201).json(createResponse(newUser, 201))
    } catch(e) {
        return res.status(400).json(createResponse(null, 201, e))
    }
})

router.post("/sign-in", async (req, res) => {
    try {
        const access_token = await userController.signIn(req.body)
        return res.status(201).json(createResponse({ access_token }, 201))
    } catch(e) {
        return res.status(400).json(createResponse(null, 201, e))
    }
})


router.get("/me", auth, 
/** @param {{user: {id: string, is_admin: boolean}}} req  */
async (req, res) => {
    try {
        const user = await userController.me(req.user)
        return res.status(201).json(createResponse({ user }, 201))
    } catch(e) {
        return res.status(400).json(createResponse(null, 201, e))
    }
})

module.exports = router