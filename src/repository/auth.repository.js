const sql = require("../../db");
const bcrypt = require("bcrypt"); // Criptografa
const jwt = require("jsonwebtoken"); // Criação do Token
const secret_key = "chavesecreta"; // Chave Secreta para criptografia

class Auth {
  async login(user) {
    const { email, password } = user;

    const userFound = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (userFound.length == 0) {
      return { message: "Usuário Não Encontrado" };
    }

    const hashedPassword = userFound[0].password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return { message: "Senha Não Confere." };
    }

    userFound[0].password = "";
    const token = jwt.sign({ user: userFound[0] }, secret_key, {
      expiresIn: "1h",
    });

    return { token };
  }
}

module.exports = Auth;
