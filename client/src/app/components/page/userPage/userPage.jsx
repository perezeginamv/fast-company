import React from "react";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";

const UserPage = ({ userId }) => {
    const user = useSelector(getUserById(userId));

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <MeetingsCard value={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;

//     const history = useHistory();

//     const [comments, setComments] = useState();
//     const [comment, setComment] = useState({
//         userId: "",
//         pageId: "",
//         content: ""
//     });
//     const [users, setUsers] = useState();
//     const [errors, setErrors] = useState({});

//     useEffect(() => {
//         api.users.fetchAll().then((data) => setUsers(data));
//         api.comments
//             .fetchCommentsForUser(userId)
//             .then((comments) => setComments(getSortedList(comments)));
//     }, []);

//     const handleClick = () => {
//         history.push(history.location.pathname + "/edit");
//     };

//     const getName = (id) => {
//         const usersId = users.find((user) => user._id === id);
//         return usersId.name;
//     };
//     const deletingСomment = (id) => {
//         api.comments.remove(id);
//         api.comments
//             .fetchCommentsForUser(userId)
//             .then((comments) => setComments(getSortedList(comments)));
//     };

//     const handleChange = ({ target }) => {
//         setComment((prevState) => ({
//             ...prevState,
//             [target.name]: target.value,
//             pageId: user._id
//         }));
//     };

//     const validatorConfig = {
//         userId: {
//             isRequired: {
//                 message: "Пользователь не выбран"
//             }
//         },
//         content: {
//             isRequired: {
//                 message: "Введите сообщение"
//             }
//         }
//     };
//     useEffect(() => {
//         validate();
//     }, [comment]);

//     const validate = () => {
//         const errors = validator(comment, validatorConfig);

//         setErrors(errors);
//         return Object.keys(errors).length === 0;
//     };
//     // const isValid = Object.keys(errors).length === 0;

//     const getSortedList = (list) => {
//         const key = "created_at";
//         const sortedlist = list.sort(function (a, b) {
//             const x = Number(a[key]) > Number(b[key]) ? -1 : 1;
//             return x;
//         });
//         return sortedlist;
//     };

//     const hanleSubmit = (e) => {
//         e.preventDefault();
//         const isValid = validate();
//         if (!isValid) return;
//         api.comments.add(comment).then((comments) => {
//             setComments(getSortedList(comments));
//         });
//         setComment({ userId: "", pageId: "", content: "" });
//         e.target.reset();
//         api.comments
//             .fetchCommentsForUser(userId)
//             .then((comments) => setComments(getSortedList(comments)));
//     };

//     if (user && users) {
//         return (
//             <div className="container">
//                 <div className="row gutters-sm">
//                     <div className="col-md-4 mb-3">
//                         <div className="card mb-3">
//                             <div className="card-body">
//                                 <button
//                                     onClick={handleClick}
//                                     className="
//                                     position-absolute
//                                     top-0
//                                     end-0
//                                     btn btn-light btn-sm
//                                 "
//                                 >
//                                     <i className="bi bi-gear"></i>
//                                 </button>
//                                 <div
//                                     className="
//                                     d-flex
//                                     flex-column
//                                     align-items-center
//                                     text-center
//                                     position-relative
//                                 "
//                                 >
//                                     <img
//                                         src="https://api.dicebear.com/8.x/avataaars/svg"
//                                         alt="avatar"
//                                         width="65"
//                                         height="65"
//                                         className="rounded-circle shadow-1-strong me-3"
//                                     />
//                                     <div className="mt-3">
//                                         <h4>{user.name}</h4>
//                                         <p className="text-secondary mb-1">
//                                             {user.profession.name}
//                                         </p>
//                                         <div className="text-muted">
//                                             <i
//                                                 className="
//                                                 bi bi-caret-down-fill
//                                                 text-primary
//                                             "
//                                                 role="button"
//                                             ></i>
//                                             <i
//                                                 className="
//                                                 bi bi-caret-up
//                                                 text-secondary
//                                             "
//                                                 role="button"
//                                             ></i>
//                                             <span className="ms-2">
//                                                 {user.rate}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="card mb-3">
//                             <div
//                                 className="
//                                 card-body
//                                 d-flex
//                                 flex-column
//                                 justify-content-center
//                                 text-center
//                             "
//                             >
//                                 <h5 className="card-title">
//                                     <span>Qualities</span>
//                                 </h5>
//                                 <p className="card-text">
//                                     <Qualities qualities={user.qualities} />
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="card mb-3">
//                             <div className="card mb-3">
//                                 <div
//                                     className="
//                                     card-body
//                                     d-flex
//                                     flex-column
//                                     justify-content-center
//                                     text-center
//                                 "
//                                 >
//                                     <h5 className="card-title">
//                                         <span>Completed meetings</span>
//                                     </h5>

//                                     <h1 className="display-1">
//                                         {user.completedMeetings}
//                                     </h1>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="col-md-8">
//                         <div className="card mb-2">
//                             <div className="card-body ">
//                                 <form onSubmit={hanleSubmit}>
//                                     <h2>New comment</h2>
//                                     <div className="mb-4">
//                                         <select
//                                             className="form-select"
//                                             name="userId"
//                                             onChange={handleChange}
//                                             defaultValue=""
//                                         >
//                                             <option value="">
//                                                 Выберите пользователя
//                                             </option>
//                                             {users.map((user) => (
//                                                 <option
//                                                     key={user._id}
//                                                     value={user._id}
//                                                 >
//                                                     {user.name}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         {errors.userId && (
//                                             <p className="text-danger">
//                                                 {errors.userId}
//                                             </p>
//                                         )}
//                                     </div>

//                                     <div className="mb-4">
//                                         <label
//                                             htmlFor="exampleFormControlTextarea1"
//                                             className="form-label"
//                                         >
//                                             Сообщение
//                                         </label>
//                                         <textarea
//                                             name="content"
//                                             onChange={handleChange}
//                                             className="form-control"
//                                             id="exampleFormControlTextarea1"
//                                             rows="3"
//                                         ></textarea>
//                                         {errors.content && (
//                                             <p className="text-danger">
//                                                 {errors.content}
//                                             </p>
//                                         )}
//                                     </div>
//                                     <div className="d-grid gap-2 d-md-flex justify-content-md-end">
//                                         <button
//                                             className="btn btn-primary"
//                                             type="submit"
//                                         >
//                                             Опубликовать
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                         {comments.length > 0 && (
//                             <div className="card mb-3">
//                                 <div className="card-body">
//                                     <h2>Comments</h2>
//                                     <hr />
//                                     {comments.map((user) => (
//                                         <div
//                                             className="bg-light card-body mb-3"
//                                             key={user._id}
//                                         >
//                                             <div className="row">
//                                                 <div className="col">
//                                                     <div className="d-flex flex-start">
//                                                         <img
//                                                             src="https://api.dicebear.com/8.x/avataaars/svg?seed=Felix"
//                                                             className="
//                                                                                     rounded-circle
//                                                                                     shadow-1-strong
//                                                                                     me-3
//                                                                                 "
//                                                             alt="avatar"
//                                                             width="65"
//                                                             height="65"
//                                                         />
//                                                         <div
//                                                             className="
//                                                                                     flex-grow-1 flex-shrink-1
//                                                                                 "
//                                                         >
//                                                             <div className="mb-4">
//                                                                 <div
//                                                                     className="
//                                                                                             d-flex
//                                                                                             justify-content-between
//                                                                                             align-items-center
//                                                                                         "
//                                                                 >
//                                                                     <p className="mb-1">
//                                                                         {getName(
//                                                                             user.userId
//                                                                         )}
//                                                                         <span className="small">
//                                                                             {getDate(
//                                                                                 user.created_at
//                                                                             )}
//                                                                         </span>
//                                                                     </p>
//                                                                     <button
//                                                                         onClick={() => {
//                                                                             deletingСomment(
//                                                                                 user._id
//                                                                             );
//                                                                         }}
//                                                                         className="
//                                                                                                 btn btn-sm
//                                                                                                 text-primary
//                                                                                                 d-flex
//                                                                                                 align-items-center
//                                                                                             "
//                                                                     >
//                                                                         <i
//                                                                             className="
//                                                                                                     bi bi-x-lg
//                                                                                                 "
//                                                                         ></i>
//                                                                     </button>
//                                                                 </div>
//                                                                 <p className="small mb-0">
//                                                                     {
//                                                                         user.content
//                                                                     }
//                                                                 </p>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         );

//         // <div>
//         //     <h1> {user.name}</h1>
//         //     <h2>Профессия: {user.profession.name}</h2>
//         //     <Qualities qualities={user.qualities} />
//         //     <p>completedMeetings: {user.completedMeetings}</p>
//         //     <h2>Rate: {user.rate}</h2>
//         //     <button onClick={handleClick}>Изменить</button>
//         // </div>
//     } else {
//         return "loading...";
//     }
// };

// UserPage.propTypes = {
//     userId: PropTypes.string.isRequired
// };

// export default UserPage;
