import { Button, Divider, List, TextField } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from 'notistack';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';

import APIService from "../services/APIService";
import TaskCard from "./TaskCard";
import TaskViewAndEditModal from "./TaskViewAndEditModal";
import { NewTaskInputs, NewTaskSchema, TaskType } from "../data/Task";


function TaskList() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const queryClient = useQueryClient();
    const { status, data } = useQuery({ queryKey: ['getTasks'], queryFn: APIService.GetTasks })

    const newTaskMutation = useMutation({
        mutationFn: APIService.CreateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getTasks'] })
            enqueueSnackbar('Task created!');
        },
        onError: () => {
            enqueueSnackbar('Error creating task!');
        }
    })
    const updateTaskMutation = useMutation({
        mutationFn: APIService.UpdateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getTasks'] })
            enqueueSnackbar('Task updated!');
        },
        onError: () => {
            enqueueSnackbar('Error updating task!');
        }
    })
    const deleteTaskMutation = useMutation({
        mutationFn: APIService.DeleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getTasks'] })
            enqueueSnackbar('Task deleted!');
        },
        onError: () => {
            enqueueSnackbar('Error deleting task!');
        }
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


    const [taskInModal, SetTaskInModal] = useState<TaskType | null>(null);
    function OnTaskClick(taskToModal: TaskType) {
        SetTaskInModal(taskToModal);
    }
    function OnModalClose() {
        SetTaskInModal(null);
    }
    function OnTaskInModalUpdate(id: number, newDesc: string, newName: string) {
        updateTaskMutation.mutate({ id: id, desc: newDesc, name: newName });
    }

    let tasksDisplay;
    if (status === "loading") {
        tasksDisplay =
            <Collapse key={-1}>
                <h3>Loading...</h3>
            </Collapse>
    }
    if (status === "error") {
        <Collapse key={-2}>
            <h3>Error!</h3>
        </Collapse>
    }
    if (status === "success") {
        tasksDisplay = data.map(t => {
            return (<Collapse key={t.id}>
                <TaskCard
                    taskInfo={t}
                    cardClickCallback={OnTaskClick}
                    deleteButtonClickCallback={OnTaskDeleteButtonClick}
                    taskToggleCallback={OnTaskToggle}
                ></TaskCard>
                <Divider />
            </Collapse>)
        })
    }
    return (<>
        <List>
            <TransitionGroup>
                {tasksDisplay}
            </TransitionGroup>
        </List>

        {/*New task form. TODO: Move to external component. */}
        <form
            onSubmit={handleSubmit(onTaskCreation)}
            style={{ border: '1px dashed gray', padding: 15 }}>
            <TextField
                required
                id="task-name"
                label="New task name"
                defaultValue="Do stuff"
                {...register("name")}
            />
            {errors.name && <span>{errors.name.message}</span>}
            <TextField
                label="Description"
                sx={{ width: '100%' }}
                id='task-desc'
                {...register("desc")} />
            <Button type="submit">Add</Button>
        </form>

        <TaskViewAndEditModal
            updateTaskCallback={OnTaskInModalUpdate}
            taskInfo={taskInModal}
            closeCallback={OnModalClose} />
    </>);
}

export default TaskList;