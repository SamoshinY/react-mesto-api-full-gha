require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
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

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

// const allowedCors = [
//   "https://praktikum.tk",
//   "http://praktikum.tk",
//   "http://samoshin.nomoredomains.monster",
//   "https://samoshin.nomoredomains.monster",
//   "localhost:3000",
//   "http://localhost:3000",
// ];

// const corsOptions = {
//   origin: allowedCors,
//   credentials: true,
// }
// app.options("*", cors(corsOptions))
// app.use(cors(corsOptions));
app
  .use(corsHandler)
  .use(express.json())
  .use(helmet())
  .use(rateLimiter)
  .use(cookieParser())
  .use(requestLogger)
  .use(router)
  .use(errorLogger)
  .use(errors())
  .use(errorsHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
