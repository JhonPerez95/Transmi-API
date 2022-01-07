import { Router } from 'express'
import * as crtGenders from '../controllers/gender'
// import all controllers
// import SessionController from './app/controllers/SessionController';

const routesGender = new Router()

// Add routesGender
routesGender.get('/', crtGenders.findAllGenders)


module.exports = routesGender
