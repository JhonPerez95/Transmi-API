import Users from '../models/Users'

// POST /api/login
export const postLogin = (req, res) => {
  const { email, password } = req.body

  console.log({ email, password })
  res.status(200).json({ success: true, message: 'se recibio data' })
}

// GET /api/login

export const findAllUser = async (req, res) => {
  try {
    const userData = await Users.findAll()
    console.log(userData)
    res.status(200).json({ success: true, message: 'litado user', userData })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
