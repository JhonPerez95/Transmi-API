import { Sequelize, DataTypes } from 'sequelize'
import Db from '../config/db'

const Jobs = Db.define(
  'jobs',
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: '1',
    },
    users_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
  },
  { timestamps: false }
)

Jobs.sync()
  .then(() => console.log('Sync Successfull Jobs !'))
  .catch((err) => console.log(err))

export default Jobs
