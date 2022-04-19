import { INTEGER, STRING } from 'sequelize'

const UserModel = {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  login: {
    type: STRING,
  },
  password: {
    type: STRING,
  },
  nickname: {
    type: STRING,
  },
}

export default UserModel
