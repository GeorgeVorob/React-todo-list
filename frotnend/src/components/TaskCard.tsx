import { Button, ButtonGroup, IconButton, ListItemButton, ToggleButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";

interface TaskCardProps {
    cardClickCallback: (id: number) => void
    deleteButtonClickCallback: (id: number) => void
    taskToggleCallback: (id: number) => void
}

function TaskCard(props: TaskCardProps) {

    function OnDeleteButtonClick(event: React.MouseEvent) {
        event.stopPropagation();

        props.deleteButtonClickCallback(0);
    }

    function OnToggleClick(event: React.MouseEvent) {
        event.stopPropagation();

        setSelected(!selected);
        props.taskToggleCallback(0);
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
            >I am a task</Button>
            <ToggleButton
                value="check"
                selected={selected}
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