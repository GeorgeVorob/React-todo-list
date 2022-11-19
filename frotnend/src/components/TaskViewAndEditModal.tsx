import { zodResolver } from "@hookform/resolvers/zod";
import { Backdrop, Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NewTaskInputs, NewTaskSchema, TaskType } from "../data/Task";

interface TaskViewAndEditModalProps {
    taskInfo: TaskType | null
    closeCallback: () => void
    updateTaskCallback: (id: number, newDesc: string, newName: string) => void
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
        props.closeCallback();
        setEditMode(false);
    }

    function OnEditStart() {
        reset();
        setEditMode(true);
    }
    const { register, handleSubmit, formState: { errors }, reset } = useForm<NewTaskInputs>({
        resolver: zodResolver(NewTaskSchema)
    });
    const onTaskUpdateSubmit: SubmitHandler<NewTaskInputs> = (data) => {
        setEditMode(false);
        props.updateTaskCallback(props.taskInfo?.id!, data.desc, data.name);
        OnModalClose();
    }

    let taskData;
    if (!editMode) {
        taskData = (<>
            <Typography id="transition-modal-title" variant="h6" component="h2">
                {props.taskInfo?.name}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {props.taskInfo?.desc}
            </Typography>
            <Button onClick={OnEditStart}>Edit</Button>
        </>)
    }
    else {
        taskData = (
            <form onSubmit={handleSubmit(onTaskUpdateSubmit)}>
                <TextField
                    required
                    id="task-name"
                    label="New task name"
                    defaultValue={props.taskInfo?.name}
                    {...register("name")}
                />
                {errors.name && <span>{errors.name.message}</span>}
                <TextField
                    defaultValue={props.taskInfo?.desc}
                    sx={{ width: '100%', marginBottom: '10px' }} multiline id='new-desc' rows={5}
                    {...register("desc")}
                />
                <Button type="submit">Save</Button>
                <Button onClick={() => setEditMode(false)}>Discard</Button>
            </form>
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
                    <Box sx={style} key={props.taskInfo?.id}>
                        <p>Created {new Date(props.taskInfo?.createdAt!).toString()}</p>
                        <p>Status: {props.taskInfo?.completed ? 'completed' : 'in progress'}</p>
                        {taskData}
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default TaskViewAndEditModal;