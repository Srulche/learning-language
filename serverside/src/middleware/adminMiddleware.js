const { decodeToken, createResponse } = require("../utils")

function adminMiddleware(req, res, next) {

    try {
        const auth_header = req.headers['Authorization']
        const token = auth_header.split("Bearer ")[1]

        /** @type {{id: string, is_admin:boolean} | null}  */
        const decoded = decodeToken(token)

        if(!decoded.is_admin) {
            throw new Error("Unauthorized request")
        }
        req.user = decoded
        next()
    } catch(e) {
        return res.status(401).json(createResponse(null, 401, e))
    }
}

module.exports = adminMiddleware