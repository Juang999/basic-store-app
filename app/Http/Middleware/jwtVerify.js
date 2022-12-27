const jwt = require('jsonwebtoken')
const authMiddleware = async (req, res, next) => {
    try {
        const authenticator = req.headers['authorization']
        const token = authenticator && authenticator.split(' ')[1]
        if (token == null) res.sendStatus(403)

        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)    
        req.user = user
        next()
    } catch (error) {
        res.status(403)
            .json({
                status: 'failed',
                message: 'unauthorized'
            })
    }
    
}

module.exports = authMiddleware