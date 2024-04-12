import { LoadingOutlined } from "@ant-design/icons";

const circularLoading = (size) => {
  return (
      <LoadingOutlined
          style={{
              fontSize: size,
          }}
          spin
      />
  );};
export default circularLoading;
