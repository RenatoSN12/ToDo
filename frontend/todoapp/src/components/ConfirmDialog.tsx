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
            open={open}
            onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancelar</Button>
                <Button onClick={onConfirm} autoFocus>Confirmar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;
