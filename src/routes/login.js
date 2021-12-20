import { Router } from 'express'
import { postLogin, findAllUser, saveUser } from '../controllers/login'

const router = Router()

router.get('/login', findAllUser)

router.post('/login', postLogin)
router.post('/user', saveUser)

export default router
