const { DataService } = require("../services/DataService");

module.exports.UseTasks = UseTasks = (app) => {
    app.get('/tasks', function (req, res) {
        res.json(DataService.GetTasks());
    });

    app.put('/tasks', function (req, res, next) {
        let data = req.body;
        try {
            DataService.UpdateTask(data.id, data.name, data.desc, data.completed);
            res.sendStatus(200);
        }
        catch (error) {
            console.log(error);

            res.status(400);
            res.json(error.message);
        }
    });
}