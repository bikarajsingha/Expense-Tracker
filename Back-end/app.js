const express = require('express')
const bodyParser = require('body-parser')

const userRouter = require('/routes/userRoute')

const app = express()

app.use(bodyParser.json())

app.use('/user', userRouter)

app.get('*', (req, res) => {
    res.send('<h1 style="max-width: 300px; margin: 0px auto; margin-top: 150px;">Welcome to Server</h1>')
})

app.listen(3000)