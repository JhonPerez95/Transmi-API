import { Router } from 'express'
import * as ctrNeighborhood from '../controllers/neighborhood'

const routesNeighborhoods = new Router()

// Add routesNeighborhoods
routesNeighborhoods.get('/', ctrNeighborhood.findAllNeighborhoods)

module.exports = routesNeighborhoods
