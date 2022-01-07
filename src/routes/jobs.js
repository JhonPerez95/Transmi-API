import { Router } from 'express'
import * as ctrJobs from '../controllers/jobs'
// import all controllers
// import SessionController from './app/controllers/SessionController';

const routesJobs = new Router()

// Add routesJobs
routesJobs.get('/', ctrJobs.findAllJobs)

module.exports = routesJobs
