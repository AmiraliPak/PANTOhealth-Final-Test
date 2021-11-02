const CpuTemperature = require("../Models/CpuTempModel");
const { getCpuTemperature } = require("../Scripts/GetCpuTemp");
const CpuTempsService = require("../Services/CputempsService");


/**
 * A controller for CpuTempsService.
 * @param {CpuTempsService} service
 */
class CpuTempsController{
    constructor(service) {
        this.service = service;

        this.insert = this.insert.bind(this);
    }

    async getTemp(req, res, next) { // for testing purposes
        const temp = await getCpuTemperature();
        res.json(`temp in ${new Date()}: ${temp}`);
    }

    async insert(req, res, next) {
        try {
            const { temperature } = req.body;
            if (isNaN(temperature))
                throw { status: 400, message: "temperature must be a number" };
            const cpuTemp = new CpuTemperature(temperature);
            await this.service.insertOne(cpuTemp);
            return res.sendStatus(201).end();
        }
        catch (err) { next(err); }
    }
}

module.exports = new CpuTempsController(new CpuTempsService());