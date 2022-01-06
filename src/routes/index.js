import express from 'express'

import routeLogin from './login'
import routeBiker from './biker'
import routerDocument from './document'
import routerParking from './parking'

const app = express()

app.use('/login', routeLogin)
app.use('/biker', routeBiker)
app.use('/type-document', routerDocument)
app.use('/parkings', routerParking)

module.exports = app
