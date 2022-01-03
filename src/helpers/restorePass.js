import nodemailer from 'nodemailer'
import config from '../config/config'
/**
 * Envio de correo de recuperacion
 * @param {*} param0
 * @returns  Boolean
 */
export const sendMail = async ({ code, message, email, subject }) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: config.emailSupport.email,
      pass: config.emailSupport.pass, // generated ethereal password
    },
  })

  try {
    await transporter.sendMail({
      from: config.emailSupport.email,
      to: email, // list of receivers
      subject: subject, // Subject line
      html: `
            <html>
                <h6>
                    ${message}
                </h6>
                <h6> ${code} </h6>
            </html>

        `, // html body
    })

    console.log('Se ha enviado el mensaje ')

    return true
  } catch (error) {
    console.log('No se envio el mensaje ')

    console.log(error.message)

    return false
  }
}

export const validateCode = (codeDb, codeReq) => {}
