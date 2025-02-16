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
      console.error("Erreur SQL :", err);
      response.status(500).send({ messag: "Erreur serveur lors de la connexion." });
      return;
    }

    if (result.length === 0) {
      response.status(401).send({ message: "Identifiant ou mot de passe incorrect" });
      return;
    }

      const user = {
        email: result[0].email,
        id: result[0].id,
        role:result[0].role,
      };

      console.log("Utilisateur trouvé :", user);
      console.log("Mot de passe entré :", password);
    console.log("Mot de passe en base :", result[0].password);

      try {
      const passwordIsValid = await bcrypt.compare(password, result[0].password);

      console.log("Mot de passe valide ?",passwordIsValid);

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
    } catch (error) {
      console.error("Erreur lors de la comparaison du mot de passe :", error);
      response
        .status(401)
        .send({ message: "identifiant ou mot de passe incorrect" });
    }
  });
};

module.exports = { register, login };
