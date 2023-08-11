const express = require("express");
const NewsletterController = require("../controllers/newsletter");
const md_auth = require("../middlewares/authenticated");
const api = express.Router();

api.post("/newsletter", NewsletterController.registerNewsletter);
api.get("/newsletter", [md_auth.asureAuth], NewsletterController.getEmailNewsletter);
api.delete("/newsletter/:id", [md_auth.asureAuth], NewsletterController.deleteEmailNewsletter);

module.exports = api;