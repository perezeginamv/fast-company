import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    const [comments, setComments] = useState();
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
        api.users.getById(userId).then((data) => setUser(data));
        api.comments
            .fetchCommentsForUser(userId)
            .then((comments) => setComments(comments));
    }, []);

    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };

    const getName = (id) => {
        const usersId = users.find((user) => user._id === id);
        return usersId.name;
    };

    const getDate = (date) => {
        const currentDate = new Date(Date.now());
        const dd = new Date(Number(date));
        const timeInterval = Math.floor(
            (currentDate - dd) / (1000 * 60 * 60 * 24)
        );
        // const year = timeInterval.getFullYear().toString();

        // const creatCommentDate = new Date(Number(date));
        // const year = creatCommentDate.getFullYear().toString();
        // const month = creatCommentDate.toLocaleString("en-us", {
        //     month: "long"
        // });
        // const day = creatCommentDate.getDay().toString();

        console.log(timeInterval);

        // const convertedDate = ` - ${day} ${month}`;
        // return convertedDate;
    };

    const deletingСomment = (id) => {
        api.comments.remove(id);
        api.comments
            .fetchCommentsForUser(userId)
            .then((comments) => setComments(comments));
    };

    if (user && users) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card mb-3">
                            <div className="card-body">
                                <button
                                    onClick={handleClick}
                                    className="
                                    position-absolute
                                    top-0
                                    end-0
                                    btn btn-light btn-sm
                                "
                                >
                                    <i className="bi bi-gear"></i>
                                </button>
                                <div
                                    className="
                                    d-flex
                                    flex-column
                                    align-items-center
                                    text-center
                                    position-relative
                                "
                                >
                                    <img
                                        src="https://api.dicebear.com/8.x/avataaars/svg"
                                        alt="avatar"
                                        width="65"
                                        height="65"
                                        className="rounded-circle shadow-1-strong me-3"
                                    />
                                    <div className="mt-3">
                                        <h4>{user.name}</h4>
                                        <p className="text-secondary mb-1">
                                            {user.profession.name}
                                        </p>
                                        <div className="text-muted">
                                            <i
                                                className="
                                                bi bi-caret-down-fill
                                                text-primary
                                            "
                                                role="button"
                                            ></i>
                                            <i
                                                className="
                                                bi bi-caret-up
                                                text-secondary
                                            "
                                                role="button"
                                            ></i>
                                            <span className="ms-2">
                                                {user.rate}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div
                                className="
                                card-body
                                d-flex
                                flex-column
                                justify-content-center
                                text-center
                            "
                            >
                                <h5 className="card-title">
                                    <span>Qualities</span>
                                </h5>
                                <p className="card-text">
                                    <Qualities qualities={user.qualities} />
                                </p>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card mb-3">
                                <div
                                    className="
                                    card-body
                                    d-flex
                                    flex-column
                                    justify-content-center
                                    text-center
                                "
                                >
                                    <h5 className="card-title">
                                        <span>Completed meetings</span>
                                    </h5>

                                    <h1 className="display-1">
                                        {user.completedMeetings}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="card mb-2">
                            <div className="card-body">
                                <div>
                                    <h2>New comment</h2>
                                    <div className="mb-4">
                                        <select
                                            className="form-select"
                                            name="userId"
                                            value=""
                                        >
                                            <option disabled value="" selected>
                                                Выберите пользователя
                                            </option>

                                            <option>Доктор</option>
                                            <option>Тусер</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="exampleFormControlTextarea1"
                                            className="form-label"
                                        >
                                            Сообщение
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="exampleFormControlTextarea1"
                                            rows="3"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {comments.length > 0 && (
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h2>Comments</h2>
                                    <hr />
                                    {comments.map((user) => (
                                        <div
                                            className="bg-light card-body mb-3"
                                            key={user._id}
                                        >
                                            <div className="row">
                                                <div className="col">
                                                    <div className="d-flex flex-start">
                                                        <img
                                                            src="https://api.dicebear.com/8.x/avataaars/svg?seed=Felix"
                                                            className="
                                                                                    rounded-circle
                                                                                    shadow-1-strong
                                                                                    me-3
                                                                                "
                                                            alt="avatar"
                                                            width="65"
                                                            height="65"
                                                        />
                                                        <div
                                                            className="
                                                                                    flex-grow-1 flex-shrink-1
                                                                                "
                                                        >
                                                            <div className="mb-4">
                                                                <div
                                                                    className="
                                                                                            d-flex
                                                                                            justify-content-between
                                                                                            align-items-center
                                                                                        "
                                                                >
                                                                    <p className="mb-1">
                                                                        {getName(
                                                                            user.userId
                                                                        )}
                                                                        <span className="small">
                                                                            {getDate(
                                                                                user.created_at
                                                                            )}
                                                                        </span>
                                                                    </p>
                                                                    <button
                                                                        onClick={() => {
                                                                            deletingСomment(
                                                                                user._id
                                                                            );
                                                                        }}
                                                                        className="
                                                                                                btn btn-sm
                                                                                                text-primary
                                                                                                d-flex
                                                                                                align-items-center
                                                                                            "
                                                                    >
                                                                        <i
                                                                            className="
                                                                                                    bi bi-x-lg
                                                                                                "
                                                                        ></i>
                                                                    </button>
                                                                </div>
                                                                <p className="small mb-0">
                                                                    {
                                                                        user.content
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );

        // <div>
        //     <h1> {user.name}</h1>
        //     <h2>Профессия: {user.profession.name}</h2>
        //     <Qualities qualities={user.qualities} />
        //     <p>completedMeetings: {user.completedMeetings}</p>
        //     <h2>Rate: {user.rate}</h2>
        //     <button onClick={handleClick}>Изменить</button>
        // </div>
    } else {
        return "loading...";
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
