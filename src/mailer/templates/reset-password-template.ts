export const getResetPasswordEmail = (
    resetPasswordLink: string,
    expiration: string = 'a limited time',
) => {
    return {
        from: 'answerexchangeapp@gmail.com',
        subject: 'Reset Your Password',
        html: `
            <html lang="en">
                <body>
                    <p>
                        Use the link below to reset your password. This password reset link
                        is valid for ${expiration}.
                    </p>
                    <a href='${resetPasswordLink}'>
                        Click here to reset your password.
                    </a>
                    <p>
                    If you're having trouble with link above, copy and paste the URL below into
                    your website browser
                    </p>
                    <p>${resetPasswordLink}</p>
                </body>
            </html>
        `,
    };
};
