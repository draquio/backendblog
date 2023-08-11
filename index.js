const mongoose = require("mongoose");
const app = require("./app");
const {
  DB_User,
  DB_Password,
  DB_Host,
  IP_Server,
  API_Version,
} = require("./constants");

// mongoose.connect(`mongodb+srv://${DB_User}:${DB_Password}@${DB_Host}/`);
const PORT = process.env.port || 3977;
const dbName = 'test';
const uri = `mongodb+srv://${DB_User}:${DB_Password}@${DB_Host}/test`;

try {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.listen(PORT, () => {
    console.log("##################");
    console.log("#### API REST ####");
    console.log("##################");
    console.log(`http://${IP_Server}:${PORT}/api/${API_Version}`);
  });
} catch (error) {
  console.error('Error al conectar a MongoDB:', error);
    throw error;
}


  // mongoose.connect(`mongodb+srv://${DB_User}:${DB_Password}@${DB_Host}/`)
  // .then(() => {
  //   app.listen(PORT, () => {
  //     console.log("##################");
  //     console.log("#### API REST ####");
  //     console.log("##################");
  //     console.log(`http://${IP_Server}:${PORT}/api/${API_Version}`);
  //   });
  // })
  // .catch((e) => {
  //   console.log("No se pudo conectar");
  //   console.log(e);
  // });
