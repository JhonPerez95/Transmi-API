import { Sequelize } from 'sequelize'
import config from './config'

const { db: configDb } = config

const db = new Sequelize(
  configDb.database,
  configDb.user,
  configDb.pass,
  {
    host: configDb.host,
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
