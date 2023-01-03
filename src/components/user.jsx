import PropTypes from "prop-types";
import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete,
    bookmark,
    updateStatus
}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>
                {qualities.map((item) => (
                    <Qualitie key={item._id} {...item} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td>
                <BookMark status={bookmark} onClick={() => updateStatus(_id)} />
            </td>
            <td>
                <button
                    className="btn btn-danger "
                    onClick={() => onDelete(_id)}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    bookmark: PropTypes.bool,
    updateStatus: PropTypes.func.isRequired
};

export default User;
