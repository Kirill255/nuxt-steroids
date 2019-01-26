const express = require("express");

const router = express.Router();

const app = express();

// трансформируем входящий запрос, потому что он в не совсем правильном формате для нас
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});

router.post("/track-data", (req, res) => {
  // сдесь мы можем выполнять любую серверную логику, например сохранять данные в базу данных
  // в нашем случае при authenticateUser() мы также отправляем какие-то данные сюда, на наш сервер
  // upd1: попробовать создать новый template и выбрать в качесвте сервера express, и посмотреть проект `npx create-nuxt-app <project-name>` "Use a custom server framework: express"
  console.log("Stored data!", req.body.data);
  res.status(200).json({ message: "Success!" });
});

module.exports = {
  path: "/api",
  handler: router
};
