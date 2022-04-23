import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({
    label,
    name,
    placeholder,
    value,
    classLabel,
    rows,
    cols,
    maxLength,
    onChange,
    error,
}) => {
    function handleChange({ target }) {
        onChange({ name: target.name, value: target.value });
    }

    const getInputClasses = () => {
        return "form-control text-area" + (error ? " is-invalid" : "");
    };

    return (
        <>
            {label && (
                <label htmlFor={name} className={classLabel}>
                    {label}
                </label>
            )}
            <div className="input-group has-validation">
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    rows={rows}
                    cols={cols}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    onChange={handleChange}
                    className={getInputClasses()}
                    required
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </>
    );
};

TextAreaField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
};

export default TextAreaField;
