// template.js
const gmailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
  <style>
    /* Main styles */
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f7;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      background-color: #4a90e2;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
    }
    .email-body {
      padding: 20px;
      text-align: center;
      color: #333;
    }
    .email-body p {
      line-height: 1.6;
      font-size: 16px;
    }
    .reset-button {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 20px;
      background-color: #4a90e2;
      color: #ffffff;
      text-decoration: none;
      font-size: 18px;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }
    .reset-button:hover {
      background-color: #357ab8;
    }
    .email-footer {
      background-color: #f4f4f7;
      padding: 15px;
      text-align: center;
      font-size: 14px;
      color: #999;
    }
    .email-footer a {
      color: #4a90e2;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="email-header">
      <h1>Password Reset Request</h1>
    </div>

    <!-- Body -->
    <div class="email-body">
      <p>Hello,</p>
      <p>We received a request to reset your password. Click the button below to set a new password:</p>
      <a href="{{reset_link}}" class="reset-button">Reset Password</a>
      <p>If you didn’t request a password reset, please ignore this email.</p>
      <p>For any questions, feel free to contact us at sauravshete9@gmail.com.</p>
    </div>

    <!-- Footer -->
    <div class="email-footer">
      <p>Thank you for using our service!<br><a href="https://yourwebsite.com">Mentor Hub</a></p>
    </div>
  </div>
</body>
</html>
`;

export default gmailTemplate;
