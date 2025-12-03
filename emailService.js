class EmailService {
  constructor(logger) {
    this.logger = logger;
    this.sentEmails = [];
  }

  sendEmail(to, subject, body) {
    this.logger.log(`Sending email to ${to}`);
    
    const email = {
      to,
      subject,
      body,
      sentAt: new Date()
    };

    this.sentEmails.push(email);
    
    this.logger.log(`Email sent successfully to ${to}`);
    return email;
  }

  getSentEmails() {
    return this.sentEmails;
  }

  clearHistory() {
    this.logger.log('Clearing email history');
    this.sentEmails = [];
  }
}

module.exports = EmailService;