const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const { generateUserData } = require("../utils/helpers");
const tokenServices = require("../services/token.service");
const router = express.Router({ mergeParams: true });

//api/auth/signUp
//1. get data from req (email, password, ...)
//2. проверка, существует ли уже пользователь
//3. хэширование пароля в БД
//4. создание пользователя
//5. сгенерировать токены
router.post("/signUp", [
  check("email", "Некорректный email").isEmail(),
  check("password", "Минимальная длина пароля 8 символов").isLength({ min: 8 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            // errors: errors.array(),
          },
        });
      }
      const { email, password } = req.body;

      const exitingUser = await User.findOne({ email });

      if (exitingUser) {
        return res.status(400).json({
          error: {
            message: "EMAIL_EXIST",
            code: 400,
          },
        });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await User.create({
        ...generateUserData(),
        ...req.body,
        password: hashedPassword,
      });

      const tokens = tokenServices.generate({ _id: newUser._id });
      await tokenServices.save(newUser._id, tokens.refreshToken);
      res.status(201).send({ ...tokens, userId: newUser._id });
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  },
]);

//api/auth/signInWithPassword
// 1. Провалидировать входящие данные (с помощью Express Validatore)
// 2. Найти пользователя,чтобы посмотреть, а правильные ли мы данные ввели
// 3. Сравнить хэш паспорт
// 4. Если все хорошо - сгенерировать токены
// 5. Вернуть данные
router.post("/signInWithPassword", [
  check("email", "Email некорректный").isEmail(),
  // check("email", "Email некорректный").isEmail(),
  check("password", "Пароль не может быть пустым").exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
          },
        });
      }
      const { email, password } = req.body;
      const users = await User.find();
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res.status(400).send({
          error: {
            message: "EMAIL_NOT_FOUND",
            code: 400,
          },
        });
      }
      const isPasswordEqual = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordEqual) {
        return res.status(400).send({
          error: {
            message: "INVALID_PASSWORD",
            code: 400,
          },
        });
      }
      const tokens = tokenServices.generate({ _id: existingUser._id });
      await tokenServices.save(existingUser._id, tokens.refreshToken);
      res.status(200).send({ ...tokens, userId: existingUser._id });
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  },
]);
//api/auth/token
// 1. Провалидировать корректность рефрештокена
// 2. Если все хорошо, то обновить рефреш токен, обычный токен и вернуть все это пользователю
// 3.
// 4.
// 5.
function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
}
router.post("/token", async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = tokenServices.validateRefresh(refreshToken);
    const dbToken = await tokenServices.findToken(refreshToken);

    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tokens = await tokenServices.generate({
      _id: data._id,
    });
    await tokenServices.save(data._id, tokens.refreshToken);

    res.status(200).send({ ...tokens, userId: data._id });
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
