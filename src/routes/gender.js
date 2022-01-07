import { Router } from 'express'
import * as crtGenders from '../controllers/gender'
// import all controllers
// import SessionController from './app/controllers/SessionController';

const routesGender = new Router()

// Add routesGender
routesGender.get('/', crtGenders.findAllGenders)
// routesGender.get('/', (req, res) => {
//   res.status(200).json({ success: true, message: 'route correct genders' })
// })

module.exports = routesGender
