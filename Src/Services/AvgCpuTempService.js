class AvgCpuTempsService {
    constructor(model) {
        this.model = model; // mongoose.model
        this.insert = this.insertOne.bind(this);
        this.getOne = this.getOne.bind(this);
    }

    async insertOne(data) {
        const item = this.model.create(data);
        if (item) return item;
    }

    async getOne(query, sort) {
        const item =
            await this.model
                .findOne(query)
                .sort(sort);
        return item;
    }
}

module.exports = AvgCpuTempsService;