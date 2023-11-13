
const express = require('express'), router = express.Router()
const adminController = require('../controllers/adminController')
const { createResponse } = require('../utils')


router.post("/create-langauge", async (req, res) => {
    try {
        const newLanguage = await adminController.createNewLanguage(req.body)
        return res.status(201).json(createResponse(newLanguage, 201))
    } catch(e) {
        return res.status(400).json(createResponse(null, 201, e))
    }
})

router.put("/add-level/:languageId", async (req, res) => {
    try {
        const access_token = await adminController.addLevelToLanguage(req.params.languageId, req.body)
        return res.status(201).json(createResponse({ access_token }, 201))
    } catch(e) {
        return res.status(400).json(createResponse(null, 201, e))
    }
})

module.exports = router