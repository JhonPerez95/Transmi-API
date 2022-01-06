import { Router } from 'express'
import * as crtParkings from '../controllers/parkings'
const routerParking = Router()

routerParking.get('/', crtParkings.findAllParkings)

export default routerParking
