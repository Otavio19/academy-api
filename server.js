const fastify = require("fastify")();
const cors = require("@fastify/cors");
const courseRoute = require("./src/routes/courseRoute");
const userRoute = require("./src/routes/userRoute");
const authRoute = require("./src/routes/authRoute");
const port = 3333;

fastify.register(cors, {
  origin: "*",
});

fastify.register(courseRoute);
fastify.register(userRoute);
fastify.register(authRoute);

fastify.listen(
  {
    host: "0.0.0.0",
    port: port,
  },
  (erro) => {
    if (erro) {
      console.log(erro);
      process.exit(1);
    }
    console.log(`Servidor rodando em ${port}`);
  }
);
