import { Box, Button, Divider, List, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { isConditionalExpression } from "typescript";
import APIService from "../services/APIService";
import TaskCard from "./TaskCard";
import TaskViewAndEditModal from "./TaskViewAndEditModal";

function TaskList() {

    const [modalOpened, SetModalOpened] = useState(false);
    const queryClient = useQueryClient();

    const [tasks, SetTasks] = useState([]);
    const { status, data } = useQuery({ queryKey: ['todos'], queryFn: APIService.GetTasks })

    function OnTaskClick() {
        SetModalOpened(true);
    }

    function OnTaskDeleteButtonClick() {
        alert(2);
    }

    function OnTaskToggle() {
        alert(3);
    }

    function OnModalClose() {
        SetModalOpened(false);
    }

    useEffect(() => {
        APIService.GetTasks()
            .then((data) => {
                console.log(data);
            })
    }, []);

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
        <div style={{ border: '1px dashed gray', padding: 15 }}>
            <TextField
                required
                id="task-name"
                label="New task name"
                defaultValue="Hello World"
            />
            <TextField label="Description" sx={{ width: '100%' }} multiline id='task-desc' />
            <Button>Add</Button>
        </div>
        <TaskViewAndEditModal
            opened={modalOpened}
            closeCallback={OnModalClose} />
    </>);
}

export default TaskList;