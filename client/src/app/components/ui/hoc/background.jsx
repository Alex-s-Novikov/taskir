import React from "react";
import PropTypes from "prop-types";

const Background = ({ children }) => {
    return (
        <div className="parent">
            <div className="container-fluid main">
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-3 main__coloumn-add-stat"></div>
                    <div className="col-12 col-md-6 col-lg-3 main__coloumn-tasks"></div>
                    <div className="col-12 col-md-6 col-lg-3 main__coloumn-in-progress"></div>
                    <div className="col-12 col-md-6 col-lg-3 main__coloumn-finished"></div>
                    {children}
                </div>
            </div>
        </div>
    );
};

Background.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default Background;
