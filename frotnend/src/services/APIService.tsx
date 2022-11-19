import { TaskType } from "../data/Task";

class APIService {
    static GetTasks(): Promise<TaskType[]> {
        return fetch(import.meta.env.VITE_API_ADDRESS as any)
            .then((res) => {
                if (!res.ok) throw new Error();
                return res.json();
            })
    }

    static CreateTask(
        data: {
            name: string,
            desc: string
        }
    ): Promise<Response> {
        return fetch(import.meta.env.VITE_API_ADDRESS as any,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: data.name, desc: data.desc })
            })
            .then((res) => {
                if (!res.ok) throw new Error();
                return res;
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
        return fetch(import.meta.env.VITE_API_ADDRESS as any,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then((res) => {
                if (!res.ok) throw new Error();
                return res;
            });;
    };

    static DeleteTask(id: number): Promise<Response> {
        return fetch(import.meta.env.VITE_API_ADDRESS as any + `?id=${id}`,
            {
                method: 'DELETE'
            })
            .then((res) => {
                if (!res.ok) throw new Error();
                return res;
            });;
    };
}

export default APIService;