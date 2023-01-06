import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import { Controller, useForm } from "react-hook-form";

const ListDialogForm = ({
  openDialog,
  handleCloseDialog,
  color,
  handleColorChange,
}) => {
  const { handleSubmit, reset, control } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    handleCloseDialog();
  };

  return (
    <form>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Add List"}</DialogTitle>
        <DialogContent>
          <Controller
            name={"name"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label={"Name"}
                id={"name"}
                autoFocus={true}
                margin={"dense"}
                fullWidth={true}
                variant={"standard"}
              />
            )}
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
          <Button onClick={handleSubmit(onSubmit)}>Add</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};
export default ListDialogForm;
