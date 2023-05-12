const jwt = require("jsonwebtoken");
const AuthError = require("../utils/errors/AuthError");

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.send({error: "Что то не так с req.cookies.jwt"})
    return next(new AuthError("Нет токена!"));
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
    );
  } catch (err) {
    return next(new AuthError("Ошибка токена!"));
  }

  req.user = payload;

  return next();
};
