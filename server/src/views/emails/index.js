const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const testEmailTemplateSrc = fs.readFileSync(
  path.join(__dirname, "./test.hbs"),
  "utf8"
);
const testEmailTemplate = handlebars.compile(testEmailTemplateSrc);

const templates = {
  test: testEmailTemplate,
};

module.exports = templates;
