import { Sequelize, DataTypes } from 'sequelize'
import Db from '../config/db'

const Parkings = Db.define(
  'parkings',
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
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    active: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: '1',
    },
    type_parkings_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    bike_count: {
      type: DataTypes.BIGINT.UNSIGNED,
      defaultValue: '0',
      allowNull: false,
    },
    stations_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
  },
  { timestamps: false }
)

Parkings.sync()
  .then(() => console.log('Sync Successfull Parkings !'))
  .catch((err) => console.log(err))

export default Parkings
