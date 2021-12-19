import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import routesApp from '../routes'
require('dotenv').config()

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))

// routes
app.use('/api', routesApp)

// db
// require('./db')

app.use((req, res, next) => {
  res.status(404).render('404')
})

export default app