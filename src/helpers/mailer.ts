import User from '@/model/userModel'
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer'


// Create a transporter for SMTP
const transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});



export const sendEmail = async ({ email, emailType, userId }: any) => {

    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            })

        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            })
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "0de24a5d7bf869",
                pass: "012111865a2901"
            }
        });

        const mailOptions = {
            from: 'avinash@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "verify your email" : "reset your email",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "reset-password"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>
            or copy paste the link in browser
            
            `

        }

        const mailres = await transport.sendMail(mailOptions);
        console.log("Message sent: %s", mailres.messageId);


    } catch (err: any) {
        console.error("Error while sending mail", err);
    }

}

