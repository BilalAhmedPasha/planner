import { Modal as ModalAnt } from "antd";
import Loading from "../Loading";
import Spinner from "../Spinner";

const Modal = ({
  open,
  formTitle,
  onOk,
  onCancel,
  okText,
  customStyles,
  children,
  form,
  loading,
  disableOk,
  ...props
}) => {
  return (
    <ModalAnt
      open={open}
      title={formTitle}
      okText={okText}
      cancelText="Cancel"
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onOk(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      okButtonProps={{
        disabled: disableOk,
      }}
      onCancel={(e) => {
        form.resetFields();
        onCancel(e);
      }}
      maskClosable={false}
      keyboard={false}
      destroyOnClose={false}
      {...props}
    >
      <Spinner spinning={loading} indicator={Loading(0)} delay={0}>
        {children}
      </Spinner>
    </ModalAnt>
  );
};

export default Modal;
