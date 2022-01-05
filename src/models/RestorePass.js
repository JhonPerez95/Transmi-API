import { Sequelize, DataTypes } from 'sequelize'
import Db from '../config/db'

const RestorePass = Db.define('restore_pwd', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  code: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  active: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 'A',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

RestorePass.sync()
  .then(() => console.log('Sync Successfull RestorePass!'))
  .catch((err) => console.log(err))

export default RestorePass
