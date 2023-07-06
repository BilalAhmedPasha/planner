import { ReactNode } from "react";
import { Modal as ModalAnt } from "antd";
import Loading from "../Loading";
import { LOADER_SIZE } from "../../constants/app.constants";
import Spinner from "../Spinner";

interface ModalProps {
  open: boolean;
  formTitle: string;
  onOk: (values: object) => void;
  onCancel: () => void;
  okText?: string;
  customStyles?: React.CSSProperties;
  children: ReactNode;
  form?: any;
  loading?: boolean;
  disableOk?: boolean;
}

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
}: ModalProps) => {
  return (
    <ModalAnt
      open={open}
      title={formTitle}
      okText={okText}
      cancelText="Cancel"
      onOk={() => {
        form
          .validateFields()
          .then((values: object) => {
            onOk(values);
          })
          .catch((info: string) => {
            console.log("Validate Failed:", info);
          });
      }}
      okButtonProps={{
        disabled: disableOk,
      }}
      onCancel={onCancel}
      maskClosable={false}
      keyboard={false}
      destroyOnClose={true}
      {...props}
    >
      <Spinner spinning={loading} indicator={Loading(LOADER_SIZE)}>
        {children}
      </Spinner>
    </ModalAnt>
  );
};

export default Modal;
