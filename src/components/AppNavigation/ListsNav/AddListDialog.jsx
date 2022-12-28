import { AccountCircle } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
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
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>{"Add List"}</DialogTitle>
      <DialogContent>
        <TextField
          id="name"
          label="List name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          autoFocus
          margin="dense"
          fullWidth
          variant="standard"
        />
        <MuiColorInput
          value={color}
          onChange={handleColorChange}
          format="hex"
          fallbackValue="#ffffff"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleCloseDialog}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddListDialog;
