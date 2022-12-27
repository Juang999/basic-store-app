require('dotenv').config()

const { User } = require('../../../models')
const argon2 = require('argon2')
const { access } = require('fs')
const jwt = require('jsonwebtoken')
const auth = require('../../../tools/auth')

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

            let user = await User.create({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                password: hashedPassword
            })

            res.status(200)
                .json({
                    status: 'success',
                    message: 'registration successfully',
                    account: user
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: 'failed',
                    message: 'registration failed',
                    error: error.message
                })
        }
    },
    login: async (req, res) => {
        try {
            let account = await User.findOne({
                where: {
                    email: req.body.email
                },
                attributes: ['id', 'email', 'password']
            })

            if (!account) {
                res.status(300)
                    .json({
                        status: 'rejected',
                        message: "your email or password doesn't match"
                    })

                return;
            }

            let verify = argon2.verify(account.password, req.body.password)

            if (verify == false) {
                res.status(300)
                    .json({
                        status: 'rejected',
                        message: "your email or password doesn't match"
                    })

                return;
            }

            let user = {id: account.id, email: account.email, password: account.password}

            let accessToken = await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "7 days"})

            res.status(200)
                .json({
                    status: 'success',
                    message: 'logged in',
                    accessToken: accessToken
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: 'failed',
                    message: 'failed to logged in',
                    error: error.message
                })
        }
    },
    profile: async (req, res) => {
        try {
            let user = await auth(req)

            res.status(200)
                .json({
                    status: 'success',
                    message: 'success to get profile',
                    profile: user
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: 'failed',
                    message: 'failed to get profile',
                    error: error.message
                })
        }
    },
    update: async (req, res) => {
        try {
            let user = await auth(req)
            console.log(user.id)
            
            await User.update({
                name: (req.body.name) ? req.body.name : user.name,
                username: (req.body.username) ? req.body.username : user.username,
                email: (req.body.email) ? req.body.email : user.email,
                phone: (req.body.phone) ? req.body.phone : user.phone,
            },{where: {
                    id: user.id
                }
            })

            res.status(200)
                .json({
                    status: 'success',
                    message: 'success to update your profile',
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: 'failed',
                    message: 'failed to update your profile',
                    error: error.message
                })
        }
    }
}

module.exports = UserController