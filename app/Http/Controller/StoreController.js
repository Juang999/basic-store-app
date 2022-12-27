const { Goods } = require('../../../models')

const storeController = {
    index: async (req, res) => {
        try {
            let goods = await Goods.findAll()
            
            res.status(200)
                .json({
                    status: 'success',
                    message: 'success to get goods list',
                    result: goods
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: 'failed',
                    message: 'failed to get goods list',
                    error: error.message
                })
        }
    },
    store: async (req, res) => {
        try {
            let store = Goods.create({
                name: req.body.name,
                price: req.body.price,
                amount: req.body.amount
            })

            res.status(200)
                .json({
                    status: 'success',
                    message: 'success to create goods in this store',
                    result: store
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: 'failed',
                    message: 'failed to create goods',
                    error: error.message
                })
        }
    }
}

module.exports = storeController