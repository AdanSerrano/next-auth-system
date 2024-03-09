import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {

    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: 'Verification Email <onborading@fesa.com.pa>',
        to: email,
        subject: 'Please confirm your email!',
        html: `<p>Click <a href="${confirmLink}">here</a> to confirme email!</p>`
    })
}
export const sendVerificationEmailLogin = async (
    email: string,
) => {


    await resend.emails.send({
        from: 'Login User <onborading@fesa.com.pa>',
        to: ['adan.serrano@fesa.com.pa', email],
        subject: 'Login correct!',
        html: `<p>Login users</p>`
    })
}

export const sendPasswordResetEmail = async (
    email: string,
    token: string
) => {

    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`

    await resend.emails.send({
        from: 'ResetPassword <onborading@fesa.com.pa>',
        to: [email],
        subject: 'Reset password confirmation!',
        html: `<p>Click <a href="${resetLink}">here</a> to reset Password!</p>`
    })
}