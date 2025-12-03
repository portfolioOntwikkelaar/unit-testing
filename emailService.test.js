const EmailService = require('./emailService');

describe('EmailService Tests - Spies', () => {
  let emailService;
  let mockLogger;

  beforeEach(() => {
    // Maak een mock logger
    mockLogger = {
      log: jest.fn()
    };
    
    emailService = new EmailService(mockLogger);
  });

  test('should send email and log actions', () => {
    const result = emailService.sendEmail(
      'test@example.com',
      'Hello',
      'Test message'
    );

    // Check of logger werd aangeroepen
    expect(mockLogger.log).toHaveBeenCalledTimes(2);
    expect(mockLogger.log).toHaveBeenCalledWith('Sending email to test@example.com');
    expect(mockLogger.log).toHaveBeenCalledWith('Email sent successfully to test@example.com');

    // Check email object
    expect(result).toMatchObject({
      to: 'test@example.com',
      subject: 'Hello',
      body: 'Test message'
    });
    expect(result.sentAt).toBeInstanceOf(Date);
  });

  test('should track sent emails', () => {
    emailService.sendEmail('user1@example.com', 'Subject 1', 'Body 1');
    emailService.sendEmail('user2@example.com', 'Subject 2', 'Body 2');

    const sentEmails = emailService.getSentEmails();

    expect(sentEmails).toHaveLength(2);
    expect(sentEmails[0].to).toBe('user1@example.com');
    expect(sentEmails[1].to).toBe('user2@example.com');
  });

  test('should clear email history', () => {
    emailService.sendEmail('test@example.com', 'Test', 'Body');
    
    emailService.clearHistory();

    expect(emailService.getSentEmails()).toHaveLength(0);
    expect(mockLogger.log).toHaveBeenCalledWith('Clearing email history');
  });

  test('should verify call order of logger', () => {
    emailService.sendEmail('test@example.com', 'Test', 'Body');

    expect(mockLogger.log).toHaveBeenNthCalledWith(
      1,
      'Sending email to test@example.com'
    );
    expect(mockLogger.log).toHaveBeenNthCalledWith(
      2,
      'Email sent successfully to test@example.com'
    );
  });
});