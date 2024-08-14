const express = require("express");
const app = express();

const helloWorld = () => ({ message: "Hello World!2" });

const sum = (a, b) => ({ resultado: a + b });

const helloWorldExpress = (req, res) => {
  const resposta = helloWorld();
  return res.json(resposta);
};
const sumExpress = (req, res) => {
  const resposta = sum(+req.query.a, +req.query.b);
  return res.json(resposta);
};

app.get("/sum", sumExpress);

app.get("/", helloWorldExpress);

const { PORT = 4000 } = process.env;
app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}`);
});
