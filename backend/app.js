require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const { PORT = 3000 } = process.env;
const app = express();
const { errors } = require("celebrate");
const mongoose = require("mongoose");
const corsHandler = require("./middlewares/cors-processing");
const router = require("./routes/index");
const errorsHandler = require("./middlewares/handler-errors");
const rateLimiter = require("./middlewares/rate-limiter");
const { requestLogger, errorLogger } = require("./middlewares/logger");

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app
  .options("*", corsHandler)
  .use(corsHandler)
  .use(express.json())
  .use(helmet())
  .use(rateLimiter)
  .use(cookieParser())
  .use(requestLogger)
  .use(router)
  .use(errorLogger)
  .use(errors())
  .use(errorsHandler)
  .listen(PORT);
