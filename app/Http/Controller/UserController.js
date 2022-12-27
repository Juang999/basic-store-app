const { User } = require('../../../models')
const argon2 = require('argon2')

const UserController = {
    index: async (req, res) => {
        try {
            let user = await User.findAll()

            res.status(200)
                .json({
                    status: "success",
                    message: "success to get data user",
                    result: user
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: "failed",
                    message: "failed to get data user",
                    error: error.message
                })
        }
    },
    register: async (req, res) => {
        try {
            let hashedPassword = await argon2.hash(req.body.password)

            User.create({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                
            })
        } catch (error) {
            
        }
    }
}

module.exports = UserController