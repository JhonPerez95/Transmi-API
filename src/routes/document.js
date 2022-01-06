import { Router } from 'express'
import * as crtTypeDocument from '../controllers/typeDocument'
const routerDocument = Router()

routerDocument.get('/', crtTypeDocument.findAllTypeDocuments)

export default routerDocument
