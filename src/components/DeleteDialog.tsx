import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteDialog({handleDelete, mediaType}: {handleDelete:any, mediaType: String}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    handleDelete();
    setOpen(false);
  }

  return (
    <React.Fragment>
      <p onClick={handleClickOpen}>
        Delete
      </p>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {
            mediaType === "post"
            ? "Delete Post?"
            : "Delete Comment?"
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {
            mediaType === "post"
            ? "Once you delete this post, it can’t be restored."
            : "Once you delete this comment, it can’t be restored."
          }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Go Back</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
