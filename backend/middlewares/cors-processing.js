const cors = require("cors");

const allowedCors = [
  "https://praktikum.tk",
  "http://praktikum.tk",
  "http://samoshin.nomoredomains.monster",
  "https://samoshin.nomoredomains.monster",
  "localhost:3000",
];

const corsOptions = {
  origin: allowedCors,
  credentials: true,
};

 module.exports = cors(corsOptions);
