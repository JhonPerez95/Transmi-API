import express from 'express'

import routeLogin from './login'

const app = express()

app.use(routeLogin)
module.exports = app
