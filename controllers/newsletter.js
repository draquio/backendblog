const Newsletter = require("../models/newletter");

// Crear Correos Newsletter
function registerNewsletter(req, res) {
  const { email } = req.body;
  if (!email) return res.status(400).send({ msg: "Debe agregar un correo" });

  const newsletter = new Newsletter({
    email: email.toLowerCase(),
  });
  newsletter.save()
    .then((newsletterStored) => {
      res.status(200).send(newsletterStored);
      console.log("Correo registrado");
    })
    .catch((error) => {
      if (error) {
        res.status(400).send({ msg: "Error al registrar correo" });
      }
    });
}

// Listar Correos Newsletter
function getEmailNewsletter(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };
  Newsletter.paginate({}, options)
    .then((NewsletterStored) => {
      res.status(200).send(NewsletterStored);
    })
    .catch((error) => {
      res.status(400).send({ msg: "Error al listar los correos" });
      console.log(error);
    });
}

// Eliminar Correos Newsletter
function deleteEmailNewsletter(req, res) {
  const { id } = req.params;
  Newsletter.findByIdAndDelete({ _id: id })
    .then(() => {
      res.status(200).send({ msg: "Correo eliminado" });
    })
    .catch((error) => {
      if (error) {
        res.status(400).send({ msg: "Error al eliminar el correo" });
      }
    });
};


module.exports = {
  registerNewsletter,
  getEmailNewsletter,
  deleteEmailNewsletter,
};
