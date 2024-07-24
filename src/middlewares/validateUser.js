const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validateUserBody = (req, res, next) => {
  const { body } = req;
  if (body.name == undefined || body.name == "") {
    return res
      .status(400)
      .json({
        message: "O campo nome é obrigatório ou nome deve ser preenchido",
      });
  }
  next();
};

const userExists = (req, res, next) => {
  const { body } = req;
  if (body.nome == undefined || body.nome == "") {
    return res
      .status(400)
      .json({
        message: "O campo nome é obrigatório ou nome deve ser preenchido",
      });
  }
  next();
};

module.exports = {
  validateUserBody,
  userExists,
};
