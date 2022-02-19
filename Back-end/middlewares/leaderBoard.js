const leaderBoardService = require('../services/leaderBoardService')

exports.updateAmount = async (req, res, next) => {
    try {
        const { expense } = req.body

        await leaderBoardService.updateExpenseAmount(req.user, expense)
        next()
    }catch(err) {
        console.log(err)
        return res.status(500).json({message: 'error'})
    }
}