import { INTEGER, STRING } from 'sequelize'

const ContactModel = {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user: {
    type: INTEGER,
  },
  name: {
    type: STRING,
  },
  value: {
    type: STRING,
  },
}

export default ContactModel
