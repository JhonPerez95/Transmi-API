import { Router } from 'express'
import { postLogin, restorePassword, saveUser } from '../controllers/login'

const router = Router()

router.get('/login/restorePasswordCode', restorePassword)
router.post('/login', postLogin)
router.post('/user', saveUser)

export default router
