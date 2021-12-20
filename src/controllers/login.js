import jwt from 'jsonwebtoken'
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
    console.log(error)
    return res.status(500).json({ success: false, message: error.message })
  }
}

// GET /api/login
export const findAllUser = async (req, res) => {
  try {
    const userData = await Users.findAll()
    console.log(userData)
    res.status(200).json({ success: true, message: 'List user', userData })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
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
    res.status(500).json({ success: false, message: error.message })
  }
}
