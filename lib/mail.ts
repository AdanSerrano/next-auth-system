import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmailRegister = async (
    email: string,
    token: string
) => {

    const confirmLink = `http://localhost:3000/auth/verification?token=${token}`

    await resend.emails.send({
        from: 'Verification Email <onboarding@resend.dev>',
        to: ['adan.serrano@fesa.com.pa', email],
        subject: 'Please confirm your email!',
        html: `<p>Click <a href="${confirmLink}">here</a> to confirme email!</p>`
    })
}
export const sendVerificationEmailLogin = async (
    email: string,
    token: string
) => {

    const confirmLink = `http://localhost:3000/auth/verification?token=${token}`

    await resend.emails.send({
        from: 'Login User <onboarding@resend.dev>',
        to: ['adan.serrano@fesa.com.pa', email],
        subject: 'Login correct!',
        html: `<p>Click <a href="${confirmLink}">here</a> to confirme email!</p>`
    })
}