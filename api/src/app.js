const express = require("express");

const morgan = require("morgan");

const helmet = require("helmet");

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();

app.use((req, res, next) => {
  //Todos estos permisos se envian por las cabeceras HTTP
  //Estos permisos se derivan de AJAX(Asynchronous JavaScript XHML)

  //Todos los dominios (origenes)
  res.header('Access-Control-Allow-Origin', '*')

  //Todos los metadatos
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Methods');

  //Todos los métodos HTTP (request methods)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  //Confirmación de los métodos a utilizar
  res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');

  next()

})

const authRoute = require("./routes/authRoutes");
const usersRoute = require("./routes/usersRoutes");
const partnersRoute = require("./routes/partnersRoutes");
const blogRoute = require("./routes/blogRoutes");
const providersRoute = require("./routes/providersRoutes");
const challengesRoute = require("./routes/challengesRoutes");

// Middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(helmet());
app.use(limiter);

// Routes
app.use("/api/auth/", authRoute);
app.use("/api/user/", usersRoute);
app.use("/api/partners", partnersRoute);
app.use("/api/blog", blogRoute);
app.use("/api/providers", providersRoute);
app.use("/api/challenges/", challengesRoute);

module.exports = app;
