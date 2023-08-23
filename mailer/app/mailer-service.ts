import sendMail from "../domain/usecase/send-mail";

/**
 * Service to handle emails.
 */
class MailerService {
    /**
     * Send an email.
     * 
     * @param from the sender of the email
     * @param to the target of the email
     * @param subject the subject of the email
     * @param body the content of the email
     * @async
     */
    async sendMail(from: string, to: string[], subject: string, body: string): Promise<void> {
        await sendMail.init();
        sendMail.execute(from, to, subject, body);
    }
}

export default new MailerService();