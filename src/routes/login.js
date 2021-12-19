import { Router } from 'express'
import { postLogin, findAllUser } from '../controllers/login'

const router = Router()

router.get('/login', findAllUser)

router.post('/login', postLogin)

export default router
