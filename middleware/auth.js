const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const tokenIsInclude = req.headers.authorization;
    if (!tokenIsInclude) {
      return res.status(401).json({
        message:
          "le token n'est pas present veuillez vous connecter pour avoir votre token",
      });
    }
    let transform = tokenIsInclude.split(" ");
    let token = transform[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
      if (err) {
        // si le token est pas valide ou qu'il soit expire
        throw new Error("token expiré ou invalide");
      }
      next();
    });
  } catch (error) {
    console.log(` ${__filename} - error auth : ${error.message}`);
    res.status(401).json({ error: error ?? "requete non authentifiée" });
  }
};

module.exports = {
  auth,
};
