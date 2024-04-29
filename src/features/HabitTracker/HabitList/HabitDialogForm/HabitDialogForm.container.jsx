import { Form } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { habitsSelector } from "../../state/userHabits/userHabits.reducer.js";
import useWindowSize from "../../../../hooks/useWindowSize.js";
import { CREATE, EDIT } from "../../../../constants/formType.constants.js";
import { taskNavToDrawer } from "../../../../utils/screen.utils.js";
import HabitDialogForm from "./HabitDialogForm.jsx";
import Modal from "../../../../components/Modal/Modal.jsx";

const HabitDialog = ({
  user,
  messageApi,
  openDialog,
  setOpenDialog,
  formValues,
  formType,
  habitDetails,
  ...props
}) => {
  const dispatch = useDispatch();
  const createHabitSuccess = () => {
    messageApi.open({
      type: "success",
      content: "Habit created",
      duration: 3,
    });
  };

  const createHabitFailed = () => {
    messageApi.open({
      type: "error",
      content: "Failed to create habit",
      duration: 3,
    });
  };

  const editHabitSuccess = () => {
    messageApi.open({
      type: "success",
      content: "Habit edited",
      duration: 3,
    });
  };

  const editHabitFailed = () => {
    messageApi.open({
      type: "error",
      content: "Failed to edit habit",
      duration: 3,
    });
  };

  const [form] = Form.useForm();
  const [disableAddButton, setDisableAddButton] = useState(
    formValues.name.length === 0
  );

  const handleOnOk = (formValues) => {
    // if (formType === CREATE) {
    //   handleAddHabit({
    //     formValues,
    //     dispatch,
    //     user,
    //     createHabitSuccess,
    //     setOpenDialog,
    //     createHabitFailed,
    //   });
    // } else if (formType === EDIT) {
    //   handleEditHabit({
    //     habitDetails: habitDetails,
    //     formValues,
    //     dispatch,
    //     user,
    //     editHabitSuccess,
    //     setOpenDialog,
    //     editHabitFailed,
    //   });
    // }
  };

  const { isLoadingHabits } = useSelector(habitsSelector);
  const screenSize = useWindowSize();

  return (
    openDialog && (
      <Modal
        open={openDialog}
        formTitle={formType === CREATE ? "Create Habit" : "Edit Habit"}
        onOk={handleOnOk}
        onCancel={() => {
          setOpenDialog(false);
        }}
        okText={formType === CREATE ? "Add" : "Save"}
        form={form}
        centered={true}
        destroyOnClose={true}
        loading={isLoadingHabits}
      >
        <HabitDialogForm
          layout="vertical"
          form={form}
          initialValues={formValues}
          setDisableAddButton={setDisableAddButton}
          {...props}
        />
      </Modal>
    )
  );
};


export default HabitDialog;