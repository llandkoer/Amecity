const express = require("express");

const morgan = require("morgan");

const helmet = require("helmet");

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();

const authRoute = require("./routes/authRoutes");
const challenges = require("./routes/challengesRoutes");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(helmet());
app.use(limiter);

// Routes
app.use("/api/auth/", authRoute);
app.use("/api/challenges/", challenges);

module.exports = app;
