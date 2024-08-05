import PropTypes from "prop-types";
import React, { useProfessions } from "../../hooks/useProfession";

const Proffesion = ({ id }) => {
    const { isLoading, getProfession } = useProfessions();
    const prof = getProfession(id);

    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return "Loading ...";
};

Proffesion.propTypes = {
    id: PropTypes.string
};

export default Proffesion;
