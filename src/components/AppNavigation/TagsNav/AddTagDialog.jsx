import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import EmojiPicker from "emoji-picker-react";

const AddTagDialog = ({ openDialog, handleCloseDialog }) => {
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>{"Add Tag"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
        <EmojiPicker
          emojiStyle="google"
          skinTonesDisabled={true}
          searchDisabled={true}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleCloseDialog}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddTagDialog;
