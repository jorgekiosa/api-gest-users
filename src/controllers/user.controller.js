const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async auth(req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(422).json({ message: "O email é obrigatório" });
    }
    if (!password) {
      return res.status(422).json({ message: "A password é obrigatório" });
    }

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(422).json({ message: "Senha inválida!" });
    }

    try {
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );

      const users = await UserModel.findOne({ email: email }).select(
        "-password"
      );
      res
        .status(200)
        .json({ message: "Autenticação realizada com sucesso", users, token });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  async getAll(req, res) {
    try {
      const users = await UserModel.find({}).select("-password");
      if (!users) {
        return res.status(404).json({ message: "Nenhum usuário cadastrado!" });
      }
      res.status(200).json(users);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  async get(req, res) {
    try {
      const id = req.params.id;

      const user = await UserModel.findById(id, "-password");
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },

  async create(req, res) {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(422).json({ message: "O nome é obrigatório" });
    }
    if (!email) {
      return res.status(422).json({ message: "O email é obrigatório" });
    }
    if (!password) {
      return res.status(422).json({ message: "A password é obrigatório" });
    }

    const userExists = await UserModel.findOne({ email: email });

    if (userExists) {
      return res
        .status(404)
        .json({ message: "Esse email já se encontrada cadastrado!" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwrodHash = await bcrypt.hash(password, salt);
    const user = new UserModel({
      name,
      email,
      password: passwrodHash,
    });
    try {
      await user.save();

      res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const userExists = await UserModel.findById(id);
      if (!userExists) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      }).select("-password");

      res.status(200).json({ message: "Usuário alterado com sucesso!", user });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async delete(req, res) {
    try {
      const id = req.params.id;
      const userExists = await UserModel.findById(id);
      if (!userExists) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }
      const user = await UserModel.findByIdAndRemove(id).select("-password");

      res.status(200).json({ message: "Usuário eliminado com sucesso!", user });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};
