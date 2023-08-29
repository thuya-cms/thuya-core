import sendHtmlMail from "../domain/usecase/send-html-mail";
import sendMail from "../domain/usecase/send-mail";

/**
 * Service to handle emails.
 */
class MailerService {
    /**
     * Send an email with text content.
     * 
     * @param from the sender of the email
     * @param to the target of the email
     * @param subject the subject of the email
     * @param body the content of the email
     * @param options additional options
     * @param options.attachments attachments for the email
     * @async
     */
    async sendMail(from: string, to: string[], subject: string, body: string, options?: { attachments?: { filename: string, path: string, cid: string }[] }): Promise<void> {
        await sendMail.init();
        sendMail.execute(from, to, subject, body, options);
    }

    /**
     * Send an email with HTML content.
     * 
     * @param from the sender of the email
     * @param to the target of the email
     * @param subject the subject of the email
     * @param body HTML content of the email
     * @param options additional options
     * @param options.attachments attachments for the email
     * @async
     */
    async sendHTMLMail(from: string, to: string[], subject: string, body: string, options?: { attachments?: { filename: string, path: string, cid: string }[] }): Promise<void> {
        await sendHtmlMail.init();
        sendHtmlMail.execute(from, to, subject, body, options);
    }
}

export default new MailerService();