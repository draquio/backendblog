const post = require("../models/post");
const Post = require("../models/post");
const image = require("../utils/image");
const fs = require('fs')

// Crear Post
async function createPost(req, res) {
  const post = new Post(req.body);
  post.create_at = new Date();
  post.miniature = image.getImagePath(req.files.miniature);
  post.save()
    .then((postStored) => {
      res.status(200).send(postStored);
    })
    .catch((error) => {
      res.status(400).send({ msg: "Error al crear el post" });
    });
}

// Listar Post
async function getPost(req, res) {
  const { page = 1, limit = 10} = req.query;
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { create_at:-1 },
  };
  Post.paginate({}, options)
  .then((postStored) => {
    res.status(200).send(postStored);
  })
  .catch((error) => {
    res.status(400).send({ msg: "Error al listar el post" });
    console.error(error);
  })
};

// Actualizar Post
async function updatePost(req, res) {
  const { id } = req.params;
  const postData = req.body;

  // Actualizar Miniatura
  if (req.files.miniature) {
    const imagePath = image.getImagePath(req.files.miniature);
    postData.miniature = imagePath;
  }

  //Update post
  Post.findByIdAndUpdate({ _id: id }, postData)
    .then(() => {
      res.status(200).send({ msg: "Post actualizado" });
    })
    .catch((error) => {
      if (error) {
        res.status(400).send({ msg: "Error al actualizar el post" });
      }
    });
};

// Eliminar Post
async function deletePost(req, res) {
  const { id } = req.params;
  Post.findByIdAndDelete({ _id: id })
    .then(() => {
      res.status(200).send({ msg: "Post eliminado" });
    })
    .catch((error) => {
      if (error) {
        res.status(400).send({ msg: "Error al eliminar el post" });
      }
    });
};

async function inPost(req, res) {
  const { path } = req.params;
  Post.findOne({path})
  .then((postStored) => {
    if (postStored) {
      res.status(200).send(postStored);
    } else {
      res.status(400).send({ msg: "No se ha encontrado ningun post" });
    }
    
  })
  .catch((error) => {
    if (error) {
      res.status(400).send({ msg: "Error del servidor" });
    }
  })

}

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
  inPost,
};
