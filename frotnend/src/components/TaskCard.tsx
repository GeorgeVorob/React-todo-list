import { Button, ButtonGroup, IconButton, ToggleButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";
import { TaskType } from "../data/Task";

interface TaskCardProps {
    taskInfo: TaskType
    cardClickCallback: (task: TaskType) => void
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

        props.taskToggleCallback(props.taskInfo.id, !props.taskInfo.completed);
    }

    return (
        <ButtonGroup
            sx={{
                width: '100%'
            }}
            variant="text"
            onClick={() => props.cardClickCallback(props.taskInfo)}>
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