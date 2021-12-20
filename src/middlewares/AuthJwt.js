import jwt from 'jsonwebtoken'
import Users from '../models/Users'
require('dotenv').config()

export const verifyToken = async (req, res, next) => {
  let token = req.headers['Authorization']

  if (!token) return res.status(403).json({ message: 'No token provided' })

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.userId = decoded.id

    const user = await Users.findById(req.userId, { password: 0 })
    if (!user) return res.status(404).json({ message: 'No user found' })

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized!' })
  }
}
