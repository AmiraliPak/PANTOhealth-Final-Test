const express = require("express");
const mongodbConnect = require("./mongodb").connect;
const influxdbConnect = require("./influxdb").connect;
const routesConnect = require("./routes");
const cpuTempTimed = require("../Src/Scripts/CpuTempTimed");


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
routesConnect(app);
mongodbConnect();
influxdbConnect();

cpuTempTimed();

app.use((err, req, res, next) => {
    if (!err.status) err.status = 503;
    return res
        .status(err.status)
        .json({ error: err.message })
        .end();
});
  
module.exports = app;
