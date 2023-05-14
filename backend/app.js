require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const { PORT = 3000 } = process.env;
const app = express();
const corsHandler = require("./middlewares/cors-processing");
const { errors } = require("celebrate");
const router = require("./routes/index");
const errorsHandler = require("./middlewares/handler-errors");
const rateLimiter = require("./middlewares/rate-limiter");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app
  .options("*", corsHandler)
  .use(corsHandler)
  .use(corsHandler)
  .use(express.json())
  .use(helmet())
  .use(rateLimiter)
  .use(cookieParser())
  .use(requestLogger)
  .get('/crash-test', () => {
    setTimeout(() => {
      throw new Error('Сервер сейчас упадёт');
    }, 0);
  })
  .use(router)
  .use(errorLogger)
  .use(errors())
  .use(errorsHandler)
  .listen(PORT);
