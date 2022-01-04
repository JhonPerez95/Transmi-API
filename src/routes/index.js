import express from 'express'

import routesApp from './app'
import routesWeb from './web'

const app = express()

app.use('/app', routesApp)
app.use('/web', routesWeb)

export default app
