const User = require("../repository/user.repository");

const userRoute = async (fastify, options) => {
  const db = new User();

  const msgError = {
    status: "Internal Server Error",
    message:
      "Ocorreu um erro ao Recuperar os dados do Banco. Por favor, tente novamente mais tarde.",
  };

  fastify.get("/user", async (request, reply) => {
    try {
      const response = await db.getAll();
      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send(msgError);
    }
  });

  fastify.get("/user/:id", async (request, reply) => {
    const id = request.params.id;
    try {
      const response = await db.getById(id);
      reply.code(200).send(response);
    } catch (err) {
      reply.code(500).send(msgError);
    }
  });

  fastify.post("/user/register", async (request, reply) => {
    const user = request.body;

    try {
      const response = await db.register(user);
      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send(error);
    }
  });
};

module.exports = userRoute;
