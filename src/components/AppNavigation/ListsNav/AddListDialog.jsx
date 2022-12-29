import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { MuiColorInput } from "mui-color-input";

const AddListDialog = ({
  openDialog,
  handleCloseDialog,
  color,
  handleColorChange,
}) => {
  return (
    <form>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Add List"}</DialogTitle>
        <DialogContent>
          <TextField
            id="name"
            label="Name"
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
          />

          <MuiColorInput
            size="small"
            value={color}
            onChange={handleColorChange}
            format="hex"
            fallbackValue="#ffffff"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog}>Add</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};
export default AddListDialog;
