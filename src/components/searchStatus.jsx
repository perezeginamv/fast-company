import React from "react";
import { renderPhrase } from "../utils/utils";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    return (
        <>
            <h2>
                <span
                    className={
                        "badge sm-1  m-1 bg-" +
                        (length > 0 ? "primary" : "danger")
                    }
                >
                    {length > 0
                        ? `${length} ${renderPhrase(length)} с тобой сегодня`
                        : "Никто не тусанет с тобой"}
                </span>
            </h2>
        </>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number
};
export default SearchStatus;
