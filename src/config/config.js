require('dotenv').config()

export default {
  server: {
    port: process.env.PORT || 3000,
  },
  db: {
    host: process.env.BD_HOST || 'localhost',
    user: process.env.BD_USER || 'root',
    pass: process.env.BD_PASS || 'root12345',
    database: process.env.BD_DATABASE || 'transmi',
    port: process.env.BD_PORT || 3306,
  },
  token: {
    secretKey: process.env.SECRET_KEY || '',
  },
  emailSupport: {
    email: process.env.EMAIL_SUPPORT || '',
    pass: process.env.PASS_EMAIL_SUPPORT || '',
  },
}
