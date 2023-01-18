const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    MAILDEV_PROTOCOL: "http",
    MAILDEV_HOST: "localhost",
    MAILDEV_SMTP_PORT: "1025",
    MAILDEV_API_PORT: "1080",
  },
});
