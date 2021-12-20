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
require('./db')

export default app
