import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

function ConfirmDialog({open,title,message,onCancel,onConfirm,}: ConfirmDialogProps) {
    return (
        <Dialog 
            slotProps={{paper: {sx: {borderRadius: 4, padding: 1}} }}
            open={open}
            onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onCancel}>Cancelar</Button>
                <Button variant="contained" onClick={onConfirm} autoFocus>Confirmar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;
