import { Router } from 'express'
import * as ctrLevels from '../controllers/level'

const routesLevels = new Router()

// Add routesLevels
routesLevels.get('/', ctrLevels.findAllLevels)

module.exports = routesLevels
