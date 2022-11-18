module.exports.DataService = class DataService {

    //SQLite на минималках
    static idCounter = 0;
    static Data = []

    static InitDefaultData() {
        this.CreateTask('Eat', 'Eat description', true);
        this.CreateTask('Sleep', 'Sleep description', true);
        this.CreateTask('Repeat', 'Repeat description', false);
    }
    static Validate(_id, _name, _completed) {
        if (_id && !this.Data.some(t => t.id == _id)) throw new Error("No such id!");
        if (_name) {
            if (typeof _name != "string") throw new Error("Name must me a string!");
            if (_name.length > 32) throw new Error("Name string is too long! Max len - 32");
        }
        if (_completed && typeof _completed != "boolean") throw new Error("complete must me boolean!");
    }

    static CreateTask(_name, _desc, _completed) {
        this.Validate(null, _name, null);

        this.Data.push(
            {
                id: this.idCounter++,
                name: _name,
                desc: _desc,
                completed: _completed,
                createdAt: Date.now()
            }
        );
    }

    static GetTasks() {
        return this.Data;
    }

    static UpdateTask(_id, _name, _desc, _completed) {
        if (_id == null) throw new Error("No task id provided");
        this.Validate(_id, _name, _completed);

        let taskToUpdate = this.Data.find(t => t.id == _id);

        if (_name != null)
            taskToUpdate.name = _name;
        if (_desc != null)
            taskToUpdate.desc = _desc;
        if (_completed != null)
            taskToUpdate.completed = _completed;
    }

    static DeleteTask(_id) {
        if (_id == null) throw new Error("No task id provided");
        this.Validate(_id, null, null);

        this.Data = this.Data.filter(t => t.id != _id);
    }
}