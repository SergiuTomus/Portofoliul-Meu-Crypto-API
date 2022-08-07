const initApp = require("./app");

(async () => {
  const app = await initApp();
  const port = process.env.PORT || 3005;

  // localhost:3005
  app.listen(port);
})();
