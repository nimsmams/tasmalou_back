const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const Gender = require("../model/genderEnum");
const Role = require("../model/roleEnum");

const register = async (request, response) => {
  // récupération des données
  let { lastname, firstname, email, password, age, gender, role } =
    request.body;

  if (
    lastname == "" ||
    firstname == "" ||
    email == "" ||
    password == "" ||
    age == "" ||
    gender == ""
  ) {
    response.status(400).send({ message: "Veuillez remplir tous les champs" });
    return;
  }

  if (!Gender.hasOwnProperty(gender)) {
    response.status(400).send({ message: "Le genre n'est pas bon." });
    return;
  }

  if (role == undefined) {
    role = Role.USER;
  } else {
    if (!Role.hasOwnProperty(role)) {
      response.status(400).send({ message: "Le role n'est pas bon." });
      return;
    }

    role = role;
  }

  // crypter le mot de passe
  const hashedPassword = await bcrypt.hash(password, 5);

  let values = [lastname, firstname, email, hashedPassword, age, gender, role];

  // appel de la méthode saveUser définie dans le userModel
  userModel.saveUser(values, (err, result) => {
    if (err) {
      response.status(400).send({ message: "erreur lors de l'insertion" });
      return;
    }

    // response.send("Inscription realisee", res.insertId); probleme
    response.send({ message: "Inscription réalisée", id: result.insertId });
  });
};

//
const login = (request, response) => {
  // récupération des données
  let { email, password } = request.body;

  userModel.login(email, async (err, result) => {
    if (err) {
      response.status(500).send({ messag: "email introuvable" });
      return;
    }

    if (result.length != 0) {
      // let user = result[0];
      const user = {
        email: result[0].email,
        id: result[0].id,
        role:result[0].role,
      }
      console.log(user);
      const passwordIsValid = await bcrypt.compare(password, result[0].password);

      if (!passwordIsValid) {
        response
          .status(401)
          .send({ message: "identifiant ou mot de passe incorrect" });
        return;
      }

      // generation du token
      const token = jwt.sign(
        { userId: user.id, email: user.email, role:user.role},
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      response.status(200).send({ user, token });
    } else {
      response
        .status(401)
        .send({ message: "identifiant ou mot de passe incorrect" });
    }
  });
};

module.exports = { register, login };
