import { Box, Divider, List, Modal, Typography } from "@mui/material";
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

        <TaskViewAndEditModal
            opened={modalOpened}
            closeCallback={OnModalClose} />
    </>);
}

export default TaskList;