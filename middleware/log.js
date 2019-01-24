// Middleware это просто функция которая выполняется перед загрузкой страницы, Middleware может быть асинхронной если возвращать promise https://nuxtjs.org/guide/routing#middleware
export default function (context) {
  console.log("[Middleware] The Log Middleware is running");
}
