import { Box, Button, Divider, List, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import TaskCard from "./TaskCard";
import TaskViewAndEditModal from "./TaskViewAndEditModal";

function TaskList() {

    const [tasks, SetTasks] = useState([]);
    const [modalOpened, SetModalOpened] = useState(false);

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

    return (<>
        <List>
            <TaskCard
                cardClickCallback={OnTaskClick}
                deleteButtonClickCallback={OnTaskDeleteButtonClick}
                taskToggleCallback={OnTaskToggle}
            ></TaskCard>
            <Divider />
            <TaskCard
                cardClickCallback={OnTaskClick}
                deleteButtonClickCallback={OnTaskDeleteButtonClick}
                taskToggleCallback={OnTaskToggle}
            ></TaskCard>
            <Divider />            <TaskCard
                cardClickCallback={OnTaskClick}
                deleteButtonClickCallback={OnTaskDeleteButtonClick}
                taskToggleCallback={OnTaskToggle}
            ></TaskCard>
            <Divider />
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