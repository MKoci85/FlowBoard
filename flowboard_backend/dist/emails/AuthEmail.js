"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthEmail = void 0;
const nodemailer_1 = require("../config/nodemailer");
class AuthEmail {
    static sendConfirmationEmail = async (user) => {
        await nodemailer_1.transporter.sendMail({
            from: 'FlowBoard <no-reply@flowboard.com>',
            to: user.email,
            subject: 'Verify your email',
            text: 'Please verify your email',
            html: `<p>Hi, ${user.name}. Please verify your email by clicking <a href="${process.env.FRONTEND_URL}/auth/verify-email">here</a> and entering the following code: ${user.token}</p>
                    <p>This link will expire in 15 minutes</p>            
            `
        });
    };
    static sendPasswordResetToken = async (user) => {
        await nodemailer_1.transporter.sendMail({
            from: 'FlowBoard <no-reply@flowboard.com>',
            to: user.email,
            subject: 'Reset your password',
            text: 'Please reset your password',
            html: `<p>Hi, ${user.name}. You have requested to reset your password. Please reset your password by clicking <a href="${process.env.FRONTEND_URL}/auth/new-password">here</a> 
                    and entering the following code: ${user.token}</p>
                    <p>This link will expire in 15 minutes</p>            
            `
        });
    };
}
exports.AuthEmail = AuthEmail;
//# sourceMappingURL=AuthEmail.js.map