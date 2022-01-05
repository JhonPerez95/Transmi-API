import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import routesApp from '../routes'
import fileUpload from 'express-fileupload'

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
)
app.use(cors())
app.use(morgan('dev'))
// routes
app.use('/api', routesApp)

// db
require('./db')

export default app
