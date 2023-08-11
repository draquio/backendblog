const Menu = require("../models/menu");


// Crear Menu
async function createMenu(req, res) {
  const menu = new Menu(req.body);
  menu.save()
    .then((menuStored) => {
      res.status(200).send(menuStored);
      console.log("Menu Creado");
    })
    .catch((error) => {
      if (error) {
        res.status(400).send({ msg: "Error al crear el Menu" });
      }
    });
}

// Listar Menus
async function getMenus(req, res) {
  const { active } = req.query;
  let response = null;
  if (active === undefined) {
    response = await Menu.find().sort( {order: "asc"} );
  } else {
    response = await Menu.find({ active }).sort( {order: "asc"} );
  }
  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado Menus" });
  } else {
    res.status(200).send(response);
  }
  
}


// Actualizar Menus
async function updateMenu(req, res) {
  const { id } = req.params;
  const menuData = req.body;
  console.log(menuData);

  Menu.findByIdAndUpdate({ _id: id }, menuData)
    .then(() => {
      res.status(200).send({ msg: "Menu actualizado" });
      // console.log(menuData);
    })
    .catch((error) => {
      if (error) {
        res.status(400).send({ msg: "Error al actualizar el menu" });
      }
    });
}

// Eliminar Menus
async function deleteMenu(req, res) {
  const { id } = req.params;
  Menu.findByIdAndDelete({ _id: id })
    .then(() => {
      res.status(200).send({ msg: "Menu eliminado" });
    })
    .catch((error) => {
      if (error) {
        res.status(400).send({ msg: "Error al eliminar el Menu" });
      }
    });
}

module.exports = {
  createMenu,
  getMenus,
  updateMenu,
  deleteMenu,
};
