import nodemailer from 'nodemailer'

/**
 * Envio de correo de recuperacion
 * @param {*} param0 
 * @returns  Boolean 
 */
export const sendMail = async ({ code, message , email , subject}) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_SUPPORT,
      pass: process.env.PASS_EMAIL_SUPPORT, // generated ethereal password
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.EMAIl_SUPPORT,
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


export const validateCode = (code) => {
  
}