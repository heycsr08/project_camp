import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    const mailgenrator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanagerlink.com"
        }
    })

    const mailText = mailgenrator.generatePlaintext(options.mailgenContent);
    const mailHtml = mailgenrator.generate(options.mailgenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_TRAP_SMTP_HOST,
        port: process.env.MAIL_TRAP_SMTP_PORT,
        auth: {
            user: process.env.MAIL_TRAP_SMTP_USER,
            pass: process.env.MAIL_TRAP_SMTP_PASS
        }
    })

    const mail = {
        from: "mail.taskManger@example.com",
        to: options.email,
        subject: options.subject,
        text: mailText,
        html: mailHtml
    }

    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.error("Transportation of email failed silently, Make sure you have provided correct mail trap credentials in the .env file");
        console.error("Error ", error);
    }
}

const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "welcome to App! we are exited to have you onboard.",
            action: {
                instructions:
                    "To verify you email click on the following button",
                button: {
                    color: "#1aae5a",
                    text: "verify your email",
                    link: verificationUrl,
                },
            },
            outro:
                "Need help , or have questions? Just reply to this email, we'd love to help.",
        },
    };
};

const passwordResetMailgenContent = (username, resetUrl) => {
    return {
        body: {
            name: username,
            intro: "We got a request to reset your password of your account",
            action: {
                instructions:
                    "To reset your password click on the following button",
                button: {
                    color: "#0f8342",
                    text: "Reset password",
                    link: resetUrl,
                },
            },
            outro:
                "Need help , or have questions? Just reply to this email, we'd love to help.",
        },
    };
};

export { emailVerificationMailgenContent, passwordResetMailgenContent, sendEmail };