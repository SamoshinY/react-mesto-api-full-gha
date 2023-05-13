const cardRouter = require("express").Router();
const { bodyCard, idCard } = require("../middlewares/request-validation");

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

cardRouter.get("/", getCards)
          .post("/", bodyCard, createCard)
          .delete("/:cardId", idCard, deleteCard)
          .put("/:cardId/likes", idCard, likeCard)
          .delete("/:cardId/likes", idCard, dislikeCard);

module.exports = cardRouter;
