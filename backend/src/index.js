var express = require('express');
const { UseTasks } = require('./controllers/tasks');
const { DataService } = require('./services/DataService');

var app = express();
app.get('/', function (req, res) {
    res.send('Hello World!');
});

UseTasks(app);

DataService.InitDefaultData();

app.listen(3001, function () {
    console.log('Listening port 3001');
});