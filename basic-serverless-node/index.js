const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const helloWorld = () => ({ message: "Hello World!" });
exports.helloWorld = async (event, context) => {
  const resposta = helloWorld();
  return {
    statusCode: 200,
    body: JSON.stringify(resposta),
  };
};

const sum = (a, b) => ({ resultado: a + b });
exports.sum = async function (event, context) {
  const resposta = sum(
    +event.queryStringParameters.a,
    +event.queryStringParameters.b
  );
  return {
    statusCode: 200,
    body: JSON.stringify(resposta),
    // body: JSON.stringify(event)
  };
};

const client = new DynamoDBClient({ region: "us-east-1" });

function obterDataHoraAtual() {
  // Cria um novo objeto Date com a data e hora atuais
  const agora = new Date();

  // Extrai o ano, mês, dia, hora, minuto e segundo
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, "0"); // Meses são baseados em zero
  const dia = String(agora.getDate()).padStart(2, "0");
  const hora = String(agora.getHours()).padStart(2, "0");
  const minuto = String(agora.getMinutes()).padStart(2, "0");
  const segundo = String(agora.getSeconds()).padStart(2, "0");

  // Monta a string no formato desejado
  return `${ano}-${mes}-${dia}-${hora}-${minuto}-${segundo}`;
}

const dynamo = async (valor) => {
  const command = new PutItemCommand({
    TableName: "AulaJp",
    Item: {
      id: {
        S: obterDataHoraAtual(),
      },
      nome: {
        S: valor,
      },
    },
  });

  await client.send(command);
  return true;
};
exports.dynamo = async function (event, context) {
  const resposta = await dynamo(event.pathParameters.valor);
  return {
    statusCode: 200,
    body: JSON.stringify(resposta),
  };
};
