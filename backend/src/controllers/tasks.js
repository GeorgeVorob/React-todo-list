const { DataService } = require("../services/DataService");

module.exports.UseTasks = UseTasks = (app) => {
    app.get('/tasks', function (req, res) {
        res.json(DataService.GetTasks());
    });

}