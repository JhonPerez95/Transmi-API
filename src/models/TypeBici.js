import { Sequelize, DataTypes } from 'sequelize'
import Db from '../config/db'

const TypeBici = Db.define(
  'type_bicies',
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

TypeBici.sync()
  .then(() => console.log('Sync Successfull TypeBici !'))
  .catch((err) => console.log(err))

export default TypeBici
