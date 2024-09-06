const express = require('express')
const client = require('prom-client');

const app = express()

const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();

collectDefaultMetrics({ register });

app.get("/metrics", async (req, res) => {
    res.setHeader("Content-type", register.contentType);
    res.send(await register.metrics());
});

app.get("/", (_req, res, next) => {
    res.setHeader("Content-type", "text/html");
    res.send(/*html*/"<marquee>Hello world!</marquee>");
});

app.get("/api", (_req, res) => {
    res.json({ hello: "world" })
});

const server = app.listen(4000, '0.0.0.0')

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    server.close(() => {
        console.log('Http server closed.');
        process.exit()
    });
});