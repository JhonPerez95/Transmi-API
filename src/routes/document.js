import { Router } from 'express'

const routerDocument = Router()

routerDocument.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Route correct  document! ' })
})

export default routerDocument
