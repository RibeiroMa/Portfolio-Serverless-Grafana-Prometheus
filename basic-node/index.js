const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

const { PORT = 4000 } = process.env;
app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}`);
});
