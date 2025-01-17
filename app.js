require("./config/boot");
const { middleware } = require("./config/middleware");
const { routes } = require("./app/routes.js");

const app = middleware(routes);
app.set('view engine', 'pug');

// Server configuration
const PORT = process.env.PORT || 3000;
const BIND_IP = process.env.IP_ADDRESS || '127.0.0.1';

app.listen(PORT, BIND_IP, () => {
  console.log(`The app is running on ${PORT}.`);
});

