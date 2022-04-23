import React from "react";
import PropTypes from "prop-types";

const Statistic = ({ title, count }) => {
    return (
        <li className="list-group-item text-white">
            <div className="d-flex justify-content-between">
                <div>{title}</div>
                <div>{count}</div>
            </div>
        </li>
    );
};

Statistic.propTypes = {
    title: PropTypes.string,
    count: PropTypes.number,
};

export default Statistic;
