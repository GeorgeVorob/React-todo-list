import { TaskType } from "../data/Task";

class APIService {
    static GetTasks(): Promise<TaskType[]> {
        return fetch(process.env.REACT_APP_API_ADDRESS as any)
            .then((res) => { return res.json(); })
    }
}

export default APIService;