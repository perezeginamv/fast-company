import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Qualitie = ({ id }) => {
    const { getQuality } = useQualities();
    const quality = getQuality(id);
    const { _id, color, name } = quality;

    return (
        <span key={_id} className={"badge m-1 bg-" + color}>
            {name}
        </span>
    );
};

Qualitie.propTypes = {
    id: PropTypes.string.isRequired
};

export default Qualitie;
