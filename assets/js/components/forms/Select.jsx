import React from 'react';

const Select = ({ 
    name, 
    label, 
    value, 
    onChange, 
    type = "text", 
    error = "",
    children
 }) => (      
    <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <select
    value={value}
    onChange={onChange}
        type={type}
        name={name} 
        id={name} 
        className={"form-control" + (error && " is-invalid")}>{children}</select>
    {error && <p className="invalid-feedback">
        {error}
    </p>}
</div> 
);
 
export default Select;