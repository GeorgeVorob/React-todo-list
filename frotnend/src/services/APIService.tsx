import { TaskType } from "../data/Task";

class APIService {
    static GetTasks(): Promise<TaskType[]> {
        return fetch(process.env.REACT_APP_API_ADDRESS as any)
            .then((res) => { return res.json(); })
    }

    static CreateTask(
        data: {
            name: string,
            desc: string
        }
    ): Promise<Response> {
        return fetch(process.env.REACT_APP_API_ADDRESS as any,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: data.name, desc: data.desc })
            });
    }
}

export default APIService;