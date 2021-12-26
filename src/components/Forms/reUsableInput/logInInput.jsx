import React from "react";

const Input = ({
  className,
  id,
  name,
  label,
  value,
  type,
  error,
  onChange,
}) => {
  return (
    <React.Fragment>
      <input
        className={className}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
      <span></span>
      <label>{label}</label>
      {error && <div className="alert alert-danger">{error}</div>}
    </React.Fragment>
  );
};

export default Input;
