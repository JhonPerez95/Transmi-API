import { Sequelize } from 'sequelize'
require('dotenv').config()

const db = new Sequelize(
  process.env.BD_DATABASE,
  process.env.BD_USER,
  process.env.BD_PASS,
  {
    host: process.env.BD_HOST,
    dialect: 'mysql',
  }
)

export async function dbConnected(db) {
  try {
    await db.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

dbConnected(db)

export default db
