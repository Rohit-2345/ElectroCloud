import { useState } from "react";
import styled from "styled-components";

const Registerinput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <Wrapper>
      <div className="formInput">
        <label>{label}</label>
        <input
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          onFocus={() =>
            inputProps.name === "confirmPassword" && setFocused(true)
          }
          focused={focused.toString()}
        />
        <span>{errorMessage}</span>
      </div>
    </Wrapper>
  );
};

export default Registerinput;

const Wrapper = styled.div`
  .formInput {
    display: flex;
    flex-direction: column;
    width: 700px;
  }

  input {
    padding: 15px;
    margin: 10px 0px;
    border-radius: 5px;
    border: 1px solid gray;
    width: 665px;
  }

  label {
    font-size: 12px;
    color: gray;
  }

  span {
    font-size: 12px;
    padding: 3px;
    color: red;
    display: none;
  }

  input:invalid[focused="true"] {
    border: 1px solid red;
  }

  input:invalid[focused="true"] ~ span {
    display: block;
  }
`;
