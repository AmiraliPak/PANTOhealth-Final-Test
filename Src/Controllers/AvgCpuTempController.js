const AvgCpuTempsService = require("../Services/AvgCpuTempService");
const AvgCpuTempsModel = require("../Models/AvgCpuTempModel");


/**
 * A controller for AvgCpuTempsService.
 * @param {AvgCpuTempsService} service
 */
class AvgCpuTempsController{
    constructor(service) {
        this.service = service;

        this.getLast = this.getLast.bind(this);
    }


    async getLast(req, res, next) {
        try {
            const item = await this.service.getOne({}, { 'createdAt': -1 });
            if (!item)
                throw { status: 404, message: 'no available items' };
            return res.json({ lastAverage: item }).end();
        }
        catch (err) { next(err); }
    }
}

module.exports = new AvgCpuTempsController(new AvgCpuTempsService(AvgCpuTempsModel));