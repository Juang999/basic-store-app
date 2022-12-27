const jwt = require('jsonwebtoken')
const { User } = require('../models')

const auth = async (req) => {
    const authenticator = req.headers['authorization']
    const token = authenticator && authenticator.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    const auth = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findOne({
        where: {
            id: auth.id
        },
        attributes: ['id', 'name', 'username', 'email', 'phone']
    })

    return user
}

module.exports = auth