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

    static UpdateTask(
        data: {
            id: number
            name?: string,
            desc?: string,
            completed?: boolean
        }
    ): Promise<Response> {
        return fetch(process.env.REACT_APP_API_ADDRESS as any,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    };

    static DeleteTask(id: number): Promise<Response> {
        return fetch(process.env.REACT_APP_API_ADDRESS as any + `?id=${id}`,
            {
                method: 'DELETE'
            });
    };
}

export default APIService;