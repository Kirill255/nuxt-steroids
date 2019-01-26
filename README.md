# nuxt-steroids

> My super-duper Nuxt.js project

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

# Deploy Nuxt

## Building our App as a Universal App

1. mode: "universal"

2. Node.js Host Required!!! Заливаем весь проект на сервер.

3. `npm run build` Билдим проект. Иногда мощностей серера не хватает именно для билда, поэтому можно сбилдить у себя локально и уже потом залить весь проект с уже сбилденной папкой .nuxt

4. После выполнения этой команды мы получим папку `.nuxt`

5. `npm start` or `npm run start` Запускаем проект на сервере.

## Building our App as a SPA

1. mode: "spa"

2. Static Host Required.

3. `npm run build` Билдим проект.

4. Получаем уже другой результат(в отличии от если mode: universal). После выполнения этой команды мы получим папку `dist`

5. Содержимое папки dist(не папку dist вместе с файлами, а только сами файлы, хотя зависит от хостинга) переносим на сервер. Всё!

6. Чтобы запустить spa-приложение локально(для отладки или просто посмотреть) нужно установить http-сервер, просто открыть в браузере index.html файл не получиться!!!, самый простой такой сервер это `http-server`, перходим в папку dist `cd dist` и запускаем сервер `npx http-server` или например на другом порту `npx http-server -p 8082` https://www.npmjs.com/package/http-server

Note: наш serverMiddleware не будет работать в spa моде, а также мы не увидим наши посты, т.к. стор заполняется в nuxtServerInit экшене, на сервере. Запросы нужно переместить в сами компоненты, в хуки created или mounted. А также нужно настроить сервер так чтобы он всегда возвращал index.html страницу, если роута не существует или при перезагрузке страницы

## Building our App as a Static Website (Recommended)

1. mode: "universal"

2. Static Host Required.

3. `npm run generate` Генерируем страницы проекта.

4. После выполнения этой команды мы получим папку `dist`, но с другим содержимым (в отличии от если mode: spa)

5. Однако сгенерируются только статические роуты , например "/", "/about", "/admin", "/admin/new-post", "/posts", а страницы с динамическими параметрами вроде "/posts/id" или "/admin/postiId" сгенерированы не будут! Для этого нам нужно задать дополнительные конфигурации в `nuxt.config.js` в секции `generate`

6. Содержимое папки dist(не папку dist вместе с файлами, а только сами файлы, хотя зависит от хостинга) переносим на сервер. Всё!

7. Чтобы запустить spa-приложение локально(для отладки или просто посмотреть) нужно установить http-сервер, просто открыть в браузере index.html файл не получиться!!!, самый простой такой сервер это `http-server`, перходим в папку dist `cd dist` и запускаем сервер `npx http-server` или например на другом порту `npx http-server -p 8082` https://www.npmjs.com/package/http-server

Note: иногда генерируются почему-то не все страницы, некоторые завершаются с ошибкой `Error generating /posts/-LWvM2YOCxd1KNQXzFOz`, нужно просто сгенерировать ещё раз!, я например смог сгенерировать в прошлый раз только с 3 раза!
