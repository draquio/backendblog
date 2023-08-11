const bcrypt = require("bcryptjs");
const User = require("../models/user");
const image = require("../utils/image");
const fs = require("fs");

// Mi usuario
async function getMe(req, res) {
  const { user_id } = req.user;
  const response = await User.findById(user_id);
  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado usuario" });
  } else {
    res.status(200).send(response);
  }
}

// Listar Usuarios
async function getUsers(req, res) {
  const { active } = req.query;
  let response = null;
  if (active === undefined) {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }
  res.status(200).send(response);
}

// Crear Usuarios
async function createUser(req, res) {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPaswword = bcrypt.hashSync(password, salt);
  const user = new User({ ...req.body, active: false, password: hashPaswword });
  if (req.files.avatar) {
    const imagePath = image.getImagePath(req.files.avatar);
    user.avatar = imagePath;
  }

  user
    .save()
    .then((userStored) => {
      res.status(200).send(userStored);
      console.log("Usuario Creado");
    })
    .catch((error) => {
      res.status(400).send({ msg: "Error al crear el usuario" });
    });
}

// Actualizar Usuarios
async function updateUser(req, res) {
  const { id } = req.params;
  const userData = req.body;

  //update passowrd
  if (userData.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPaswword = bcrypt.hashSync(userData.password, salt);
    userData.password = hashPaswword;
  } else {
    delete userData.password;
  }

  //Update Avatar
  if (req.files.avatar) {
    const imagePath = image.getImagePath(req.files.avatar);
    userData.avatar = imagePath;
  }

  //Update user
  User.findByIdAndUpdate({ _id: id }, userData)
    .then(() => {
      res.status(200).send({ msg: "Usuario actualizado" });
    })
    .catch((error) => {
      if (error) {
        res.status(400).send({ msg: "Error al actualizar el usuario" });
      }
    });
}

// Eliminar Usuarios
async function deleteUser(req, res) {
  const { id } = req.params;
  User.findByIdAndDelete({ _id: id })
    .then(() => {
      res.status(200).send({ msg: "Usuario eliminado" });
    })
    .catch((error) => {
      if (error) {
        res.status(400).send({ msg: "Error al eliminar el usuario" });
      }
    });
}
module.exports = {
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
