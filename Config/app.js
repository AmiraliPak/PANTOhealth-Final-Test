const express = require("express");
const routesConnect = require("./routes");


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
routesConnect(app);

app.use((err, req, res, next) => {
    if (!err.status) err.status = 503;
    return res
        .status(err.status)
        .json({ error: err.message })
        .end();
});
  
module.exports = app;
