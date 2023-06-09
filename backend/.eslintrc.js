module.exports = {
  extends: "airbnb-base",
  rules: {
    quotes: ["error", "double"],
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "linebreak-style": "off",
  },
};
