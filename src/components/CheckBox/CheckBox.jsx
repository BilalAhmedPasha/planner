import styled from "styled-components";

const CheckBoxInput = styled.input.attrs({ type: "checkbox" })`
  position: relative;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  &:hover::before {
    background-color: ${(props) => props.hoverBGColor};
  }

  &:before {
    position: absolute;
    content: "";
    height: 1rem;
    width: 1rem;
    background-color: #fff;
    border: 1.5px solid ${(props) => props.checkBoxColor};
    border-radius: 20%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    transition: 0.3s all ease;
  }

  &:checked::before {
    background-color: ${(props) => props.backgroundColor};
    border: 1.5px solid ${(props) => props.borderColor};
  }

  &:checked::after {
    position: absolute;
    content: ${(props) => props.uniCode};
    font-size: 0.9rem;
    margin-top: -0.1rem;
    color: white;
  }
`;

export default CheckBoxInput;
