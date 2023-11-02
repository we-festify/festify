const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const testEmailTemplateSrc = fs.readFileSync(
  path.join(__dirname, "./test.hbs"),
  "utf8"
);
const forgotPasswordEmailTemplateSrc = fs.readFileSync(
  path.join(__dirname, "./forgot-password.hbs"),
  "utf8"
);
const emailVerificationTemplateSrc = fs.readFileSync(
  path.join(__dirname, "./verify-email.hbs"),
  "utf8"
);
const testEmailTemplate = handlebars.compile(testEmailTemplateSrc);
const forgotPasswordEmailTemplate = handlebars.compile(
  forgotPasswordEmailTemplateSrc
);
const emailVerificationTemplate = handlebars.compile(
  emailVerificationTemplateSrc
);

const templates = {
  test: testEmailTemplate,
  forgotPassword: forgotPasswordEmailTemplate,
  emailVerification: emailVerificationTemplate,
};

module.exports = templates;
