import { Backdrop, Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { TaskType } from "../data/Task";

interface TaskViewAndEditModalProps {
    taskInfo: TaskType | null
    closeCallback: () => void
    updateTaskCallback: (id: number, newDesc: string) => void
}

function TaskViewAndEditModal(props: TaskViewAndEditModalProps) {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [editMode, setEditMode] = useState(false);
    const [editableDesc, setEditableDesc] = useState("");

    function OnModalClose() {
        setEditMode(false);
        props.closeCallback();
    }

    function OnEditStart() {
        setEditableDesc(props.taskInfo?.desc!);

        setEditMode(true);
    }

    const HandleDescEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditableDesc(event.target.value);
    };

    function OnEditSubmit() {
        setEditMode(false);

        props.updateTaskCallback(props.taskInfo?.id!, editableDesc);
        props.closeCallback();
    }

    let taskData;
    if (!editMode) {
        taskData = (<>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {props.taskInfo?.desc}
            </Typography>
            <Button onClick={OnEditStart}>Edit</Button>
        </>)
    }
    else {
        taskData = (
            <>
                <TextField sx={{ width: '100%', marginBottom: '10px' }} multiline id='new-desc' rows={5} value={editableDesc} onChange={HandleDescEdit} />
                <Button onClick={OnEditSubmit}>Save</Button>
                <Button onClick={() => setEditMode(false)}>Discard</Button>
            </>
        )
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.taskInfo ? true : false}
                onClose={OnModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.taskInfo ? true : false}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            {props.taskInfo?.name}
                        </Typography>
                        <p>Created 12.12.2012</p>
                        <p>Status: {props.taskInfo?.completed ? 'completed' : 'in progress'}</p>
                        {taskData}
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default TaskViewAndEditModal;