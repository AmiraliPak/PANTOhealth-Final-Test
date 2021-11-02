const cpuTempsController = require("../Src/Controllers/CpuTempsController");

module.exports = (app) => {

    app.post("/cputemps", cpuTempsController.insert); // post value in influxDB
    app.get("/cputemps/test", cpuTempsController.getTemp); // gets instant temperature
}