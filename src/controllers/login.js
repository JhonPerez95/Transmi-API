import dayjs from 'dayjs'
import jwt from 'jsonwebtoken'

import { sendMail } from '../helpers/restorePass'
import RestorePass from '../models/RestorePass'
import Users from '../models/Users'
import config from '../config/config'
import Parkings from '../models/Parkings'

require('dotenv').config()

// POST /api/login
export const postLogin = async (req, res) => {
  const { email: emailUser, password } = req.body

  try {
    const userData = await Users.findOne({ where: { email: emailUser } })
    if (!userData)
      return res
        .status(403)
        .json({ success: false, message: 'User not found !' })

    const resultPass = await userData.validPassword(password)

    if (!resultPass)
      return res
        .status(404)
        .json({ success: false, message: 'Password incorrect !' })

    const { id, name, last_name, email, phone, document, active, parkings_id } =
      userData.dataValues

    // Find parking
    const { dataValues: parkingData } = await Parkings.findByPk(parkings_id)
    const { name: parkingName } = parkingData

    // Create a token
    const { token, expireDate } = createToken(userData.id)

    return res.status(200).json({
      success: true,
      message: 'user logged in successfully !',
      accessToken: {
        token,
        expireDate,
      },
      user: {
        id,
        name,
        last_name,
        email,
        phone,
        document,
        active,
        parkings_id,
        parkingName,
      },
    })
  } catch (error) {
    console.log(error.message)
    console.log(error?.parent?.sqlMessage)
    return res.status(500).json({
      success: false,
      message: 'Please contact the Admin! !',
      error: {
        message: error.message,
        sqlMessage: error?.parent?.sqlMessage || 'N/A',
      },
    })
  }
}

// GET /api/login/restorePasswordCode
export const restorePassword = async (req, res) => {
  const { email } = req.body
  const code = Math.floor(100000 + Math.random() * 900000)

  try {
    await sendMail({
      code,
      message: 'Su codigo de recuperacion es: ',
      email,
      subject: 'Codigo de recuperacion',
    })
    const restorePass = new RestorePass({
      code,
      email,
    })
    await restorePass.save()
    // const userData = await Users.findAll()
    // console.log(userData)
    res.status(200).json({
      success: true,
      message: 'Your verification email has been sent !',
    })
  } catch (error) {
    console.log(error.message)
    console.log(error?.parent?.sqlMessage)
    return res.status(500).json({
      success: false,
      message: 'Please contact the Admin! !',
      error: {
        message: error.message,
        sqlMessage: error?.parent?.sqlMessage || 'N/A',
      },
    })
  }
}

// POST /api/user .password
export const saveUser = async (req, res) => {
  try {
    const userData = new Users(req.body)
    const savedUser = await userData.save()

    const { id, name, last_name, email, phone, document, active, parkings_id } =
      savedUser.dataValues

    const { token, expireDate } = createToken(userData.id)

    res.json({
      success: true,
      message: 'Saved User',
      accessToken: {
        token,
        expireDate,
      },
      user: {
        id,
        name,
        last_name,
        email,
        phone,
        document,
        active,
        parkings_id,
      },
    })
  } catch (error) {
    console.log(error.message)
    console.log(error?.parent?.sqlMessage)
    return res.status(500).json({
      success: false,
      message: 'Please contact the Admin! !',
      error: {
        message: error.message,
        sqlMessage: error?.parent?.sqlMessage || 'N/A',
      },
    })
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
        return res.status(404).json({
          success: false,
          message: 'The password could not be updated !',
        })
    } else {
      return res
        .status(403)
        .json({ success: false, message: 'The code not match !' })
    }
    res
      .status(200)
      .json({ success: true, message: 'The password updated successfully ! ' })
  } catch (error) {
    console.log(error.message)
    console.log(error?.parent?.sqlMessage)
    return res.status(500).json({
      success: false,
      message: 'Please contact the Admin! !',
      error: {
        message: error.message,
        sqlMessage: error?.parent?.sqlMessage || 'N/A',
      },
    })
  }
}

function createToken(id) {
  const token = jwt.sign({ id }, config.token.secretKey, {
    expiresIn: 86400, // 24 hours
  })
  const expireDate = dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss')

  return {
    token,
    expireDate,
  }
}
