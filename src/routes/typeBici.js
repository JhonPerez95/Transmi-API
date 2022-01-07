import { Router } from 'express'
import * as crtTypeBici from '../controllers/typeBici'
const routerTypeBici = Router()

routerTypeBici.get('/', crtTypeBici.findAllTypeBici)

export default routerTypeBici
