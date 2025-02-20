function generateAuthError(message) {
    switch (message) {
        case "EMAIL_EXISTS":
            return "Пользователь с таким Email уже существует";
        case "INVALID_LOGIN_CREDENTIALS":
            return "Email или пароль введены некорректно";
        default:
            return "Пользователь с таким Email уже существует";
    }
}

export default generateAuthError;
