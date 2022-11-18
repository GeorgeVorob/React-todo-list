module.exports.DataService = class DataService {

    //SQLite на минималках
    static idCounter = 0;
    static Data = []

    static InitDefaultData() {
        this.CreateTask('Eat', 'Eat description', true);
        this.CreateTask('Sleep', 'Sleep description', true);
        this.CreateTask('Repeat', 'Repeat description', false);
    }

    static CreateTask(_name, _desc, _complete) {
        this.Data.push(
            {
                id: this.idCounter++,
                name: _name,
                desc: _desc,
                completed: _complete,
                createdAt: Date.now()
            }
        );
    }

    static GetTasks() {
        return this.Data;
    }
}