import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
    const handleClick = () => {
        const { error, initialize, progress, status } = useMockData();
        // console.log("clicked");
        initialize();
        console.log(error, progress, status);
    };
    return (
        <div className="container mt-5">
            <h1> Main Page</h1>
            <h3>Инициализация данных в FireBase</h3>
            <ul>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <button className="btn btn-primary" onClick={handleClick}>
                Инициализировать
            </button>
        </div>
    );
};

export default Main;
