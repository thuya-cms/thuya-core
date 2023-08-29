import { Logger } from "@thuya/framework";
import nodemailer from "nodemailer";

/**
 * Use case to send an email with HTML  content.
 */
class SendHTMLMail {
    private transporter!: nodemailer.Transporter;
    private logger: Logger;

    
    

    constructor() {
        this.logger = Logger.for(SendHTMLMail.name);
    }



    /**
     * Create a new instance of SendMail.
     * 
     * @returns the new instance
     */
    async init(): Promise<void> {
        if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
            const account = await nodemailer.createTestAccount();
            this.transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                }
            });
        } else {
            this.transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });
        }
    }
    
    /**
     * Execute sending an email.
     * 
     * @param from the sender of the email
     * @param to the targets of the email
     * @param subject the subject of the email
     * @param body HTML content of the email
     * @param options additional options
     * @param options.attachments attachments for the email
     */
    execute(from: string, to: string[], subject: string, body: string, options?: { attachments?: { filename: string, path: string, cid: string }[] }): void {
        this.transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            html: body,
            attachments: options?.attachments || undefined
        }).then(info => {
            this.logger.info(`Email successfully sent to ${ to.join(",") }.`);
            this.logger.info(info.response);
        }).catch(error => {
            this.logger.error("Failed to send email.");
            this.logger.error(error.message);
        });
    }
}

export default new SendHTMLMail();