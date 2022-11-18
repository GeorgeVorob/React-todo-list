import { Button, ButtonGroup, IconButton, ListItemButton, ToggleButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";
import { TaskType } from "../data/Task";

interface TaskCardProps {
    taskInfo: TaskType
    cardClickCallback: (id: number) => void
    deleteButtonClickCallback: (id: number) => void
    taskToggleCallback: (id: number, state: boolean) => void
}

function TaskCard(props: TaskCardProps) {

    function OnDeleteButtonClick(event: React.MouseEvent) {
        event.stopPropagation();

        props.deleteButtonClickCallback(props.taskInfo.id);
    }

    function OnToggleClick(event: React.MouseEvent) {
        event.stopPropagation();

        setSelected(!selected);
        props.taskToggleCallback(props.taskInfo.id, !props.taskInfo.completed);
    }

    const [selected, setSelected] = useState(false);

    return (
        <ButtonGroup
            sx={{
                width: '100%'
            }}
            variant="text"
            onClick={() => props.cardClickCallback(4)}>
            <Button
                sx={{
                    width: '100%',
                }}
            >{props.taskInfo.name}</Button>
            <ToggleButton
                value="check"
                selected={props.taskInfo.completed}
                onChange={OnToggleClick}
            >
                <CheckIcon />
            </ToggleButton>
            <IconButton
                sx={{
                    borderRadius: 0
                }}
                onClick={OnDeleteButtonClick}>
                <DeleteIcon />
            </IconButton>
        </ButtonGroup>
    )
}

export default TaskCard;