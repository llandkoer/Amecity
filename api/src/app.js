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
const usersRoute = require("./routes/usersRoutes");
const blogRoute = require("./routes/blogRoutes");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(helmet());
app.use(limiter);

// Routes
app.use("/api/auth/", authRoute);
app.use("/api/challenges/", challenges);
app.use("/api/user/", usersRoute);
app.use("/api/blog", blogRoute);

module.exports = app;
