import { Router } from 'express'
import * as ctrLogin from '../../controllers/web/login'

const router = Router()

router.post('/', ctrLogin.postLogin)
router.post('/user', ctrLogin.saveUser)
router.get('/restorePasswordCode', ctrLogin.restorePassword)
router.put('/restorePasswordCode', ctrLogin.updatedPassword)

export default router
