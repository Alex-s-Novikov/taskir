import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({
    label,
    type,
    name,
    value,
    classLabel,
    placeholder,
    onChange,
    error,
}) => {
    const [showPsw, setShowPsw] = useState(false);

    function handleChange({ target }) {
        onChange({ name: target.name, value: target.value });
    }

    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    const toggleShowPsw = () => {
        setShowPsw((prev) => !prev);
    };

    return (
        <>
            {label && (
                <label htmlFor={name} className={classLabel}>
                    {label}
                </label>
            )}
            <div className="input-group has-validation">
                <input
                    type={showPsw ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                    className={getInputClasses()}
                    required
                />
                {(type === "password" || type === "confirmPassword") && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPsw}
                    >
                        <i className={"bi bi-eye" + (showPsw ? "-slash" : "")}></i>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </>
    );
};

TextField.defaultProps = {
    type: "text",
};

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
};

export default TextField;
