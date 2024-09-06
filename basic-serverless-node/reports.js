const {
  SQSClient,
  SendMessageCommand,
  GetQueueUrlCommand,
} = require("@aws-sdk/client-sqs");
const { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand, S3 } = require("@aws-sdk/client-s3");

const ExcelJS = require("exceljs");
const { Stream } = require("node:stream");

const sqs = new SQSClient({ region: "us-east-1" });
const s3 = new S3Client({ region: "us-east-1" });

exports.pedirRelatorio = async (event, context) => {
  await sqs.send(
    new SendMessageCommand({
      QueueUrl: "https://sqs.us-east-1.amazonaws.com/477612276095/matheus-fila",
      MessageBody: new Date().toISOString(),
    })
  );
  return {
    statusCode: 200,
    body: JSON.stringify("OK"),
  };
};

exports.processarRelatorio = async (event) => {
  for (const record of event.Records) {
    const workbook = new ExcelJS.Workbook();

    const sheet = workbook.addWorksheet("My Sheet");

    sheet.columns = [
      {
        header: "Item",
        key: "item",
      },
      {
        header: "First Name",
        key: "firstName",
      },
      {
        header: "Last Name",
        key: "lastName",
      },
    ];

    const values = [
      { item: "1", firstName: "Matheus", lastName: "Gloria" },
      {
        item: "2",
        firstName: "Monark",
        lastName: "Lucas",
      },
    ];

    for (const value of values) {
      sheet.addRow(value);
    }

    const stream = new Stream.PassThrough();

    await workbook.xlsx.write(stream);

    await s3.send(
      new PutObjectCommand({
        Bucket: "matheus-relatorios",
        Key: `${Date.now()}.xlsx`,
        Body: stream,
        ContentType: "application/octet-stream",
        ContentLength: stream.readableLength,
      })
    );
  }
};

exports.listarRelatorios = async (event, context) => {
  const resposta = helloWorld();
  return {
    statusCode: 200,
    body: JSON.stringify(resposta),
  };
};

exports.limparRelatorios = async (event, context) => {
    const input = {
        "Bucket": "matheus-relatorios"
      };
      const command = new ListObjectsV2Command(input);
      const response = await s3.send(command);

      if (!response.Contents){
        return {
            statusCode: 200,
            body: JSON.stringify("Bucket Vazio"),
          };
      }

      for (const objeto of response.Contents) {
        const input = {
            "Bucket": "matheus-relatorios",
            "Key": objeto.Key
          };
          const command = new DeleteObjectCommand(input);
          await s3.send(command);
      }
  return {
    statusCode: 200,
    body: JSON.stringify(response.Contents),
  };
};
