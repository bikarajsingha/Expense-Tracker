const express = require('express')

const app = express()



app.get('*', (req, res) => {
    res.send('<h1 style="max-width: 300px; margin: 0px auto; margin-top: 150px;">Welcome to Server</h1>')
})

app.listen(3000)