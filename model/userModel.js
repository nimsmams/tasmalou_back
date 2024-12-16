const environement = require("dotenv");
environement.config();
const connexion = require("../config/db");

// enregistrer un user
const saveUser = (values, callback) => {
  let sql =
    "INSERT INTO `user` (lastname, firstname, email, password, age, gender, role) VALUES (?,?,?,?,?,?,?)";
  connexion.query(sql, values, (err, res) => {
    callback(err, res);
  });
};

// connecter un user
const login = (email, callback) => {
  let sql = "SELECT email, id, password, role FROM `user` WHERE email=?";
  connexion.query(sql, [email], (err, res) => {
    callback(err, res);
  });
};

module.exports = {
  saveUser,
  login,
};
