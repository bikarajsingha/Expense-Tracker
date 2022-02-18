const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const sequelize = require('./util/database')
const User = require('./models/user')
const Expense = require('./models/expense')
const Order = require('./models/order')

const userRouter = require('./routes/userRoute')
const expenseRouter = require('./routes/expenseRoute')
const purchaseRouter = require('./routes/purchaseRoute')
const passwordRouter = require('./routes/passwordRoute')

const auth = require('./middlewares/auth')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/user', userRouter)
app.use('/password', passwordRouter)
app.use('*', auth.authenticate)
app.use('/expense', expenseRouter)
app.use('/purchase', purchaseRouter)

app.get('*', (req, res) => {
    res.send('<h1 style="max-width: 400px; margin: 0px auto; margin-top: 150px;">Welcome to Server</h1>')
})

User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

sequelize.sync()
.then(_ => {
    app.listen(3000)
})
.catch(err => console.log("SEQUELIZE SYNC ERROR: ",err))
