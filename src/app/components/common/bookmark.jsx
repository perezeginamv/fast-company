import PropTypes from "prop-types";
import React from "react";

const BookMark = ({ status, ...rest }) => {
    return (
        <button {...rest}>
            <i
                className={
                    "bi bi-emoji" + (status ? "-heart-eyes-fill" : "-neutral")
                }
            ></i>
        </button>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool
};

export default BookMark;
