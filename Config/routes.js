const cpuTempsController = require("../Src/Controllers/CpuTempsController");
const avgCpuTempsController = require("../Src/Controllers/AvgCpuTempController");

module.exports = (app) => {

    app.get("/cputemps/average", avgCpuTempsController.getLast); // get last doc in mongoDB
    app.post("/cputemps", cpuTempsController.insert); // post value in influxDB
    app.get("/cputemps/test", cpuTempsController.getTemp); // gets instant temperature
}