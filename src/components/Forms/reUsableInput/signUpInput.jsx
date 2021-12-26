import React from "react";

const SignUpInput = ({
  className,
  id,
  name,
  label,
  labelClassName,
  value,
  type,
  error,
  onChange,
}) => {
  return (
    <React.Fragment>
      <label className={labelClassName}>{label}</label>
      <input
        className={className}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
      <span></span>

      {error && <p>{error}</p>}
    </React.Fragment>
  );
};

export default SignUpInput;
