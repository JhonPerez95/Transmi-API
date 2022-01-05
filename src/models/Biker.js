import { Sequelize, DataTypes } from 'sequelize'
import Db from '../config/db'

const Bikers = Db.define('bikers', {
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
    allowNull: false,
  },
  type_documents_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  document: {
    type: DataTypes.BIGINT.UNSIGNED,
    unique: true,
    allowNull: false,
  },
  birth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  genders_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  parkings_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  confirmation: {
    type: DataTypes.STRING,
    unique: true,
    defaultValue: null,
  },
  jobs_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  neighborhoods_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  levels_id: {
    type: DataTypes.ENUM(
      'Estrato 1',
      'Estrato 2',
      'Estrato 3',
      'Estrato 4',
      'Estrato 5',
      'Estrato 6'
    ),
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  register: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  active: {
    type: DataTypes.ENUM('1', '2', '3'),
    allowNull: false,
  },
  auth: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: '2',
  },
  photo: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
})

Bikers.sync()
  .then(() => console.log('Sync Successfull Bikers !'))
  .catch((err) => console.log(err))

export default Bikers
