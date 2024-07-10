const sql = require("../../db");
const { randomUUID } = require("crypto");

const bcrypt = require("bcrypt"); // Criptografa

class User {
  async getAll() {
    const users = await sql`SELECT * FROM users`;
    return users;
  }

  async getById(id) {
    const user = await sql`SELECT * FROM users WHERE id = ${id}`;
    if (user == 0) {
      return { message: "Usuário Não Encontrado" };
    }
    return user[0];
  }

  async register(user) {
    const id = randomUUID();
    const { name, email, password } = user;

    const newPassword = bcrypt.hashSync(password, 10);

    const response =
      await sql`INSERT INTO users(id, name, email, password) VALUES (${id}, ${name}, ${email}, ${newPassword})`;

    return response;
  }
}

module.exports = User;
