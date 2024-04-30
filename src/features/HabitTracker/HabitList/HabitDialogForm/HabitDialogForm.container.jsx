import { Form } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { habitsSelector } from "../../state/userHabits/userHabits.reducer.js";
import { CREATE, EDIT } from "../../../../constants/formType.constants.js";
import HabitDialogForm from "./HabitDialogForm.jsx";
import Modal from "../../../../components/Modal/Modal.jsx";
import { DAY } from "../../../../constants/calendar.constants.js";
import { SUCCESS } from "../../../../constants/app.constants.js";
import { addHabitAction } from "../../state/userHabits/userHabits.actions.js";
import { editListAction } from "../../../TaskManager/state/userLists/userLists.actions.js";

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

  const handleOnOk = (formValues) => {
    if (formType === CREATE) {
      const newHabit = {
        ...formValues,
        startDate: formValues.startDate.startOf(DAY).format(),
        endDate: formValues.endDate
          ? formValues.endDate.startOf(DAY).format()
          : null,
      };
      dispatch(addHabitAction(user.uid, newHabit)).then((response) => {
        if (response.success === SUCCESS) {
          setOpenDialog(false);
          createHabitSuccess();
        } else {
          createHabitFailed();
        }
      });
    } else if (formType === EDIT) {
      const modifiedHabit = {
        ...formValues,
        startDate: formValues.startDate.startOf(DAY).format(),
        endDate: formValues.endDate
          ? formValues.endDate.startOf(DAY).format()
          : null,
      };
      dispatch(editListAction(user.uid, modifiedHabit, formValues.id)).then(
        (response) => {
          if (response.success === SUCCESS) {
            setOpenDialog(false);
            editHabitSuccess();
          } else {
            editHabitFailed();
          }
        }
      );
    }
  };

  const { isLoadingHabits } = useSelector(habitsSelector);

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
          {...props}
        />
      </Modal>
    )
  );
};

export default HabitDialog;
