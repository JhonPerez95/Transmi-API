import jwt from 'jsonwebtoken'
import { sendMail } from '../helpers/restorePass'
import RestorePass from '../models/RestorePass'
import Users from '../models/Users'
require('dotenv').config()

// POST /api/login
export const postLogin = async (req, res) => {
  const { email, password } = req.body

  try {
    const userData = await Users.findOne({ where: { email } })
    if (!userData)
      return res
        .status(200)
        .json({ success: false, message: 'User not found !' })

    const resultPass = await userData.validPassword(password)

    if (!resultPass)
      return res
        .status(200)
        .json({ success: false, message: 'Password incorrect !' })

    //TODO: Revisar que datos enviar del usuario , por el momento solo se elimina la pass
    delete userData.dataValues.password

    // Create a token
    const token = jwt.sign({ id: userData.id }, process.env.SECRET_KEY, {
      expiresIn: 86400, // 24 hours
    })
    return res.status(200).json({
      success: true,
      message: 'user logged in successfully !',
      token,
      user: userData,
    })
  } catch (error) {
    console.log(error.message)
    res
      .status(500)
      .json({ success: false, message: 'Por favor comunicarse con el Admin !' })
  }
}

// GET /api/login/restorePasswordCode
export const restorePassword = async (req, res) => {
  const { email } = req.body
  const code = Math.floor(100000 + Math.random() * 900000)

  const resMail = await sendMail({
    code,
    message: 'Su codigo de recuperacion es: ',
    email,
    subject: 'Codigo de recuperacion',
  })

  try {
    const restorePass = new RestorePass({
      code,
      email,
    })
    const savedRestore = await restorePass.save()
    // const userData = await Users.findAll()
    // console.log(userData)
    res.status(200).json({
      success: true,
      message: 'Your verification email has been sent !',
    })
  } catch (error) {
    console.log(error.message)
    res
      .status(500)
      .json({ success: false, message: 'Por favor comunicarse con el Admin !' })
  }
}

// POST /api/user .password
export const saveUser = async (req, res) => {
  try {
    const userData = new Users(req.body)
    const savedUser = await userData.save()
    delete savedUser.dataValues.password

    const token = jwt.sign({ id: savedUser._id }, process.env.SECRET_KEY, {
      expiresIn: 86400, // 24 hours
    })
    res.json({ success: true, message: 'Saved User', user: savedUser, token })
  } catch (error) {
    console.log(error.message)
    res
      .status(500)
      .json({ success: false, message: 'Por favor comunicarse con el Admin !' })
  }
}

// PUT /api/login/restorePasswordCode
export const updatedPassword = async (req, res) => {
  const { email, password, code } = req.body

  try {
    const resultCode = await RestorePass.findOne({
      where: { email, active: 'A' },
      order: [['updatedAt', 'DESC']],
    })

    if (!resultCode)
      return res
        .status(200)
        .json({ success: false, message: 'Email or Code  not found !' })

    // Se cambia el estado del codigo
    if (
      code === resultCode.dataValues.code &&
      email === resultCode.dataValues.email
    ) {
      resultCode.update({ active: 'C' })
      console.log('Updated code successfull! ')
      const userData = await Users.findOne({ where: { email } })
      const updatedUser = await userData.update({ password })
      if (!updatedUser)
        return res.status(200).json({
          success: false,
          message: 'The password could not be updated !',
        })
    } else {
      return res
        .status(200)
        .json({ success: false, message: 'The code not match !' })
    }
    res
      .status(200)
      .json({ success: true, message: 'The password updated successfully ! ' })
  } catch (error) {
    console.log(error.message)
    res
      .status(500)
      .json({ success: false, message: 'Please contact the Admin! !' })
  }
}
