const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_Version } = require("./constants");

const app = express();

// Import Routings
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const menuRoutes = require("./router/menu");
const postRoutes = require("./router/post");
const newsletterRoutes = require("./router/newsletter");

// Configure Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure Static folder
app.use(express.static("uploads"));

// Configure Header HTTP - CORS
app.use(cors());

//Configure Routings
app.use(`/api/${API_Version}`, authRoutes);
app.use(`/api/${API_Version}`, userRoutes);
app.use(`/api/${API_Version}`, menuRoutes);
app.use(`/api/${API_Version}`, postRoutes);
app.use(`/api/${API_Version}`, newsletterRoutes);

module.exports = app;
