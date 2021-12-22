import { Sequelize, DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'
import Db from '../config/db'

const Users = Db.define(
  'users',
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
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    document: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email_verified_at: {
      type: DataTypes.DATE,
    },
    password: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: '1',
    },
    parkings_id: {
      type: DataTypes.BIGINT.UNSIGNED,
    },
    service: {
      type: DataTypes.ENUM('web', 'app'),
      allowNull: false,
    },
    remember_token: {
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, 'a')
          user.password = bcrypt.hashSync(user.password, salt)
        }
      },
      afterCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, 'a')
          user.password = bcrypt.hashSync(user.password, salt)
        }
      },
    },
  }
)
Users.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}
Users.sync()
  .then(() => console.log('CREATE TABLE ! '))
  .catch((err) => console.log(err))

export default Users
