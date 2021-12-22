import { Router } from 'express'
import {
  postLogin,
  restorePassword,
  saveUser,
  updatedPassword,
} from '../controllers/login'

const router = Router()

router.get('/login/restorePasswordCode', restorePassword)
router.put('/login/restorePasswordCode', updatedPassword)
router.post('/login', postLogin)
router.post('/user', saveUser)

export default router
