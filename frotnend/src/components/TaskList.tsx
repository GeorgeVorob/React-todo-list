import { Button, Divider, List, TextField } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import APIService from "../services/APIService";
import TaskCard from "./TaskCard";
import TaskViewAndEditModal from "./TaskViewAndEditModal";
import { NewTaskSchema } from "../data/Task";

type NewTaskInputs = {
    name: string,
    desc: string,
};


function TaskList() {
    const [modalOpened, SetModalOpened] = useState(false);

    const queryClient = useQueryClient();
    const { status, data } = useQuery({ queryKey: ['getTasks'], queryFn: APIService.GetTasks })
    const newTaskMutation = useMutation({
        mutationFn: APIService.CreateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getTasks'] })
        },
    })
    const updateTaskMutation = useMutation({
        mutationFn: APIService.UpdateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getTasks'] })
        },
    })
    const deleteTaskMutation = useMutation({
        mutationFn: APIService.DeleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getTasks'] })
        },
    })

    const { register, handleSubmit, formState: { errors } } = useForm<NewTaskInputs>({
        resolver: zodResolver(NewTaskSchema)
    });
    const onTaskCreation: SubmitHandler<NewTaskInputs> = (data) => {
        newTaskMutation.mutate({ name: data.name, desc: data.desc });
    }

    function OnTaskDeleteButtonClick(id: number) {
        deleteTaskMutation.mutate(id);
    }

    function OnTaskToggle(id: number, state: boolean) {
        updateTaskMutation.mutate({ id: id, completed: state });
    }


    function OnTaskClick() {
        SetModalOpened(true);
    }

    function OnModalClose() {
        SetModalOpened(false);
    }

    let tasksDisplay;
    if (status == "loading") {
        tasksDisplay = <h3>Loading...</h3>
    }
    if (status == "error") {
        tasksDisplay = <h3>Error!</h3>
    }
    if (status == "success") {
        tasksDisplay = data.map(t => {
            return (<div key={t.id}>
                <TaskCard
                    taskInfo={t}
                    cardClickCallback={OnTaskClick}
                    deleteButtonClickCallback={OnTaskDeleteButtonClick}
                    taskToggleCallback={OnTaskToggle}
                ></TaskCard>
                <Divider />
            </div>)
        })
    }
    return (<>
        <List>
            {tasksDisplay}
        </List>

        {/*New task form */}
        <form
            onSubmit={handleSubmit(onTaskCreation)}
            style={{ border: '1px dashed gray', padding: 15 }}>
            <TextField
                required
                id="task-name"
                label="New task name"
                defaultValue="Hello World"
                {...register("name")}
            />
            {errors.name && <span>{errors.name.message}</span>}
            <TextField
                label="Description"
                sx={{ width: '100%' }}
                multiline
                id='task-desc'
                {...register("desc")} />
            <Button type="submit">Add</Button>
        </form>

        <TaskViewAndEditModal
            opened={modalOpened}
            closeCallback={OnModalClose} />
    </>);
}

export default TaskList;