import { Router } from 'express'
import * as ctrLevels from '../controllers/level'

const routesLevels = new Router()

// Add routesLevels
routesLevels.get('/', ctrLevels.findAllLevels)
// routesLevels.get('/', (req, res) => {
//   res.status(200).json({ success: true, message: 'route correct levels' })
// })
module.exports = routesLevels
