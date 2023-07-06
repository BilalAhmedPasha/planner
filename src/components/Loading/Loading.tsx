import { LoadingOutlined } from "@ant-design/icons";

const circularLoading = (size: number) => {
  return (
    <LoadingOutlined
      style={{
        fontSize: size,
      }}
      spin
    />
  );
};

export default circularLoading;
