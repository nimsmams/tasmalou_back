const express = require("express"); // importation du module express
const cors = require("cors"); // importation du module cors
const UserRoute = require("./route/userRoute");
const ProductRoute = require("./route/productRoute");
const CategoryRoute = require("./route/categoryRoute");

// instance de l'application (le serveur) la variable app peut etre appelée n'importe comment
const app = express();

app.use(express.json());
app.use(cors()); // utilisation du module cors par le serveur

app.use("/user", UserRoute);
app.use("/product", ProductRoute);
app.use("/category", CategoryRoute);

// initialisation du serveur
app.listen(3000, () => {
  console.log("Serveur en marche sur le port : 3000");
});
