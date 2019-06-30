import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as AWS from 'aws-sdk';
import { getResetPasswordEmail } from './templates/reset-password-template';

@Injectable()
export class MailerService {
    transporter: nodemailer.Transporter;
    constructor() {
        this.initialize();
    }

    initialize() {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'us-east-1',
        });

        this.transporter = nodemailer.createTransport({
            SES: new AWS.SES({
                apiVersion: '2010-12-01',
            }),
        });
    }

    sendPasswordResetEmail(
        passwordResetLink: string,
        passwordExpirationText: string,
        email: string,
    ) {
        const { from, subject, html } = getResetPasswordEmail(
            passwordResetLink,
            passwordExpirationText,
        );

        this.sendEmail({ from, subject, html, to: email });
    }

    sendEmail(emailData) {
        const { from, to, subject, html } = emailData;

        return this.transporter.sendMail(
            {
                from,
                to,
                subject,
                html,
            },
            (err, info) => {
                return info || err;
            },
        );
    }
}
