import { Router } from 'express'

const router = Router()

router.post('/', (req, res) => {
  res.status(200).json({ success: true, message: 'route correcta login' })
})

router.post('/user', (req, res) => {
  res.status(200).json({ success: true, message: 'route correcta user' })
})

export default router
