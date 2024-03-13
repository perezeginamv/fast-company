import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultuSelectField from "../common/form/multiSelectField";

const Edit = () => {
    const params = useParams();
    const { usersId } = params;
    const [user, setUser] = useState();
    const [professions, setProfession] = useState();
    const [qualities, setQualities] = useState([]);

    useEffect(() => {
        api.users.getById(usersId).then((data) => {
            setUser(() => ({
                ...data,
                profession: {
                    label: data.profession.name,
                    name: data.profession._id
                },
                qualities: data.qualities.map((qualitie) => ({
                    label: qualitie.name,
                    value: qualitie._id,
                    color: qualitie.color
                }))
            }));
        });
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                name: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const handleChange = (target) => {
        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const updateData = () => {
        const userData = {
            ...user,
            profession: {
                name: user.profession,
                _id: professions.find((el) => el.label === user.profession).name
            },
            qualities: user.qualities.map((qualitie) => ({
                name: qualitie.label,
                _id: qualitie.value,
                color: qualitie.color
            }))
        };
        api.users.update(usersId, userData);

        console.log(userData);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className=".col-md-6 .offset-md-3 shadow p-4">
                    <form>
                        {user ? (
                            <>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                />
                                <SelectField
                                    label="Выбери свою профессию"
                                    name="profession"
                                    value={user.profession.label}
                                    onChange={handleChange}
                                    options={professions}
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    onChange={handleChange}
                                    value={user.sex}
                                    name="sex"
                                    label="Выберите ваш пол"
                                />
                                <MultuSelectField
                                    onChange={handleChange}
                                    defaultValue={user.qualities}
                                    options={qualities}
                                    label="Выберите ваши качества"
                                    name="qualities"
                                />
                                <Link to={`/users/${usersId}`}>
                                    <button
                                        className="btn btn-primary w-100 mx-auto"
                                        type="button"
                                        onClick={updateData}
                                    >
                                        Обновить
                                    </button>
                                </Link>
                            </>
                        ) : (
                            "loading..."
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Edit;
