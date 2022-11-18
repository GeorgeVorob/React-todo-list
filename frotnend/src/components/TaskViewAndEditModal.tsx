import { Backdrop, Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface TaskViewAndEditModalProps {
    opened: boolean,
    closeCallback: () => void
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

    function OnModalClose() {
        setEditMode(false);
        props.closeCallback();
    }

    function OnEditStart() {
        setEditMode(true);
    }

    function OnEditSubmit() {
        setEditMode(false);
    }

    let taskData;
    if (!editMode) {
        taskData = (<>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Task description.
            </Typography>
            <Button onClick={OnEditStart}>Edit</Button>
        </>)
    }
    else {
        taskData = (
            <>
                <TextField sx={{ width: '100%', marginBottom: '10px' }} multiline id='new-desc' rows={5} />
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
                open={props.opened}
                onClose={OnModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.opened}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <p>Created 12.12.2012</p>
                        <p>Status: completed</p>
                        {taskData}
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default TaskViewAndEditModal;