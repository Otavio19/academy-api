const Auth = require("../repository/auth.repository");

const authRoute = async (fastify, option) => {
  const db = new Auth();

  fastify.post("/auth/login", async (request, reply) => {
    const user = request.body;

    try {
      const response = await db.login(user);
      reply.code(200).send(response);
    } catch (err) {
      reply.code(500).send(err);
    }
  });
};

module.exports = authRoute;
