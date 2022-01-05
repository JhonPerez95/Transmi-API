import { Router } from 'express'
import * as ctrBiker from '../controllers/biker'

const routerBiker = Router()

routerBiker
  .get('/:id', ctrBiker.findOneBiker)
  .get('/', ctrBiker.findAllBiker)
  .post('/', ctrBiker.saveBiker)
  .put('/:id', ctrBiker.updatedBiker)
  .delete('/:id', ctrBiker.deletedBiker)

export default routerBiker
