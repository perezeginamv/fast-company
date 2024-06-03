import React from "react";
import { useHistory } from "react-router";

const BackHistoryButton = () => {
    const history = useHistory();
    console.log(history);
    return (
        <button className="btn btn-primary" onClick={() => history.goBack()}>
            <i className="bi btn-primary"></i>
            Назад
        </button>
    );
};

export default BackHistoryButton;
