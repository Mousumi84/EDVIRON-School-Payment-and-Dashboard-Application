const express=require("express");
const isAuth = require("../Middlewares/isAuth");
const { webhookController } = require("../Controllers/WebhookController");
const WebhookRouter=express.Router();


WebhookRouter.post("/webhook",isAuth,webhookController);

module.exports = {WebhookRouter};