"use strict";
const express = require("express");
const json = require("body-parser");
const logger = require("morgan");
const serverless = require("serverless-http");

const app = express();

const apiServer = (req, res) => {
  const { email = "", password = "" } = req.body;
  setTimeout(() => {
    const [prefix] = email.split("@");
    if (prefix.toLowerCase() === String(password).toLowerCase()) {
      res.status(201).json({ status: "authenticated" });
    } else {
      res.status(401).json({ status: "authentication failed" });
    }
  }, 500);
};

app.use(json());
app.use(logger("dev"));

app.use("/api/v1/sessions", apiServer);

module.exports = app;
module.exports.handler = serverless(app);
