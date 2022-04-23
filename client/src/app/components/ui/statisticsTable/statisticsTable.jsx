import React from "react";
import PropTypes from "prop-types";
import UserStatistics from "./userStatistics";

const StatisticsTable = ({ statistics }) => {
    return (
        <>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th className="text-center" scope="col" colSpan="2">
                            name/email
                        </th>
                        <th className="text-center" scope="col">
                            all todos
                        </th>
                        <th className="text-center" scope="col">
                            new{" "}
                        </th>
                        <th className="text-center" scope="col">
                            in work
                        </th>
                        <th className="text-center" scope="col">
                            finished
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {statistics.length > 0 &&
                        statistics.map((user, index) => {
                            return <UserStatistics key={index} user={user} />;
                        })}
                </tbody>
            </table>
        </>
    );
};

StatisticsTable.propTypes = {
    statistics: PropTypes.array,
};

export default StatisticsTable;
