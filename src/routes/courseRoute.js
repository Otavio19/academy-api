const Course = require("../repository/course.respository");

const courseRoute = async (fastify, options) => {
  const db = new Course();

  const msgError = {
    status: "Internal Server Error",
    message:
      "Ocorreu um erro ao Recuperar os dados do Banco. Por favor, tente novamente mais tarde.",
  };

  fastify.get("/course", async (request, reply) => {
    try {
      const courses = await db.getAll();
      reply.code(200).send(courses);
    } catch (err) {
      reply.code(500).send(msgError);
    }
  });

  fastify.get("/course/:id", async (request, reply) => {
    const id = request.params.id;
    try {
      const course = await db.getById(id);
      reply.code(200).send(course);
    } catch (err) {
      reply.code(500).send(msgError);
    }
  });

  fastify.post("/course", async (request, reply) => {
    const course = request.body;

    try {
      const response = await db.create(course);
      reply.code(200).send(response);
    } catch (err) {
      request.code(500).send(msgError);
    }
  });

  fastify.put("/course/:id", async (request, reply) => {
    const id = request.params.id;
    const course = request.body;

    try {
      const response = await db.update(id, course);
      reply
        .code(200)
        .send({ status: "sucess", message: "Curso Atualizado com sucesso!" });
    } catch (err) {
      reply.code(500).send(msgError);
    }
  });

  fastify.delete("/course/:id", async (request, reply) => {
    const id = request.params.id;
    try {
      const response = await db.delete(id);
      if (!response) {
        reply.code(400).send({
          status: "error",
          message: "Nenhum Curso Encontrado com Esse ID",
        });
      }
      reply.code(200).send({ status: "sucess", message: "Curso Deletado" });
    } catch (err) {
      reply.code(500).send(msgError);
    }
  });
};

module.exports = courseRoute;
