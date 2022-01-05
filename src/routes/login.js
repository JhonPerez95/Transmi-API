import { Router } from 'express'
import {
  postLogin,
  restorePassword,
  saveUser,
  updatedPassword,
} from '../controllers/login'

const router = Router()

router
  .post('/', postLogin)
  .post('/user', saveUser)
  .get('/restorePasswordCode', restorePassword)
  .put('/restorePasswordCode', updatedPassword)

export default router
