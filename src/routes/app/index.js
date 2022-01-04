import express from 'express'
import routesLogin from './login'
const app = express()

app.use('/login', routesLogin)

export default app
