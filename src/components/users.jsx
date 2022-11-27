import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers(users.filter((item) => item._id !== userId));
  };
  const renderPhrase = (number) => {
    const lastTwoDigits = String(number).slice(-2);
    const arrayLetters = String(number).split("");
    if (
      (lastTwoDigits !== "12" &&
        arrayLetters[arrayLetters.length - 1] === "2") ||
      (lastTwoDigits !== "13" &&
        arrayLetters[arrayLetters.length - 1] === "3") ||
      (lastTwoDigits !== "14" && arrayLetters[arrayLetters.length - 1] === "4")
    ) {
      return "человека тусанут";
    }
    return "человек тусанет";
  };
  return (
    <>
      <h2>
        <span
          className={
            "badge sm-1  m-1 bg-" + (users.length > 0 ? "primary" : "danger")
          }
        >
          {users.length > 0
            ? `${users.length} ${renderPhrase(users.length)} с тобой сегодня`
            : "Никто не тусанет с тобой"}
        </span>
      </h2>
      {users.length > 0 && (
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((item) => (
                    <span
                      key={item._id}
                      className={"badge m-1 bg-" + item.color}
                    >
                      {item.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}/5</td>
                <td>
                  <button
                    className="btn btn-danger "
                    onClick={() => handleDelete(user._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
