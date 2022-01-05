import express from 'express'

import routeLogin from './login'
import routeBiker from './biker'

const app = express()

app.use('/login', routeLogin)
app.use('/biker', routeBiker)

module.exports = app
